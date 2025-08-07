<?php
app()->get("/", function () {
    $page = (int) request()->get("page") ?? 1;
    $limit = (int) request()->get("limit") ?? 20;
    $skip = ($page - 1) * $limit;

    //keywords
    $keyword = request()->get("keyword");

    //contacts
    $contacts = db()->select("contact", "*");
    if ($keyword && strlen($keyword) > 0) {
        $contacts = $contacts->where("first_name", "LIKE", "%$keyword%");
        $contacts = $contacts->orWhere("last_name", "LIKE", "%$keyword%");
        $contacts = $contacts->orWhere("phone", "LIKE", "%$keyword%");
        $contacts = $contacts->orWhere("email", "LIKE", "%$keyword%");
    }
    $contacts = $contacts->orderBy("first_name", "asc");
    $contacts = $contacts->limit("$skip,$limit");
    $contacts = $contacts->fetchAll();

    //counts
    $count = db()->select("contact");
    if ($keyword && strlen($keyword) > 0) {
        $count = $count->where("first_name", "LIKE", "%$keyword%");
        $count = $count->orWhere("last_name", "LIKE", "%$keyword%");
        $count = $count->orWhere("phone", "LIKE", "%$keyword%");
        $count = $count->orWhere("email", "LIKE", "%$keyword%");
    }
    $count = $count->count();

    response()->json([
        "resultCode" => 200,
        "message" => "Hello World!",
        "result" => [
            "records" => $contacts,
            "count" => $count

        ]
    ]);
});

app()->get("/{_id}", function ($_id) {
    $contact = db()->select("contact")
        ->where("contact_id", $_id)
        ->fetchAssoc();


    response()->json([
        "resultCode" => 200,
        "message" => "Hello World!",
        "result" => [
            ...$contact,
        ]
    ]);
});
