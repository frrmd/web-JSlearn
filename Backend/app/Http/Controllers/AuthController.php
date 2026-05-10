<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\User;
use App\Models\UserAchievement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * Register a new user account.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name'       => $request->name,
            'username'   => explode('@', $request->email)[0],
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'role'       => 'student',
            'total_xp'   => 0,
            'avatar_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . urlencode($request->name),
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
     * Login and return a token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Email atau password kamu salah.', 401);
        }

        $user = Auth::user();
        $user->update(['last_login_at' => now()]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success([
            'user'  => $user,
            'token' => $token,
        ], 'Login successful');
    }

    /**
     * Logout and revoke current token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success(null, 'Logged out successfully');
    }

    /**
     * Get the currently authenticated user.
     */
    public function me(Request $request)
    {
        return $this->success($request->user());
    }
}
