<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reviewer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'question',
        'answer',
        'is_done',
    ];

    protected function casts(): array
    {
        return [
            'is_done' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
