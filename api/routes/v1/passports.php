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
    $passport_data["upload_date"] = date("Y-m-d H:i:s");

    $response = array();

    //check if already exist
    $passport = db()->select("passport")->where('passport_number', $passport_data["passport_number"])->fetchAssoc();
    if (!$passport) {
        db()->insert('passport')->params($passport_data)->execute();
        $last_insert_id = db()->lastInsertId();
        $response["resultCode"] = 200;
        $response["message"] = "Successfully added profile";
        $response["result"]["passport_id"] = $last_insert_id;
    } else {
        $last_insert_id = $passport["passport_id"];
        $response["resultCode"] = 400;
        $response["message"] = "Another profile found in same passport number.";
        $response["result"]["passport_id"] = $last_insert_id;
    }
    response()->status($response["resultCode"])->json($response);
});



app()->get("/{_id}", function ($_id) {
    $client = db()->select("passport")
        ->where("passport_id", $_id)
        ->fetchAssoc();

    response()->json([
        "resultCode" => 200,
        "message" => "Hello World!",
        "result" => [
            "passport" => $client,
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
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "passport_id" => $_id
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

// Passport Fields
app()->get("/{_id}/fields", function ($_id) {
    $passport_id = $_id;
    $fields = db()->select("passport_field", "*")
        ->where("passport_id", $passport_id)
        ->fetchAll();
    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "fields" => $fields
        ]
    ]);
});

app()->post("/{_id}/fields", function ($_id) {
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
            "passport_id" => $passport_id,
            "upload_date" => date("Y-m-d H:i:s")
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


// Passport Files
app()->get("/{_id}/files", function ($_id) {
    $passport_id = $_id;
    $files = db()->select("passport_file", "*")
        ->where("passport_id", $passport_id)
        ->fetchAll();
    $files = array_map(function ($file) {
        $file["file_preview_url"] = __configuration["public_url"] . "/uploads/" . $file["file_url"];
        return $file;
    }, $files);

    response()->json([
        "resultCode " => 200,
        "message" => "Successful",
        "result" => [
            "files" => $files
        ]
    ]);
});

app()->post("/{_id}/files", function ($_id) {
    $passport_id = $_id;
    list($file) = array_values(request()->files(['file']));
    if (!$file) {
        response()->status(400)->json([
            "resultCode " => 400,
            "message" => "Something went wrong",
        ]);
    }
    $source_file = $file["tmp_name"];
    $original_name = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file["name"]);
    $target_filename = "pic" . rand(0, 99999) . "_" . $original_name;
    $target_file = realpath(__configuration["uploads_path"]) . "/" . $target_filename;

    FS::moveFile($source_file, $target_file);

    //save to database
    $res = db()->insert("passport_file")->params([
        "file_url" => $target_filename,
        "passport_id" => $passport_id,
        "file_size" => $file["size"],
        "file_type" => $file["type"]
    ])->execute();

    if (!$res) {
        return response()->json([
            "resultCode " => 400,
            "message" => "Something went wrong",
        ], 200);
    }
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
