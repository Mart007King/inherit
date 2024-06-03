<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatingTable extends Migration
{
    public function up()
    {
        Schema::create('rating', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // the user who gives the rating
            $table->morphs('rateable'); // this allows the table to reference multiple models (users, companies)
            $table->integer('rating'); // the rating score
            $table->text('review')->nullable(); // optional review
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rating');
    }
}
