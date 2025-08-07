<?php
function cors()
{
  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      // may also be using PUT, PATCH, HEAD etc
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
  }
}

const __BASE_DIR__ = __DIR__;
require __BASE_DIR__ . "/vendor/autoload.php";
require __BASE_DIR__ . "/config/config.php";


//connect database
db()->connect(
  __configuration["database"]["host"],
  __configuration["database"]["name"],
  __configuration["database"]["user"],
  __configuration["database"]["pass"]
);

//authentication
auth()->config('ID_KEY', 'admin_id');
auth()->config('DB_TABLE', 'admin');
auth()->config('PASSWORD_KEY', 'password');
auth()->config('PASSWORD_VERIFY', function ($password, $userPass) {
  return $password === $userPass;
});

//middleware
cors();
app()->registerMiddleware('auth', function () {
  $user = auth()->user();
  if (!$user) {
    // user is not logged in
    response()->exit([
      "resultCode" => 401,
      'error' => 'Unauthorized',
      'data' => auth()->errors(),
    ], 401);
  }
});

//routes
app()->get("/", function () {
  response()->json(["message" => "Hello World!"]);
});
app()->group('/v1', function () {
  //auth routes
  app()->group('/auth', function () {
    include(__BASE_DIR__ . "/routes/v1/auth.php");
  });
  //clients routes
  app()->group('/clients', [
    'middleware' => 'auth',
    function () {
      include(__BASE_DIR__ . "/routes/v1/clients.php");
    }
  ]);

  app()->group('/contacts', [
    'middleware' => 'auth',
    function () {
      include(__BASE_DIR__ . "/routes/v1/contacts.php");
    }
  ]);
});


app()->get("/uploads/view/{file}", function ($file) {
  $url = __configuration["public_url"] . "/uploads/$file";
  if (str_ends_with($file, ".pdf")) {
    $url = 'https://docs.google.com/viewer?url=' . $url . '&embedded=true';
  }
  echo <<<EOT
    <html>
    <head>
    <style>
    *{
      box-sizing: border-box;
      margin:0;
      padding:0
    }
    </style>
    </head>
    <body>
    <iframe src="$url" frameborder="0" style="height:100vh; width:100vw"></iframe>
    </body>
    </html>
    EOT;
});

app()->get("/uploads/{file}", function ($file) {
  $filepath = realpath(__BASE_DIR__ . "/../old/assets/uploads/$file");
  $headers = [
    'Content-Length' => filesize($filepath),
    'Content-Type' => mime_content_type($filepath),
    'Content-Disposition' => 'inline; filename="' . basename($filepath) . '"',
  ];
  $response = response();
  foreach ($headers as $key => $value) {
    $response = $response->withHeader($key, $value);
  }
  $response->exit(file_get_contents($filepath), 200);
});

app()->run();
