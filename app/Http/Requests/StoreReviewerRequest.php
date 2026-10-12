<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subject' => ['required', 'string', 'max:255'],
            'question' => ['required', 'string', 'max:5000'],
            'answer' => ['required', 'string', 'max:5000'],
        ];
    }
}
