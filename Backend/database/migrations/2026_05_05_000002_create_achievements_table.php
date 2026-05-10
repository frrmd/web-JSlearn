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
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon_url')->nullable();      // Badge image
            // condition_type is the unique key evaluated server-side in ProgressController
            // Examples: FIRST_MATERIAL, FIRST_QUIZ, XP_1000, ALL_TOPICS
            $table->string('condition_type')->unique();
            $table->integer('condition_value')->default(1); // Threshold (e.g. XP_1000 = 1000)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};
