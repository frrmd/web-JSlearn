<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ApiResponse;

    /**
     * Get the leaderboard (all active users sorted by XP descending).
     */
    public function leaderboard()
    {
        $users = User::orderBy('total_xp', 'desc')
            ->select('id', 'name', 'username', 'avatar_url', 'total_xp')
            ->get()
            ->map(function ($user, $index) {
                $user->rank = $index + 1;
                return $user;
            });

        return $this->success($users);
    }

    /**
     * Update user profile (username, avatar, password).
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'username'   => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'avatar_url' => 'sometimes|string|max:500',
            'password'   => 'sometimes|string|min:6|confirmed',
        ]);

        if ($request->has('username')) {
            $user->username = $request->username;
        }

        if ($request->has('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }

        if ($request->filled('password')) {
            $user->password = $request->password;
        }

        $user->save();

        return $this->success($user, 'Profile updated successfully');
    }

    /**
     * List all users (admin only).
     */
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return $this->error('Unauthorized', 403);
        }

        $users = User::select('id', 'name', 'username', 'email', 'role', 'total_xp', 'avatar_url', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->success($users);
    }
}
