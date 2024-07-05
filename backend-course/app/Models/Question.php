<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    // use HasFactory;

    protected $table = 'questions';
    protected $fillable = [
        'question',
        'module_id',
    ];

    public function getQuestionsByModuleId($moduleId)
    {
        $module = Modules::find($moduleId);
        if (!$module) return false;

        $questions = Question::where('module_id', $moduleId)->get();

        $questions->map(function ($question) {
            $question->options = $question->options;
        });

        return $questions;
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
