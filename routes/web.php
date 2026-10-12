<?php

use Illuminate\Support\Facades\Route;

// Single-page app shell. React Router handles client-side routing for
// everything except /api (api.php) and framework/asset paths.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$')->name('spa');
