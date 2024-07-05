<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\ModuleMoodels;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    //make crud for module
    public function index()
    {
        $data = [];
        $modules = ModuleMoodels::all();

        foreach ($modules as $module) {
            $data[] = [
                'id' => $module->id,
                'name' => $module->name,
                'description' => $module->description,
                'course_id' => $module->course_id,
            ];
        }
        return $data;
    }
    public function createModule(Request $request)
    {
        $data = $request->all();
        //if course_id not available on table course then return error
        $course = Course::find($data['course_id']);
        if (!$course) {
            return response()->json([
                "msg" => "Course not found",
                "status_code" => 404,
            ]);
        }
        $module = new ModuleMoodels();
        $module->course_id = $data['course_id'];
        $module->title = $data['title'];
        $module->content = $data['content'];
        $module->save();
        return response()->json([
            "msg" => "Module created successfully",
            "status_code" => 200,
        ]);
    }
    public function updateModule(Request $request, $id)
    {
        $data = $request->all();
        $module = ModuleMoodels::find($id);
        if (!$module) {
            return response()->json([
                "msg" => "Module not found",
                "status_code" => 404,
            ]);
        }
        $module->course_id = $data['course_id'];
        $module->title = $data['title'];
        $module->content = $data['content'];
        $module->save();
        return response()->json([
            "msg" => "Module updated successfully",
            "status_code" => 200,
        ]);
    }

    public function deleteModule($id)
    {
        $module = ModuleMoodels::find($id);
        if ($module) {
            $module->delete();
            return response()->json([
                "msg" => "Module deleted successfully",
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Module not found",
                "status_code" => 404,
            ]);
        }
    }

    public function show($id)
    {
        $module = ModuleMoodels::find($id);
        if ($module) {
            return response()->json([
                "data" => $module,
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Module not found",
                "status_code" => 404,
            ]);
        }
    }
}
