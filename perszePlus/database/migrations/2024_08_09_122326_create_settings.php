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

            $table->unsignedBigInteger('user_id')->primary();

            $table->boolean('receive_notification_new_event')->default(false);
            $table->boolean('receive_notification_new_post')->default(false);
            $table->boolean('receive_notification_new_course')->default(false);
            $table->boolean('receive_email_notifications')->default(false);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');


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
