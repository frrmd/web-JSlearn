<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'topic_id',
        'title',
        'content',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * A material belongs to one topic.
     * Inverse of Topic::materials()
     */
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    /**
     * A material can be completed by many users.
     * Tracked via the user_material_progress table.
     */
    public function userProgress()
    {
        return $this->hasMany(UserMaterialProgress::class);
    }
}
