<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            'Állam- és Jogtudományi Kar',
            'Bölcsészettudományi Kar',
            'Egészségtudományi Kar',
            'Gazdaságtudományi Kar',
            'Informatikai Kar',
            'Művészeti Kar',
            'Pedagógusképző Kar',
            'Természettudományi Kar',
            'Társadalomtudományi Kar',
        ];

        foreach ($faculties as $faculty) {
            Faculty::create(['name' => $faculty]);
        }
    }
}
