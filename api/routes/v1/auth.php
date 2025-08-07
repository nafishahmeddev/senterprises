<?php
app()->post("/login", function () {
    $user = auth()->login([
        'email' => request()->get("email"),
        'password' => request()->get("password")
    ]);

    if ($user) {
        $userToken = $user['token'];
        response()->json([
            "resultCode" => 200,
            "message" => "Hello World!",
            "result" => [
                "tokens" => [
                    "accessToken" => $userToken
                ],
                "user"=> $user
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