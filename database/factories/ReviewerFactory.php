<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'subject' => fake()->randomElement(['Programming', 'Database', 'Networking', 'Mathematics']),
            'question' => fake()->sentence(),
            'answer' => fake()->paragraph(),
            'is_done' => false,
        ];
    }
}
