<?php

namespace Tests\Feature;

use App\Models\Reviewer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_reviewer(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/reviewers', [
            'subject' => 'Programming',
            'question' => 'What is a variable?',
            'answer' => 'A named storage location used to hold data.',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('reviewers', [
            'user_id' => $user->id,
            'subject' => 'Programming',
        ]);
    }

    public function test_reviewer_creation_requires_fields(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/reviewers', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['subject', 'question', 'answer']);
    }

    public function test_user_only_sees_own_reviewers(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        Reviewer::factory()->for($userA)->create(['subject' => 'A-subject']);
        Reviewer::factory()->for($userB)->create(['subject' => 'B-subject']);

        $response = $this->actingAs($userA)->getJson('/api/reviewers');

        $response->assertStatus(200)->assertJsonCount(1, 'reviewers');
    }

    public function test_user_cannot_update_other_users_reviewer(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();
        $reviewer = Reviewer::factory()->for($userB)->create();

        $this->actingAs($userA)->putJson("/api/reviewers/{$reviewer->id}", [
            'subject' => 'Hacked',
            'question' => 'x',
            'answer' => 'y',
        ])->assertStatus(403);
    }

    public function test_user_cannot_delete_other_users_reviewer(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();
        $reviewer = Reviewer::factory()->for($userB)->create();

        $this->actingAs($userA)->deleteJson("/api/reviewers/{$reviewer->id}")
            ->assertStatus(403);

        $this->assertDatabaseHas('reviewers', ['id' => $reviewer->id]);
    }

    public function test_user_cannot_toggle_done_on_other_users_reviewer(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();
        $reviewer = Reviewer::factory()->for($userB)->create(['is_done' => false]);

        $this->actingAs($userA)->patchJson("/api/reviewers/{$reviewer->id}/toggle-done")
            ->assertStatus(403);
    }

    public function test_user_can_toggle_own_reviewer_done_state(): void
    {
        $user = User::factory()->create();
        $reviewer = Reviewer::factory()->for($user)->create(['is_done' => false]);

        $this->actingAs($user)->patchJson("/api/reviewers/{$reviewer->id}/toggle-done")
            ->assertStatus(200)
            ->assertJsonPath('reviewer.is_done', true);
    }

    public function test_user_can_filter_by_subject(): void
    {
        $user = User::factory()->create();
        Reviewer::factory()->for($user)->create(['subject' => 'Database']);
        Reviewer::factory()->for($user)->create(['subject' => 'Networking']);

        $response = $this->actingAs($user)->getJson('/api/reviewers?subject=Database');

        $response->assertStatus(200)->assertJsonCount(1, 'reviewers');
    }

    public function test_user_can_search_reviewers(): void
    {
        $user = User::factory()->create();
        Reviewer::factory()->for($user)->create(['subject' => 'Topic A', 'question' => 'What is a database index?']);
        Reviewer::factory()->for($user)->create(['subject' => 'Topic B', 'question' => 'What is a variable?']);

        $response = $this->actingAs($user)->getJson('/api/reviewers?search=database');

        $response->assertStatus(200)->assertJsonCount(1, 'reviewers');
    }

    public function test_user_can_delete_own_reviewer(): void
    {
        $user = User::factory()->create();
        $reviewer = Reviewer::factory()->for($user)->create();

        $this->actingAs($user)->deleteJson("/api/reviewers/{$reviewer->id}")
            ->assertStatus(200);

        $this->assertDatabaseMissing('reviewers', ['id' => $reviewer->id]);
    }
}
