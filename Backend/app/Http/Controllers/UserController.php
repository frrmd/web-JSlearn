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
     * Update user profile (username, avatar, bio, password).
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'username'   => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'avatar_url' => 'sometimes|string|max:500',
            'bio'        => 'sometimes|nullable|string|max:500',
            'password'   => 'sometimes|string|min:6|confirmed',
        ]);

        if ($request->has('username')) {
            $user->username = $request->username;
        }

        if ($request->has('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }

        if ($request->has('bio')) {
            $user->bio = $request->bio;
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

    /**
     * Create a new user (admin only).
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return $this->error('Unauthorized', 403);
        }

        $request->validate([
            'name'       => 'required|string|max:255',
            'username'   => 'required|string|max:255|unique:users,username',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:6',
            'role'       => 'required|in:student,admin',
            'avatar_url' => 'sometimes|string|max:500',
        ]);

        $user = User::create([
            'name'       => $request->name,
            'username'   => $request->username,
            'email'      => $request->email,
            'password'   => $request->password,
            'role'       => $request->role,
            'total_xp'   => 0,
            'avatar_url' => $request->avatar_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . urlencode($request->name),
        ]);

        return $this->success($user, 'User created successfully', 201);
    }

    /**
     * Update an existing user (admin only).
     */
    public function update(Request $request, User $user)
    {
        if ($request->user()->role !== 'admin') {
            return $this->error('Unauthorized', 403);
        }

        $request->validate([
            'name'       => 'sometimes|string|max:255',
            'username'   => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'email'      => 'sometimes|email|unique:users,email,' . $user->id,
            'role'       => 'sometimes|in:student,admin',
            'password'   => 'sometimes|string|min:6',
            'avatar_url' => 'sometimes|string|max:500',
        ]);

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('role')) {
            $user->role = $request->role;
        }
        if ($request->has('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }
        if ($request->filled('password')) {
            $user->password = $request->password;
        }

        $user->save();

        return $this->success($user, 'User updated successfully');
    }

    /**
     * Delete a user (admin only). Cannot delete yourself.
     */
    public function destroy(Request $request, User $user)
    {
        if ($request->user()->role !== 'admin') {
            return $this->error('Unauthorized', 403);
        }

        if ($request->user()->id === $user->id) {
            return $this->error('Kamu tidak bisa menghapus akun sendiri.', 400);
        }

        $user->tokens()->delete();
        $user->delete();

        return $this->success(null, 'User deleted successfully');
    }
}
