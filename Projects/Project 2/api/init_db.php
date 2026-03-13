<?php
// init_db.php - Create DB, tables, and import JSON data

include 'db.php';

try {
    // 1. Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `$dbname`;");

    // 2. Create users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'editor', 'subscriber') DEFAULT 'subscriber',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 3. Create products table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            old_price DECIMAL(10,2) DEFAULT NULL,
            image VARCHAR(255) DEFAULT NULL,
            categories TEXT COMMENT 'JSON array',
            label VARCHAR(50) DEFAULT NULL,
            label_class VARCHAR(50) DEFAULT NULL,
            is_sale TINYINT(1) DEFAULT 0,
            rating INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 4. Create orders table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_name VARCHAR(100) NOT NULL,
            customer_email VARCHAR(100) NOT NULL,
            total_amount DECIMAL(10,2) NOT NULL,
            status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
            order_items TEXT COMMENT 'JSON',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 5. Insert default admin
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    if ($stmt->fetchColumn() == 0) {
        $hash = password_hash('admin', PASSWORD_DEFAULT);
        $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')")
            ->execute(['admin', 'admin@admin.com', $hash]);
    }

    // 6. Import existing products from JSON if products table is empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM products");
    if ($stmt->fetchColumn() == 0) {
        $jsonPath = '../../data/products.json';
        if (file_exists($jsonPath)) {
            $json = file_get_contents($jsonPath);
            $products = json_decode($json, true);
            
            if (is_array($products)) {
                $insertStmt = $pdo->prepare("INSERT INTO products (title, price, old_price, image, categories, label, label_class, is_sale, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                foreach ($products as $p) {
                    $old_price = isset($p['oldPrice']) ? $p['oldPrice'] : null;
                    $categories = isset($p['categories']) ? json_encode($p['categories']) : '[]';
                    $label = $p['label'] ?? null;
                    $label_class = $p['labelClass'] ?? null;
                    $is_sale = !empty($p['isSale']) ? 1 : 0;
                    $rating = $p['rating'] ?? 5;
                    
                    $insertStmt->execute([
                        $p['title'], 
                        $p['price'], 
                        $old_price, 
                        $p['image'], 
                        $categories, 
                        $label, 
                        $label_class, 
                        $is_sale, 
                        $rating
                    ]);
                }
            }
        }
    }

    echo json_encode(['success' => true, 'message' => 'Database initialized and seeded successfully!']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "Initialization failed: " . $e->getMessage()]);
}
?>
