<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitesTable extends Migration
{
    public function up()
    {
        Schema::create('invites', function (Blueprint $table) {
            $table->id();
            $table->string('sender');
            $table->string('email');
            $table->string('role');
            $table->string('token');
            $table->timestamps();
        }); 
    }

    public function down()
    {
        Schema::dropIfExists('invites');
    }
}

