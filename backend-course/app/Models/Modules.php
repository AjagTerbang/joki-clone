<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    // use HasFactory;

    protected $table = 'modules';
    protected $fillable = [
        'course_id',
        'title',
        'content'
    ];

    public function getModulesByCourseId($courseId)
    {
        $course = Course::find($courseId);

        if (!$course) return false;

        return Modules::where('course_id', $courseId)->get();
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
