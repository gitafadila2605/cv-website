<?php
// Menerima data form kontak dan menyimpannya ke messages.txt.
// Hanya berjalan di server PHP (mis. Laragon). GitHub Pages tidak menjalankan PHP.
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "pesan" => "Metode tidak diizinkan."]);
    exit;
}

$nama  = trim(strip_tags($_POST["nama"] ?? ""));
$email = trim($_POST["email"] ?? "");
$pesan = trim(strip_tags($_POST["pesan"] ?? ""));

if (mb_strlen($nama) < 2 || mb_strlen($pesan) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "pesan" => "Data tidak valid."]);
    exit;
}

$baris = sprintf(
    "[%s] %s <%s>: %s\n",
    date("Y-m-d H:i:s"),
    $nama,
    $email,
    str_replace(["\r", "\n"], " ", $pesan)
);

if (file_put_contents(__DIR__ . "/messages.txt", $baris, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(["ok" => false, "pesan" => "Gagal menyimpan pesan."]);
    exit;
}

echo json_encode(["ok" => true]);
