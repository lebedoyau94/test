<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$names = ["Alice", "Bob", "Carol", "Dave", "Eve"];
$lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
$ages = range(18, 99);

$data = [];

for ($i = 0; $i < 10; $i++) {
    $data[] = [
        "name" => $names[array_rand($names)],
        "lastName" => $lastNames[array_rand($lastNames)],
        "age" => $ages[array_rand($ages)],
    ];
}

echo json_encode($data);
?>
