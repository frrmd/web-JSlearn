<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    protected $fillable = [
        'email',
        'otp',
        'type',
        'expires_at',
        'verified',
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'verified'   => 'boolean',
        ];
    }

    /**
     * Check if this OTP has expired.
     */
    public function isExpired(): bool
    {
        return now()->greaterThan($this->expires_at);
    }

    /**
     * Generate a new OTP for the given email and type.
     * Deletes any existing OTPs for the same email+type first.
     */
    public static function generate(string $email, string $type): self
    {
        // Remove old OTPs for this email+type
        static::where('email', $email)->where('type', $type)->delete();

        return static::create([
            'email'      => $email,
            'otp'        => str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT),
            'type'       => $type,
            'expires_at' => now()->addMinutes(5),
        ]);
    }
}
