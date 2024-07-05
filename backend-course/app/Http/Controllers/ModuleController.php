<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\ModuleMoodels;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{
    public function index()
    {
        $modules = Modules::all();

        return response()->json([
            "data" => $modules,
            "success" => true,
        ]);
    }

    public function modulesByCourseId($id)
    {
        $m_modules = new Modules();

        $modules = $m_modules->getModulesByCourseId($id);

        if (!$modules) {
            return response()->json([
                "msg" => "Modules not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $modules,
            "success" => true,
        ]);
    }

    public function modulesById($id)
    {
        $m_modules = new Modules();

        $modules = $m_modules->find($id);

        if (!$modules) {
            return response()->json([
                "msg" => "Modules not found",
                "status_code" => 404,
            ]);
        }

        return response()->json([
            "data" => $modules,
            "success" => true,
        ]);
    }

    public function createModule(Request $request, $id)
    {
        $m_course = new Course();
        $m_module = new Modules();



        $validation = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ]);

        if (!$m_course->find($id)) {
            return response()->json([
                "msg" => "Course not found",
                "status_code" => 404,
            ]);
        }

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }

        try {
            $m_module->course_id = $id;
            $m_module->title = $request->title;
            $m_module->content = $request->content;
            $m_module->save();

            return response()->json([
                "msg" => "Module created successfully",
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "msg" => "Failed to create module",
                "error" => $th->getMessage(),
                "status_code" => 500,
            ]);
        }
    }

    public function updateModule(Request $request, $id)
    {
        $m_module = new Modules();

        $module = $m_module->find($id);

        if (!$module) {
            return response()->json([
                "msg" => "Module not found",
                "status_code" => 404,
            ]);
        }

        $validation = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }

        try {
            $module->title = $request->title;
            $module->content = $request->content;
            $module->save();

            return response()->json([
                "msg" => "Module updated successfully",
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "msg" => "Failed to update module",
                "error" => $th->getMessage(),
                "status_code" => 500,
            ]);
        }
    }

    public function deleteModule($id)
    {
        $m_module = new Modules();

        $module = $m_module->find($id);

        if (!$module) {
            return response()->json([
                "msg" => "Module not found",
                "status_code" => 404,
            ]);
        }

        $module->delete();

        return response()->json([
            "msg" => "Module deleted successfully",
            "status_code" => 200,
        ]);
    }
}
