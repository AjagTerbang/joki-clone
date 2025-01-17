<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResult extends Model
{
    // use HasFactory;

    protected $table = 'user_result';

    protected $fillable = [
        'user_id',
        'module_id',
        'score',
    ];
}
