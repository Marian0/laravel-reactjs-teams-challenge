<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class TeamTest extends TestCase
{
    use WithFaker;


    public function testEmptyNameNewTeam()
    {
        $response = $this->json('POST', 'api/teams', [

        ]);

        $response
            ->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors'
            ]);
    }

    public function testNewTeam()
    {

        $teamName = $this->faker->name . ' ' . str_random(10);

        $response = $this->json('POST', 'api/teams', [
            'name' => $teamName
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data',
            ]);
    }
}
