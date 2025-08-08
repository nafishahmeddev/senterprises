<?php

use Leaf\FS;

app()->get("/", function () {
    $page = (int) request()->get("page") ?? 1;
    $limit = (int) request()->get("limit") ?? 20;
    $skip = ($page - 1) * $limit;

    //keywords
    $keyword = request()->get("keyword");

    //passports
    $passports = db()->select("passport", "*");
    if ($keyword && strlen($keyword) > 0) {
        $passports = $passports->where("first_name", "LIKE", "%$keyword%");
        $passports = $passports->orWhere("last_name", "LIKE", "%$keyword%");
        $passports = $passports->orWhere("passport_number", "=", "$keyword");
    }
    $passports = $passports->orderBy("first_name", "asc");
    $passports = $passports->limit("$skip,$limit");
    $passports = $passports->fetchAll();

    //counts
    $count = db()->select("passport");
    if ($keyword && strlen($keyword) > 0) {
        $count = $count->where("first_name", "LIKE", "%$keyword%");
        $count = $count->orWhere("last_name", "LIKE", "%$keyword%");
        $count = $count->orWhere("passport_number", "=", "$keyword");
    }
    $count = $count->count();
    response()->json([
        "resultCode" => 200,
        "message" => "Hello World!",
        "result" => [
            "records" => $passports,
            "count" => $count
        ]
    ]);
});

app()->post("/", function () {
    $fields = request()->get('fields') ?? [];
    $passport_data = request()->try([
        "first_name",
        'last_name',
        'passport_number',
        'contact',
        'date_of_birth',
        'issue_date',
        'mofa_no',
        'father_name',
        'mother_name',
        'agent',
        'office',
        'company',
        'address',
    ]);

    $response = array();

    //check if already exist
    $passport = db()->select("passport")->where('passport_number', $passport_data["passport_number"])->fetchAssoc();
    if (!$passport) {
        db()->insert('passport')->params($passport_data)->execute();
        $last_insert_id = db()->lastInsertId();
        $passport = db()->select("passport")->where("passport_id", $last_insert_id)->fetchAssoc();
        $response["resultCode"] = 200;
        $response["message"] = "Successfully added profile";
        $response["result"]["passport"] = $passport;
    } else {
        $last_insert_id = $passport["passport_id"];
        $response["resultCode"] = 400;
        $response["message"] = "Another profile found in same passport number.";
        $response["result"]["passport"] = $passport;
    }
    response()->status($response["resultCode"])->json($response);
});



app()->get("/{_id}", function ($_id) {
    $client = db()->select("passport")
        ->where("passport_id", $_id)
        ->fetchAssoc();

    $files = db()->select("passport_file", "*")
        ->where("passport_id", $_id)
        ->fetchAll();
    $files = array_map(function ($file) {
        $file["file_preview_url"] = __configuration["public_url"] . "/uploads/" . $file["file_url"];
        return $file;
    }, $files);

    $fields = db()->select("passport_field", "*")
        ->where("passport_id", $_id)
        ->fetchAll();

    response()->json([
        "resultCode" => 200,
        "message" => "Hello World!",
        "result" => [
            "passport" => $client,
            "files" => $files,
            "fields" => $fields

        ]
    ]);
});

app()->put("/{_id}", function ($_id) {
    $passport_data = request()->try([
        "first_name",
        'last_name',
        'passport_number',
        'contact',
        'date_of_birth',
        'issue_date',
        'mofa_no',
        'father_name',
        'mother_name',
        'agent',
        'office',
        'company',
        'address',
    ]);

    //check if already exist
    $res = db()->update("passport")->params($passport_data)->where("passport_id", $_id)->execute();
    if (!$res) {
        return response()->status(400)->json([
            "resultCode " => 400,
            "message" => "Ops! something went wrong",
        ]);
    }

    $passport = db()->select("passport")->where("passport_id", $_id)->fetchAssoc();
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "passport" => $passport
        ]
    ]);
});

app()->delete("/{_id}", function ($_id) {

    //check if already exist
    $res = db()->delete("passport")->where("passport_id", $_id)->execute();
    if (!$res) {
        return response()->status(400)->json([
            "resultCode " => 400,
            "message" => "Ops! something went wrong",
        ]);
    }
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
    ]);
});

app()->put("/{_id}/fields", function ($_id) {
    $passport_id = $_id;
    $name = request()->get("name");
    $value = request()->get("value");

    $field  = db()->select("passport_field")->where("name", $name)->where("passport_id", $passport_id)->fetchAssoc();
    if ($field) {
        db()->update("passport_field")->params([
            "value" => $value
        ])->where("name", $name)
            ->where("passport_id", $passport_id)
            ->execute();
    } else {
        db()->insert("passport_field")->params([
            "value" => $value,
            "name" => $name,
            "passport_id" => $passport_id
        ])->execute();
    }

    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "passport_id" => $_id
        ]
    ]);
});

app()->delete("/{_id}/fields", function ($_id) {
    $passport_id = $_id;
    $name = request()->get("name");
    db()->delete("passport_field")->where("name", $name)->where("passport_id", $passport_id)->execute();
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
    ]);
});

app()->put("/{_id}/files", function ($_id) {
    $passport_id = $_id;
    list($file) = array_values(request()->files(['file']));
    if (!$file) {
        response()->status(400)->json([
            "resultCode " => 400,
            "message" => "Something went wrong",
        ]);
    }
    $source_file = $file["tmp_name"];
    $target_filename = basename("pic" . rand(0, 99999) . "" . $file["name"]);
    $target_file = "../../../old/assets/uploads/" . $target_filename;

    $res = FS::moveFile($source_file, $target_file);


    if (!$res) {
        response()->status(400)->json([
            "resultCode " => 400,
            "message" => "Something went wrong",
        ]);
    }
    //save to database
    db()->insert("passport_file")->params([
        "file_url" => $target_filename,
        "passport_id" => $passport_id,
        "file_size" => $file["size"],
        "file_type" => $file["name"]
    ])->execute();

    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "passport_id" => $_id
        ]
    ]);
});

app()->delete("/{_id}/files", function ($_id) {
    $passport_id = $_id;
    $passport_file_id = request()->get("passport_file_id");
    $passport_file = db()->select("passport_file")->where("passport_file_id", $passport_file_id)->fetchAssoc();
    db()->delete("passport_file")->where("passport_file_id", $passport_file_id)->execute();
    $target_filename = basename($passport_file["file_url"]);
    $target_file = "../../../old/assets/uploads/" . $target_filename;
    FS::deleteFile($target_file);
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "passport_id" => $_id
        ]
    ]);
});
