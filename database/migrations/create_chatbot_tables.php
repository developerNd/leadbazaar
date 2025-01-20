<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chatbot_flows', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('trigger');
            $table->timestamps();
        });

        Schema::create('chatbot_nodes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('flow_id')->constrained('chatbot_flows')->cascadeOnDelete();
            $table->string('node_id'); // The ID used in the frontend
            $table->string('type');
            $table->json('position');
            $table->json('data');
            $table->timestamps();
        });

        Schema::create('chatbot_edges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('flow_id')->constrained('chatbot_flows')->cascadeOnDelete();
            $table->string('edge_id'); // The ID used in the frontend
            $table->string('source');
            $table->string('target');
            $table->string('source_handle')->nullable();
            $table->string('target_handle')->nullable();
            $table->string('label')->nullable();
            $table->string('action')->nullable();
            $table->timestamps();
        });

        Schema::create('chatbot_buttons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('node_id')->constrained('chatbot_nodes')->cascadeOnDelete();
            $table->string('button_id'); // The ID used in the frontend
            $table->string('text');
            $table->string('action')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chatbot_buttons');
        Schema::dropIfExists('chatbot_edges');
        Schema::dropIfExists('chatbot_nodes');
        Schema::dropIfExists('chatbot_flows');
    }
}; 