<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AvatarUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Typically, you might want to implement authorization logic here,
        // such as checking if the authenticated user has permission to upload avatars.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
            'avatar' => 'required|image|mimes:jpeg,png,jpg',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'avatar.required' => 'An avatar image is required.',
            'avatar.image' => 'The uploaded file must be an image.',
            'avatar.mimes' => 'Only JPEG, PNG, JPG, and GIF formats are allowed.',
            'avatar.max' => 'The avatar image may not be larger than 2 MB.',
        ];
    }
}
