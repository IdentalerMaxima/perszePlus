<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations. fields: id, author_id, content, created_at, post_id
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade'); // Link to users
            $table->text('content');
            $table->timestamps(); // Automatically adds created_at and updated_at
            $table->foreignId('post_id')->constrained()->onDelete('cascade'); // Ensure integrity
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
