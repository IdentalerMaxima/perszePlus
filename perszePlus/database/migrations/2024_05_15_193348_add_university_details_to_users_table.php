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
        Schema::table('users', function (Blueprint $table) {
            $table->string('neptun_code')->nullable();
            $table->string('university')->nullable();
            $table->string('faculty')->nullable();
            $table->string('start_year')->nullable();
            $table->string('current_semester')->nullable();
            $table->string('educational_format')->nullable();
            $table->string('level_of_education')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('neptun_code');
            $table->dropColumn('university');
            $table->dropColumn('faculty');
            $table->dropColumn('start_year');
            $table->dropColumn('current_semester');
            $table->dropColumn('educational_format');
            $table->dropColumn('level_of_education');
        });
    }
};
