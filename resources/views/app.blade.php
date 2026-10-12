<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Reviewer Study Manager') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700&family=jetbrains-mono:400,500&display=swap" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased">
        <div id="app"></div>
    </body>
</html>
