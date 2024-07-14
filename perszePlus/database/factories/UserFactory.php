<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->phoneNumber,
            'birth_date' => $this->faker->date(),
            'birth_place' => $this->faker->city,
            'mothers_name' => $this->faker->name,
            'street_address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'zip' => $this->faker->postcode,
            'temp_addr' => $this->faker->boolean ? $this->faker->city : null,
            'temp_addr_street' => $this->faker->boolean ? $this->faker->streetAddress : null,
            'temp_addr_city' => $this->faker->boolean ? $this->faker->city : null,
            'temp_addr_state' => $this->faker->boolean ? $this->faker->state : null,
            'temp_addr_zip' => $this->faker->boolean ? $this->faker->postcode : null,
            'password' => bcrypt('password'), // or Hash::make('password')
            'avatar_path' => $this->faker->imageUrl(),
            'neptun_code' => $this->faker->unique()->word,
            'university' => $this->faker->randomElement(['Pécsi Tudományegyetem', 'Budapesti Műszaki és Gazdaságtudományi Egyetem', 'Debreceni Egyetem']),
            'faculty' => $this->faker->randomElement(['Általános Orvostudományi Kar', 'Műszaki Informatikai Kar', 'Bölcsészettudományi Kar']),
            'start_year' => $this->faker->year(),
            'current_semester' => $this->faker->numberBetween(1, 8),
            'educational_format' => $this->faker->randomElement(['nappali', 'levelező']),
            'level_of_education' => $this->faker->randomElement(['BSc', 'MSc', 'PhD']),
            'category' => $this->faker->randomElement(['hallgató', 'munkatárs', 'vezetőség']),
        ];
    }
}
