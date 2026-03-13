<?php
// db.php - Database connection using PDO

$host = 'localhost';
$dbname = 'ecommerce_store';
$username = 'root'; // default XAMPP/WAMP username
$password = ''; // default XAMPP/WAMP password

try {
    // Note: We connect without specifying the database first, so init_db.php can create it if it doesn't exist
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Select the database if it exists (for regular usage)
    try {
        $pdo->exec("USE `$dbname`");
    } catch (PDOException $e) {
        // Database might not exist yet, which is fine for init_db.php
    }
} catch(PDOException $e) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . $e->getMessage()]));
}
?>
