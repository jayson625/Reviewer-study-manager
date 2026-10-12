<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Simulate requests coming from the SPA frontend so Sanctum's
        // EnsureFrontendRequestsAreStateful middleware starts a session,
        // matching how the browser behaves in real usage.
        $this->withHeader('Referer', config('app.url'));
    }
}
