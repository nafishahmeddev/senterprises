<?php
app()->post("/login", function () {
    $user = auth()->login([
        'email' => request()->get("email"),
        'password' => request()->get("password")
    ]);

    if ($user) {
        response()->json([
            "resultCode" => 200,
            "message" => "Hello World!",
            "result" => [
                "tokens" => [
                    "accessToken" => $user["token"]
                ],
                "user" => $user["user"]
            ]
        ]);
    } else {
        response()->exit([
            "resultCode" => 401,
            'error' => 'Unauthorized',
            'data' => auth()->errors(),
        ], 401);
    }
});

app()->post("/verify", function () {
    $user = auth()->user();
    if ($user) {
        response()->json([
            "resultCode" => 200,
            "message" => "Verification successful",
            "result" => [
                "user" => $user["user"]
            ]
        ]);
    } else {
        response()->exit([
            "resultCode" => 401,
            'error' => 'Unauthorized',
            'result' => auth()->errors(),
        ], 401);
    }
});
