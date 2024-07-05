<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    // use HasFactory;

    protected $table = 'courses';
    protected $fillable = [
        'name',
        'imageUrl',
        'description',

    ];

    protected $casts = [
        'id' => 'integer',
    ];

    public function addCourse($data)
    {
        return Course::create($data);
    }

    public function modules()
    {
        return $this->hasMany(Modules::class);
    }
}
