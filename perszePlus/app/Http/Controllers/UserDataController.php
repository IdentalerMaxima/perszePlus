<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserDataController extends Controller
{
    public function getUserData(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user
        ]);
    }

    public function saveUserData(Request $request)
    {
        $user = $request->user();

        // Log::info('Data to save: ' . json_encode($request->all()));

        $userData = $request->all();

        // Log::info('User data: ' . json_encode($userData));

        $user->update($userData);

        return response()->json([
            'message' => 'User data saved successfully',
            'user' => $user
        ]);
    }

    public function getAllUsers()
    {
        $users = User::all(['id', 'first_name', 'last_name', 'category', 'avatar_path', 'university', 'faculty']);

        //Log::info('Users: ' . json_encode($users));

        return response()->json([
            'users' => $users
        ]);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        //Log::info('User: ' . json_encode($user));

        return response()->json([
            'user' => $user
        ]);
    }

    public function getUsersByCategory()
    {
        // Retrieve all distinct categories from the User model
        $categories = User::select('category')->distinct()->get();

        // Initialize an empty array to store category counts
        $categoryCount = [];

        // Iterate through each category
        foreach ($categories as $category) {
            // Exclude 'admin' category
            if ($category->category !== 'admin') {
                // Count users for the current category
                $count = User::where('category', $category->category)->count();
                // Add the category and count as an object to the array
                $categoryCount[] = [
                    'category' => $category->category,
                    'count' => $count
                ];
            }
        }

        // Return JSON response with category counts as an array of objects
        return response()->json($categoryCount);
    }

    public function getUsersByLevelOfEducation()
    {
        // Retrieve all distinct levels of education from the User model
        $levelsOfEducation = User::select('level_of_education')->distinct()->get();

        // Initialize an empty array to store level of education counts
        $levelOfEducationCount = [];

        // Iterate through each level of education
        foreach ($levelsOfEducation as $levelOfEducation) {
            // Count users for the current level of education
            $count = User::where('level_of_education', $levelOfEducation->level_of_education)->count();
            // Add the level of education and count as an object to the array
            $levelOfEducationCount[] = [
                'level_of_education' => $levelOfEducation->level_of_education,
                'count' => $count
            ];
        }

        // Return JSON response with level of education counts as an array of objects
        return response()->json($levelOfEducationCount);
    }

    public function getUsersByYearsInEducation()
    {
        $yearsInEducation = User::select('current_semester')->whereNotNull('current_semester')->distinct()->get();
        $yearsInEducationCount = [];

        foreach ($yearsInEducation as $yearInEducation) {
            $count = User::where('current_semester', $yearInEducation->current_semester)->count();
            $yearsInEducationCount[] = [
                'current_semester' => $yearInEducation->current_semester,
                'count' => $count
            ];
        }

        return response()->json($yearsInEducationCount);
    }

    public function searchUsers(Request $request)
    {
        $searchTerm = $request->input('search');
    
        // Ensure the search term is not empty
        if (!$searchTerm) {
            return response()->json([
                'users' => []
            ]);
        }
    
        $users = User::where('first_name', 'like', $searchTerm . '%')
            ->orWhere('last_name', 'like', $searchTerm . '%')
            ->get(['id', 'first_name', 'last_name', 'category', 'avatar_path']);
    
        return response()->json([
            'users' => $users
        ]);
    }
    



}
