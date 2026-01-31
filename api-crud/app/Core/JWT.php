<?php
use Firebase\JWT\JWT as FirebaseJWT;

class JWT {
    // Use pelo menos 32 caracteres
    private static $key = 'this_is_a_very_long_and_secure_secret_key_123!';

    public static function generate($payload) {
        return FirebaseJWT::encode($payload, self::$key, 'HS256');
    }

    public static function validate($token) {
        try {
            return FirebaseJWT::decode($token, new \Firebase\JWT\Key(self::$key, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }
}
