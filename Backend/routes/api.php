<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// =============================================
// PUBLIC ROUTES (no auth required)
// =============================================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Leaderboard is public
Route::get('/leaderboard', [UserController::class, 'leaderboard']);

// Topics list is public
Route::get('/topics',              [TopicController::class, 'index']);
Route::get('/topics/{slug}',       [TopicController::class, 'show']);

// =============================================
// PROTECTED ROUTES (auth:sanctum required)
// =============================================

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // User profile
    Route::put('/profile', [UserController::class, 'updateProfile']);

    // Admin: list all users
    Route::get('/users', [UserController::class, 'index']);

    // Topics — material content & quiz (needs auth to track progress)
    Route::get('/topics/{slug}/materials/{materialId}', [TopicController::class, 'showMaterial']);
    Route::get('/topics/{slug}/quizzes/{quizId}',       [TopicController::class, 'showQuiz']);

    // Progress
    Route::post('/progress/material',        [ProgressController::class, 'completeMaterial']);
    Route::post('/progress/quiz',            [ProgressController::class, 'submitQuiz']);
    Route::get('/progress/summary',          [ProgressController::class, 'summary']);
    Route::get('/progress/topic/{slug}',     [ProgressController::class, 'topicProgress']);

    // Achievements
    Route::get('/achievements', [AchievementController::class, 'index']);
});
