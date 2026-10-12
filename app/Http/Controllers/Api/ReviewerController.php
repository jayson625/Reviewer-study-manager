<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewerRequest;
use App\Http\Requests\UpdateReviewerRequest;
use App\Models\Reviewer;
use Illuminate\Http\Request;

class ReviewerController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->reviewers();

        if ($request->filled('subject') && $request->input('subject') !== 'all') {
            $query->where('subject', $request->input('subject'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                    ->orWhere('question', 'like', "%{$search}%")
                    ->orWhere('answer', 'like', "%{$search}%");
            });
        }

        $reviewers = $query->orderByDesc('created_at')->get();

        return response()->json(['reviewers' => $reviewers]);
    }

    public function store(StoreReviewerRequest $request)
    {
        $reviewer = $request->user()->reviewers()->create($request->validated());

        return response()->json(['reviewer' => $reviewer], 201);
    }

    public function update(UpdateReviewerRequest $request, Reviewer $reviewer)
    {
        $this->authorize('update', $reviewer);

        $reviewer->update($request->validated());

        return response()->json(['reviewer' => $reviewer]);
    }

    public function destroy(Request $request, Reviewer $reviewer)
    {
        $this->authorize('delete', $reviewer);

        $reviewer->delete();

        return response()->json(['message' => 'Reviewer deleted.']);
    }

    public function toggleDone(Request $request, Reviewer $reviewer)
    {
        $this->authorize('update', $reviewer);

        $reviewer->update(['is_done' => ! $reviewer->is_done]);

        return response()->json(['reviewer' => $reviewer]);
    }
}
