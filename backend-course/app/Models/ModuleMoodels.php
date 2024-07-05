<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuleMoodels extends Model
{
    use HasFactory;
    protected $table = 'modules';
    protected $fillable = ['course_id', 'title', 'content'];
}
