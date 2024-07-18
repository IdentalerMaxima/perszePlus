<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;

class UserCourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $courses = Course::all();

        foreach ($users as $user) {
            $user->courses()->attach(
                $courses->random(rand(1, 3))->pluck('id')->toArray(),
                ['status' => $this->randomStatus()]
            );
        }
    }

    private function randomStatus(): string
    {
        $statuses = ['registered', 'in_progress', 'completed'];
        return $statuses[array_rand($statuses)];
    }
}
