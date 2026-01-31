<?php
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class JWT {
    // Chave secreta longa (mínimo 32 caracteres)
    private static $key = "uma_chave_super_secreta_12345678901234567890";

    /**
     * Gera token JWT
     */
    public static function generate($payload) {
        try {
            return FirebaseJWT::encode($payload, self::$key, 'HS256');
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit();
        }
    }

    /**
     * Verifica token JWT
     */
    public static function verify($token) {
        try {
            return FirebaseJWT::decode($token, new Key(self::$key, 'HS256'));
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
            exit();
        }
    }
}
