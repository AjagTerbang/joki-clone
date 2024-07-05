<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\User;
use App\Models\UserAnswer;
use App\Models\UserResult;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function index()
    {
        $data = Question::all();

        return [
            "data" => $data,
            "success" => true,
        ];
    }

    public function questionById($id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json([
                "msg" => "Question not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $question,
            "success" => true,
        ]);
    }

    public function questionsByModuleId($id)
    {
        $m_question = new Question();

        $questions = $m_question->getQuestionsByModuleId($id);

        if (!$questions) {
            return response()->json([
                "msg" => "Questions not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $questions,
            "success" => true,
        ]);
    }

    public function createQuestion(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'question' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }
        try {
            $data = $request->all();
            $question = new Question();
            $question->question = $data['question'];
            $question->module_id = $id;
            $question->save();
            return response()->json([
                "msg" => "Question created successfully",
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "msg" => "Failed to create question",
                "status_code" => 500,
            ]);
        }
    }

    public function updateQuestion(Request $request, $id)
    {
        $question = Question::find($id);
        if ($question) {
            $validation = Validator::make($request->all(), [
                'question' => 'required',
            ]);

            if ($validation->fails()) {
                return response()->json($validation->messages()->toArray(), 400);
            }
            try {
                $data = $request->all();
                $question->question = $data['question'];
                $question->save();
                return response()->json([
                    "msg" => "Question updated successfully",
                    "status_code" => 200,
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    "msg" => "Failed to update question",
                    "status_code" => 500,
                ]);
            }
        } else {
            return response()->json([
                "msg" => "Question not found",
                "status_code" => 404,
            ]);
        }
    }

    public function deleteQuestion($id)
    {
        $question = Question::find($id);
        if ($question) {
            $question->delete();
            return response()->json([
                "msg" => "Question deleted successfully",
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Question not found",
                "status_code" => 404,
            ]);
        }
    }

    public function submitQuestion(Request $request, $id)
    {
        // get token    
        $token = $request->bearerToken();

        // get user
        $user = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        if (!$user) {
            return response()->json([
                "msg" => "Unauthorized",
                "status_code" => 401,
            ]);
        }

        $m_user = new User();
        $m_question = new Question();
        $m_ur = new UserResult();
        $m_ua = new UserAnswer();

        $user = $m_user->where('email', $user->email)->first();
        if (!$user) {
            return response()->json([
                "msg" => "User not found",
                "status_code" => 404,
            ]);
        }

        $result = $m_ur->create([
            'user_id' => $user->id,
            'module_id' => $id,
            'score' => 0,
        ]);

        // get questions
        $Questions = $m_question->getQuestionsByModuleId($id);


        try {
            $data = $request->all();
            $questions = $data['questions'];

            $score = 0;

            foreach ($questions as $q) {
                $question = $m_question->find($q['question_id']);
                $answer = $q['option_id'];

                $correct = $question->options->where('is_correct', 1)->first();

                if ($correct->id == $answer) {
                    $score += 1;
                }

                $m_ua->create([
                    'user_result_id' => $result->id,
                    'question_id' => $q['question_id'],
                    'option_id' => $q['option_id'],
                ]);
            }

            $result->score = ($score / count($Questions)) * 100;
            $result->save();

            return response()->json([
                "msg" => "Question submitted successfully",
                "score" => $result->score,
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            $m_ur->find($result->id)->delete();

            return response()->json([
                "msg" => "Failed to submit question",
                "error" => $th->getMessage(),
                "status_code" => 500,
            ]);
        }
    }
}
