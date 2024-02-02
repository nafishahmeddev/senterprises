<?php
app()->post("/login", function () {
    $user = auth()->login([
        'username' => request()->get("username"),
        'password' => request()->get("password")
    ]);

    if ($user) {
        $userToken = $user['token'];
        response()->json([
            "resultCode" => 200,
            "message" => "Hello World!",
            "result" => [
                "accessToken"=> $userToken
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
?>