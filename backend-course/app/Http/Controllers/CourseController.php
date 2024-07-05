<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index()
    {
        $data = [];
        $courses = Course::all();

        foreach ($courses as $course) {
            $data[] = [
                'id' => $course->id,
                'name' => $course->name,
                'imageUrl' => url($course->imageUrl),
                'description' => $course->description,
                'startDate' => $course->startDate,
                'endDate' => $course->endDate,
            ];
        }
        return $data;
    }
    public function createCourse(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'imageUrl' => 'required|file|mimes:png,jpg,jpeg|max:2048',
            'description' => 'required',
            'startDate' => 'required',
            'endDate' => 'required',
        ]);
        if ($validation->fails()) {
            return response()->json($validation->messages()->toArray(), 400);
        }
        try {
            //    insert course with image with randommize name
            $imageName = time() . '.' . $request->imageUrl->extension();
            $request->imageUrl->move(public_path('images'), $imageName);
            $data = $request->all();
            $data['imageUrl'] = asset('images') . '/' . $imageName;
            $course = new Course();
            // insert manually without using create method
            $course->name = $data['name'];
            $course->imageUrl = $data['imageUrl'];
            $course->description = $data['description'];
            $course->startDate = $data['startDate'];
            $course->endDate = $data['endDate'];
            $course->save();
            return response()->json([
                "msg" => "Course created successfully",
                "status_code" => 200,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "msg" => "Failed to create course",
                "error" => $th->getMessage(),
                "status_code" => 500,
            ]);
        }
    }

    public function deleteCourse($id)
    {
        $course = Course::find($id);
        if ($course) {
            $course->delete();
            return response()->json([
                "msg" => "Course deleted successfully",
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Course not found",
                "status_code" => 404,
            ]);
        }
    }

    public function updateCourse(Request $request, $id)
    {
        $course = Course::find($id);
        if ($course) {
            $validation = Validator::make($request->all(), [
                'name' => 'required',
                'imageUrl' => 'required|file|mimes:png,jpg,jpeg|max:2048',
                'description' => 'required',
                'startDate' => 'required',
                'endDate' => 'required',
            ]);

            if ($validation->fails()) {
                return response()->json($validation->messages()->toArray(), 400);
            }
            try {
                if ($request->hasFile('imageUrl')) {
                    $imageName = time() . '.' . $request->imageUrl->getClientOriginalExtension();
                    $request->imageUrl->move(public_path('images'), $imageName);
                    $course->imageUrl = asset('images/' . $imageName);
                }

                Course::where('id', $id)->update([
                    'name' => $request->name,
                    'imageUrl' => asset('images') . '/' . $imageName,
                    'description' => $request->description,
                    'startDate' => $request->startDate,
                    'endDate' => $request->endDate,
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);


                return response()->json([
                    "message" => "Course updated successfully",
                    "status_code" => 200,
                    "data" => Course::find($id),
                ]);
            } catch (\Throwable $th) {
                //throw $th;
                return response()->json([
                    "msg" => "Failed to update course",
                    "error" => $th->getMessage(),
                    "status_code" => 500,
                ]);
            }
        } else {
            return response()->json([
                "msg" => "Course not found",
                "status_code" => 404,
            ]);
        }
    }

    public function courseById($id)
    {
        $course = Course::find($id);
        if ($course) {
            $course->modules;
            
            return response()->json([
                "data" => $course,
                "status_code" => 200,
            ]);
        } else {
            return response()->json([
                "msg" => "Course not found",
                "status_code" => 404,
            ]);
        }
    }
}
