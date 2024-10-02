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
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('asd'),
            'category' => 'admin',
        ]);

        //Create 20 users
        User::factory()->count(20)->create()->each(function ($user) {
            $user->settings()->create();
        });

        
    }
}
