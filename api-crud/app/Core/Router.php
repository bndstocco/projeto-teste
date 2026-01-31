<?php
require_once __DIR__ . '/../Controllers/UserController.php';
require_once __DIR__ . '/JWT.php';

class Router {

    public function route() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];
        $controller = new UserController();

        // -----------------------------
        // ROTAS PÚBLICAS
        // -----------------------------

        // POST /register
        if ($method === 'POST' && $uri === '/register') {
            $controller->register();
            exit;
        }

        // POST /login
        if ($method === 'POST' && $uri === '/login') {
            $controller->login();
            exit;
        }

        // -----------------------------
        // ROTAS PROTEGIDAS POR JWT
        // -----------------------------
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Authorization header missing']);
            exit;
        }

        $authHeader = $headers['Authorization'];
        if (strpos($authHeader, 'Bearer ') !== 0) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid Authorization header']);
            exit;
        }

        $token = trim(str_replace('Bearer ', '', $authHeader));

        if (!JWT::validate($token)) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired token']);
            exit;
        }

        // -----------------------------
        // ROTAS USERS
        // -----------------------------

        // GET /users
        if ($method === 'GET' && $uri === '/users') {
            $controller->index();
            exit;
        }

        // GET /users/{id}
        if ($method === 'GET' && preg_match('/^\/users\/(\d+)$/', $uri, $matches)) {
            $controller->show($matches[1]);
            exit;
        }

        // POST /users
        if ($method === 'POST' && $uri === '/users') {
            $controller->store();
            exit;
        }

        // PUT /users/{id}
        if ($method === 'PUT' && preg_match('/^\/users\/(\d+)$/', $uri, $matches)) {
            $controller->update($matches[1]);
            exit;
        }

        // DELETE /users/{id}
        if ($method === 'DELETE' && preg_match('/^\/users\/(\d+)$/', $uri, $matches)) {
            $controller->delete($matches[1]);
            exit;
        }

        // -----------------------------
        // 404 Not Found
        // -----------------------------
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
