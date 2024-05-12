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

        //add after email, phone, birth date, place, mom name, street add, city, state, zip, does main address match temporary address, temp addr street, temp addr city, temp addr state, temp addr zip, temp addr country
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable()->after('email');

            $table->date('birth_date')->nullable()->after('phone_number');
            $table->string('place_of_birth')->nullable()->after('birth_date');
            $table->string('mothers_name')->nullable()->after('place_of_birth');

            $table->string('street_address')->nullable()->after('mothers_name');
            $table->string('city')->nullable()->after('street_address');
            $table->string('state')->nullable()->after('city');
            $table->string('zip')->nullable()->after('state');

            $table->string('temp_addr')->default('false')->after('zip'); 

            $table->string('temp_addr_street')->nullable()->after('main_address_matches_temporary_address');
            $table->string('temp_addr_city')->nullable()->after('temp_addr_street');
            $table->string('temp_addr_state')->nullable()->after('temp_addr_city');
            $table->string('temp_addr_zip')->nullable()->after('temp_addr_state');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_number');

            $table->dropColumn('birth_date');
            $table->dropColumn('place_of_birth');
            $table->dropColumn('mothers_name');

            $table->dropColumn('street_address');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('zip');

            $table->dropColumn('temp_addr');
            
            $table->dropColumn('temp_addr_street');
            $table->dropColumn('temp_addr_city');
            $table->dropColumn('temp_addr_state');
            $table->dropColumn('temp_addr_zip');
        });
    }
};
