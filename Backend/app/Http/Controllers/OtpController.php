<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\Achievement;
use App\Models\OtpCode;
use App\Models\User;
use App\Models\UserAchievement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class OtpController extends Controller
{
    use ApiResponse;

    /**
     * Send a 6-digit OTP to the given email.
     *
     * POST /api/otp/send
     * Body: { email, type, name?, password?, password_confirmation? }
     */
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'type'  => 'required|in:registration,password_reset',
        ]);

        $email = $request->email;
        $type  = $request->type;

        // ── Type-specific validation ──────────────────────────────
        if ($type === 'registration') {
            $request->validate([
                'name'     => 'required|string|max:255',
                'password' => ['required', 'string', 'confirmed', \Illuminate\Validation\Rules\Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            ], [
                'password.min' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
                'password.letters' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
                'password.mixed' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
                'password.numbers' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
                'password.symbols' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            ]);

            // Make sure email isn't already taken
            if (User::where('email', $email)->exists()) {
                return $this->error('Email sudah terdaftar.', 422);
            }
        }

        if ($type === 'password_reset') {
            if (!User::where('email', $email)->exists()) {
                return $this->error('Email tidak ditemukan.', 404);
            }
        }

        //  Rate limiting (max 5 OTPs per email in 10 min) ───────
        $recentCount = OtpCode::where('email', $email)
            ->where('type', $type)
            ->where('created_at', '>=', now()->subMinutes(10))
            ->count();

        if ($recentCount >= 5) {
            return $this->error('Terlalu banyak percobaan. Coba lagi nanti.', 429);
        }

        // ── Generate & send OTP ──────────────────────────────────
        $otpRecord = OtpCode::generate($email, $type);

        Mail::to($email)->send(new OtpMail($otpRecord->otp, $type));

        return $this->success(null, 'OTP has been sent to your email.');
    }

    /**
     * Verify OTP and complete registration.
     *
     * POST /api/otp/verify-register
     * Body: { email, otp, name, password, password_confirmation }
     */
    public function verifyRegister(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'otp'      => 'required|string|size:6',
            'name'     => 'required|string|max:255',
            'password' => ['required', 'string', 'confirmed', \Illuminate\Validation\Rules\Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ], [
            'password.min' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.letters' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.mixed' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.numbers' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.symbols' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
        ]);

        // ── Verify OTP ──────────────────────────────────────────
        $otpRecord = OtpCode::where('email', $request->email)
            ->where('type', 'registration')
            ->where('verified', false)
            ->latest()
            ->first();

        if (!$otpRecord) {
            return $this->error('OTP not found. Please request a new one.', 400);
        }

        if ($otpRecord->isExpired()) {
            return $this->error('OTP has expired. Please request a new one.', 400);
        }

        if ($otpRecord->otp !== $request->otp) {
            return $this->error('Invalid OTP code.', 400);
        }

        // Double-check email isn't taken (race condition guard)
        if (User::where('email', $request->email)->exists()) {
            return $this->error('Email sudah terdaftar.', 422);
        }

        // ── Mark OTP as verified ─────────────────────────────────
        $otpRecord->update(['verified' => true]);

        // ── Create user (same logic as AuthController@register) ──
        $user = User::create([
            'name'              => $request->name,
            'username'          => explode('@', $request->email)[0],
            'email'             => $request->email,
            'password'          => $request->password,
            'role'              => 'student',
            'total_xp'          => 0,
            'email_verified_at' => now(),
            'avatar_url'        => 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . urlencode($request->name),
        ]);

        // Unlock NEW_ACCOUNT achievement
        $newAccountAchievement = Achievement::where('condition_type', 'NEW_ACCOUNT')->first();
        if ($newAccountAchievement) {
            UserAchievement::create([
                'user_id'        => $user->id,
                'achievement_id' => $newAccountAchievement->id,
                'unlocked_at'    => now(),
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success([
            'user'  => $user,
            'token' => $token,
        ], 'Registration successful', 201);
    }

    /**
     * Verify OTP and reset password.
     *
     * POST /api/otp/reset-password
     * Body: { email, otp, password, password_confirmation }
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'otp'      => 'required|string|size:6',
            'password' => ['required', 'string', 'confirmed', \Illuminate\Validation\Rules\Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ], [
            'password.min' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.letters' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.mixed' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.numbers' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
            'password.symbols' => 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.',
        ]);

        // ── Verify OTP ──────────────────────────────────────────
        $otpRecord = OtpCode::where('email', $request->email)
            ->where('type', 'password_reset')
            ->where('verified', false)
            ->latest()
            ->first();

        if (!$otpRecord) {
            return $this->error('OTP not found. Please request a new one.', 400);
        }

        if ($otpRecord->isExpired()) {
            return $this->error('OTP has expired. Please request a new one.', 400);
        }

        if ($otpRecord->otp !== $request->otp) {
            return $this->error('Invalid OTP code.', 400);
        }

        // ── Mark OTP as verified ─────────────────────────────────
        $otpRecord->update(['verified' => true]);

        // ── Update password ──────────────────────────────────────
        $user = User::where('email', $request->email)->firstOrFail();
        $user->update(['password' => $request->password]);

        return $this->success(null, 'Password has been reset successfully.');
    }

    /**
     * Verify OTP code for password reset without resetting password.
     *
     * POST /api/otp/verify-reset-code
     * Body: { email, otp }
     */
    public function verifyResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|string|size:6',
        ]);

        $otpRecord = OtpCode::where('email', $request->email)
            ->where('type', 'password_reset')
            ->where('verified', false)
            ->latest()
            ->first();

        if (!$otpRecord) {
            return $this->error('OTP not found. Please request a new one.', 400);
        }

        if ($otpRecord->isExpired()) {
            return $this->error('OTP has expired. Please request a new one.', 400);
        }

        if ($otpRecord->otp !== $request->otp) {
            return $this->error('Invalid OTP code.', 400);
        }

        return $this->success(null, 'OTP verified successfully.');
    }
}
