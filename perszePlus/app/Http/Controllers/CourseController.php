<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Storage;
use Log;


class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();

        return response()->json($courses, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'image|mimes:jpeg,jpg,png|max:2048',
            'semester' => 'required|string',
            'recommended_year' => 'required|string',
            'host' => 'required|string',
            'requirements' => 'required|string',
            'dates' => 'required|string',
        ]);

        $defaultImage = 'public/images/default_images/default_banner.jpg';
    
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('public/images');
            $imagePath = asset(Storage::url($image));
        } else if ($defaultImage) {
            $imagePath = asset(Storage::url($defaultImage));
        } else {
            $imagePath = null;
        }
    
        // Create course record
        $course = Course::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $imagePath,
            'semester' => $request->semester,
            'recommended_year' => $request->recommended_year,
            'host' => $request->host,
            'requirements' => $request->requirements,
            'dates' => $request->dates,
        ]);
    
        return response()->json($course, 201);
    }

    public function destroy($id)
{
    $course = Course::find($id);
    if (!$course) {
        return response()->json(['message' => 'Course not found'], 404);
    }

    $strippedImagePath = strstr($course->image_path, 'images');

    $defaultImagePath = 'images/default_images/default_banner.jpg';
    if ($strippedImagePath !== null && $strippedImagePath !== $defaultImagePath) {

        if (Storage::disk('public')->exists($strippedImagePath)) {

            Storage::disk('public')->delete($strippedImagePath);

        } else {
            Log::warning('File does not exist: ' . $strippedImagePath);
        }
    }

    $course->delete();

    return response()->json(['message' => 'Course deleted'], 200);
}


    public function update(Request $request, $id)
    {
        $request -> validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'semester' => 'required|string',
            'recommended_year' => 'required|string',
            'host' => 'required|string',
            'requirements' => 'required|string',
            'dates' => 'required|string',
        ]);

        $course = Course::find($id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->name = $request->name;
        $course->description = $request->description;
        $course->semester = $request->semester;
        $course->recommended_year = $request->recommended_year;
        $course->host = $request->host;
        $course->requirements = $request->requirements;
        $course->dates = $request->dates;

        $course->save();

        return response()->json($course, 200);
    }

    public function changeCourseImage(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $course = Course::find($request->id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $image = $request->file('image')->store('public/images');
        $imagePath = asset(Storage::url($image));

        $course->image_path = $imagePath;
        $course->save();

        return response()->json($course, 200);
    }
    
}
