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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->string('birth_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('mothers_name')->nullable();
            $table->string('street_address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('main_address_matches_temporary_address')->default('false'); 
            $table->string('temp_addr_street')->nullable();
            $table->string('temp_addr_city')->nullable();
            $table->string('temp_addr_state')->nullable();
            $table->string('temp_addr_zip')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avatar_path')->nullable();
            $table->string('neptun_code')->nullable();
            $table->string('university')->nullable();
            $table->string('faculty')->nullable();
            $table->string('start_year')->nullable();
            $table->string('current_semester')->nullable();
            $table->string('educational_format')->nullable();
            $table->string('level_of_education')->nullable();
            $table->string('category')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
