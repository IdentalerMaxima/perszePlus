<?php

namespace Database\Seeders;

use App\Models\AdminSettings;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {

        $adminUser = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'koppany.naray@gmail.com',
            'password' => Hash::make('asd'),
            'category' => 'admin',
        ]);

        AdminSettings::factory()->create([
            'registration_only_with_invitation' => 0,
        ]);

        User::factory()->count(2)->create()->each(function ($user) {
            $user->settings()->create();
        });
    }
}
