<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            "name" => "Matematika",
            "description" => "Matematika adalah ilmu yang menyenangkan",
            "imageUrl" => "https://rencanamu.id/assets/file_uploaded/blog/1572532392-shuttersto.jpg"
        ]);

        Course::create ([
            "name" => "Pemrograman",
            "description" => "Pemrograman adalah ilmu yang menyenangkan",
            "imageUrl" => "https://awsimages.detik.net.id/community/media/visual/2023/01/16/ilustrasi-programming_169.jpeg?w=600&q=90"
        ]);

    }
}
