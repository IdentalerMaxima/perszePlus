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
        Schema::create('settings', function (Blueprint $table) {
            // Define user_id as the primary key
            $table->unsignedBigInteger('user_id')->primary();

            // Define the rest of the columns
            $table->boolean('receive_notification_new_event')->default(true);
            $table->boolean('receive_notification_new_post')->default(true);
            $table->boolean('receive_notification_new_course')->default(true);
            $table->boolean('receive_email_notifications')->default(true);

            // Define the foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Add timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
