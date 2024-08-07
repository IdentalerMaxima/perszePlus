<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        // Get a random user
        $sender_id = User::inRandomOrder()->first()->id;
        $receiver_id = 9;

        // Make sure the sender and receiver are different
        while ($sender_id === $receiver_id) {
            $receiver_id = User::inRandomOrder()->first()->id;
        }

        return [
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'message' => $this->faker->text,
        ];
    }
}
