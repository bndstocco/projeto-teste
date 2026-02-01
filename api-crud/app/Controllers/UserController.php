<?php
require_once __DIR__ . '/../Models/User.php';
require_once __DIR__ . '/../Core/JWT.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
        header('Content-Type: application/json');
    }

    // Função auxiliar para ler dados JSON
    private function getJsonData() {
        return json_decode(file_get_contents("php://input"), true) ?? [];
    }

    // Função auxiliar para enviar resposta
    private function respond($data, $status = 200) {
        http_response_code($status);
        echo json_encode($data);
        exit;
    }

    // Função auxiliar para validação de campos
    private function validateFields(array $data, array $fields) {
        foreach ($fields as $field) {
            if (empty($data[$field])) {
                $this->respond(['error' => implode(', ', $fields) . ' required'], 400);
            }
        }
    }

    // Registro / Criação de usuário
    public function register() {
        $data = $this->getJsonData();
        $this->validateFields($data, ['name', 'email', 'password']);

        if ($this->userModel->findByEmail($data['email'])) {
            $this->respond(['error' => 'Email already exists'], 409);
        }

        $this->userModel->create($data['name'], $data['email'], $data['password']);
        $this->respond(['message' => 'User registered successfully']);
    }

    // Login
    public function login() {
        $data = $this->getJsonData();
        $this->validateFields($data, ['email', 'password']);

        $user = $this->userModel->findByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password'])) {
            $this->respond(['error' => 'Invalid credentials'], 401);
        }

        $token = JWT::generate(['id' => $user['id'], 'email' => $user['email']]);
        $this->respond(['token' => $token]);
    }

    // Listar todos usuários
    public function index() {
        $this->respond($this->userModel->getAll());
    }

    // Mostrar usuário específico
    public function show($id) {
        $user = $this->userModel->getById($id);
        if (!$user) {
            $this->respond(['error' => 'User not found'], 404);
        }
        $this->respond($user);
    }

    // Criar usuário (mesma lógica do register)
    public function store() {
        $this->register();
    }

    // Atualizar usuário
    public function update($id) {
        $data = $this->getJsonData();
        $this->validateFields($data, ['name', 'email']);

        if (!$this->userModel->getById($id)) {
            $this->respond(['error' => 'User not found'], 404);
        }

        $this->userModel->update($id, $data['name'], $data['email']);
        $this->respond(['message' => 'User updated successfully']);
    }

    // Deletar usuário
    public function delete($id) {
        if (!$this->userModel->getById($id)) {
            $this->respond(['error' => 'User not found'], 404);
        }

        $this->userModel->delete($id);
        $this->respond(['message' => 'User deleted successfully']);
    }
}
