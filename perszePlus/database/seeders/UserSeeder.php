<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {

        //Create the admin user
        $adminUser = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'koppany.naray@gmail.com',
            'password' => Hash::make('asd'),
            'category' => 'admin',
        ]);

        //Create admin settings record
        $adminUser->adminSettings()->create([
            'registration_only_with_invitation' => 0,  
        ]);

        //Create users
        User::factory()->count(2)->create()->each(function ($user) {
            $user->settings()->create();
        });
    }
}
