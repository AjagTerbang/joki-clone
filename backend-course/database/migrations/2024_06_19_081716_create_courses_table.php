<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {


        Schema::disableForeignKeyConstraints();
        // Schema::dropIfExists('courses');
        //delete table courseId if exists
        // Schema::table('courses', function (Blueprint $table) {
        //     $table->dropColumn('courseId');
        // });
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('imageUrl');
            $table->LongText('description')->nullable();
            $table->date('startDate');
            $table->date('endDate');
            $table->timestamps();
        });


        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('courses');
        Schema::enableForeignKeyConstraints();
    }
};
