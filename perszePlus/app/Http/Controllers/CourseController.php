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

        $defaultImage = 'public/images/default_banner.jpg';
    
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
    
}
