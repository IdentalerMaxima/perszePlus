<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Faculty;

class UniversityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(University $university)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, University $university)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(University $university)
    {
        //
    }

    /**
     * Get list of universities.
     */
    public function getUniversities()
    {
        $universities = University::all();
        //Log::info($universities);
        return response()->json($universities, 200);
    }

    /**
     * Get list of faculties for a university.
     */
    public function getFacultiesForUniversity($universityId)
    {
        $university = University::find($universityId);
        $facultyIds = $university->faculties()->pluck('faculty_id');
        $faculties = Faculty::whereIn('id', $facultyIds)->pluck('name');
        return response()->json($faculties, 200);
    }
}
