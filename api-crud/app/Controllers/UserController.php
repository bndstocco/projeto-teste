<?php
require_once __DIR__ . '/../Models/User.php';
require_once __DIR__ . '/../Core/JWT.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
        header('Content-Type: application/json');
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['name'], $data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email and password are required']);
            return;
        }
        if ($this->userModel->findByEmail($data['email'])) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
            return;
        }
        $this->userModel->create($data['name'], $data['email'], $data['password']);
        echo json_encode(['message' => 'User registered successfully']);
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password required']);
            return;
        }

        $user = $this->userModel->findByEmail($data['email']);
        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'User not found']);
            return;
        }

        if (password_verify($data['password'], $user['password'])) {
            $token = JWT::generate(['id' => $user['id'], 'email' => $user['email']]);
            echo json_encode(['token' => $token]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }

    public function index() {
        $users = $this->userModel->getAll();
        echo json_encode($users);
    }

    public function show($id) {
        $user = $this->userModel->getById($id);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['name'], $data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email and password are required']);
            return;
        }
        if ($this->userModel->findByEmail($data['email'])) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
            return;
        }
        $this->userModel->create($data['name'], $data['email'], $data['password']);
        echo json_encode(['message' => 'User created successfully']);
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['name'], $data['email'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name and email are required']);
            return;
        }
        if (!$this->userModel->getById($id)) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        $this->userModel->update($id, $data['name'], $data['email']);
        echo json_encode(['message' => 'User updated successfully']);
    }

    public function delete($id) {
        if (!$this->userModel->getById($id)) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        $this->userModel->delete($id);
        echo json_encode(['message' => 'User deleted successfully']);
    }
}
