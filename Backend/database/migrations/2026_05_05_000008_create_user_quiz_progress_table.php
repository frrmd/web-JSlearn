<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_quiz_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->integer('best_score')->default(0);   // Best score achieved (0–100)
            $table->integer('attempts')->default(0);     // Total number of attempts
            // Composite unique key: one record per user per quiz (updated on retries)
            $table->unique(['user_id', 'quiz_id']);
            $table->timestamps(); // updated_at = last attempt time
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_quiz_progress');
    }
};
