<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class UsersController extends Controller
{
    //
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user || !password_verify($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah!',
                "status_code" => 401,
            ], 401);
        }
        $secret = env('JWT_SECRET');
        $payload = [
            'email' => $user->email,
            'exp' => time() + 60 * 60,
            'role' => $user->role,
        ];
        $token = JWT::encode($payload, $secret, 'HS256');
        return response()->json([
            "data" => [
                "msg" => "Login successful",
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role,
            ],
            "status_code" => 200,
            'token' => $token
        ]);
    }

    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        $user->save();

        return response()->json([
            'message' => 'User created',
            'status_code' => 200,
        ]);
    }

    public function registerAdmin(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        $user->role = 'admin';
        $user->save();

        return response()->json([
            'message' => 'Admin created',
            'status_code' => 200,
        ]);
    }
}
