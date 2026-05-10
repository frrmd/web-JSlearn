<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\UserAchievement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    use ApiResponse;

    /**
     * List all achievements with unlock status for the current user.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $unlockedIds = UserAchievement::where('user_id', $user->id)
            ->pluck('achievement_id')
            ->toArray();

        $unlockDates = UserAchievement::where('user_id', $user->id)
            ->pluck('unlocked_at', 'achievement_id')
            ->toArray();

        $achievements = Achievement::all()->map(function ($a) use ($unlockedIds, $unlockDates) {
            return [
                'id'              => $a->id,
                'title'           => $a->title,
                'description'     => $a->description,
                'icon_url'        => $a->icon_url,
                'condition_type'  => $a->condition_type,
                'is_unlocked'     => in_array($a->id, $unlockedIds),
                'unlocked_at'     => $unlockDates[$a->id] ?? null,
            ];
        });

        return $this->success($achievements);
    }
}
