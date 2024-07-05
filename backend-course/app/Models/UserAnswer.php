<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    // use HasFactory

    protected $table = 'user_answer';

    protected $fillable = [
        'userResult_id',
        'question_id',
        'option_id',
    ];
}
