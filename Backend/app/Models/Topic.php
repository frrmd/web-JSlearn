<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail_url',
        'order',
    ];

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * A topic has many materials (reading content).
     * Ordered by the 'order' column for correct display sequence.
     */
    public function materials()
    {
        return $this->hasMany(Material::class)->orderBy('order');
    }

    /**
     * A topic has many quizzes (assessments).
     * Typically one quiz per topic, but the schema supports multiple.
     */
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
