<?php
class Database {
    private $pdo;

    public function __construct() {
        $config = include __DIR__ . '/../Config/config.php';
        $db = $config['db'];

        try {
            $this->pdo = new PDO(
                "mysql:host={$db['host']};dbname={$db['dbname']}",
                $db['user'],
                $db['pass']
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->pdo;
    }
}
