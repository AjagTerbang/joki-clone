<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OptionController extends Controller
{
    public function index()
    {
        $data = Option::all();

        return [
            "data" => $data,
            "success" => true,
        ];
    }

    public function optionById($id)
    {
        $option = Option::find($id);

        if (!$option) {
            return response()->json([
                "msg" => "Option not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $option,
            "success" => true,
        ]);
    }

    public function optionsByQuestionId($id)
    {
        $options = Option::where('question_id', $id)->get();

        if (!$options) {
            return response()->json([
                "msg" => "Options not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $options,
            "success" => true,
        ]);
    }

    public function createOption(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'option' => 'required',
            'is_correct' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }

        try {
            $data = $request->all();
            $data['question_id'] = $id;
            $option = new Option();
            $option->option = $data['option'];
            $option->is_correct = $data['is_correct'];
            $option->question_id = $data['question_id'];
            $option->save();
            return response()->json([
                "msg" => "Option created successfully",
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "msg" => "Option not created",
                "status_code" => 500,
            ]);
        }
    }

    public function updateOption(Request $request, $id)
    {
        $option = Option::find($id);
        if ($option) {
            $validation = Validator::make($request->all(), [
                'option' => 'required',
                'is_correct' => 'required',
            ]);

            if ($validation->fails()) {
                return response()->json($validation->messages()->toArray(), 400);
            }
            try {
                $data = $request->all();
                $option->option = $data['option'];
                $option->is_correct = $data['is_correct'];
                $option->save();
                return response()->json([
                    "msg" => "Option updated successfully",
                    "status_code" => 200,
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    "msg" => "Option not updated",
                    "status_code" => 500,
                ]);
            }
        } else {
            return response()->json([
                "msg" => "Option not found",
                "status_code" => 404,
            ]);
        }
    }

    public function deleteOption($id)
    {
        $option = Option::find($id);
        if ($option) {
            $option->delete();
            return response()->json([
                "msg" => "Option deleted successfully",
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Option not found",
                "status_code" => 404,
            ]);
        }
    }
}
