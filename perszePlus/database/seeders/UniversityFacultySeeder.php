<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\University;
use Illuminate\Database\Seeder;

class UniversityFacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $universityFacultyRelationships = [
            [
                'university' => 'Pécsi Tudományegyetem',
                'faculties' => [
                    'Állam- és Jogtudományi Kar',
                    'Bölcsészettudományi Kar',
                    'Egészségtudományi Kar',
                    'Gazdaságtudományi Kar',
                    'Informatikai Kar',
                    'Művészeti Kar',
                    'Pedagógusképző Kar',
                    'Természettudományi Kar',
                    'Társadalomtudományi Kar',
                ]
            ],
            [
                'university' => 'Szegedi Tudományegyetem',
                'faculties' => [
                    'Gazdaságtudományi Kar',
                    'Informatikai Kar',
                ]
            ],
            [
                'university' => 'Eötvös Loránd Tudományegyetem',
                'faculties' => [
                    'Bölcsészettudományi Kar',
                    'Egészségtudományi Kar',
                    'Művészeti Kar',
                    'Pedagógusképző Kar',
                    'Társadalomtudományi Kar',
                    ]
            ]
        ];

        foreach ($universityFacultyRelationships as $universityFacultyRelationship) {
            $university = University::where('name', $universityFacultyRelationship['university'])->first();
            $faculties = Faculty::whereIn('name', $universityFacultyRelationship['faculties'])->get();
            $university->faculties()->attach($faculties);
        }
    }
}
