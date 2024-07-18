<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->text,
            'image_path' => $this->faker->imageUrl(),
            'semester' => $this->faker->numberBetween(1, 8),
            'recommended_year' => $this->faker->numberBetween(1, 5),
            'host' => $this->faker->company,
            'requirements' => $this->faker->text,
            'dates' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
