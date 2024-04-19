<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\University;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $universities = [
            'Pécsi Tudományegyetem',
            'Szegedi Tudományegyetem',
            'Debreceni Tudományegyetem',
            'Budapesti Műszaki és Gazdaságtudományi Egyetem',
            'Eötvös Loránd Tudományegyetem',
            'Semmelweis Egyetem',
            'Magyar Képzőművészeti Egyetem',
        ];
            


        
        foreach ($universities as $university) {
            University::create(['name' => $university]);
        }
    }
}
