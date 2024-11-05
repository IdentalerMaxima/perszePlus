<?php

namespace Database\Seeders;

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

        User::factory()->count(2)->create()->each(function ($user) {
            $user->settings()->create();
        });
    }
}
