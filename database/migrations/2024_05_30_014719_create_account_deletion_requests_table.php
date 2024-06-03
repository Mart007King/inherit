<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountDeletionRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('account_deletion_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamp('requested_at')->useCurrent();
            $table->timestamp('processed_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('account_deletion_requests');
    }
}
