<?php

namespace App\Policies;

use App\Models\Reviewer;
use App\Models\User;

class ReviewerPolicy
{
    public function update(User $user, Reviewer $reviewer): bool
    {
        return $user->id === $reviewer->user_id;
    }

    public function delete(User $user, Reviewer $reviewer): bool
    {
        return $user->id === $reviewer->user_id;
    }
}
