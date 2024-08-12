<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSettingsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {   
        DB::table('admin_settings')->updateOrInsert(
            ['id' => 1], // This ensures that if a record with id 1 exists, it will be updated; if not, it will be inserted.
            ['registration_only_with_invitation' => false]
        );
    }
}
