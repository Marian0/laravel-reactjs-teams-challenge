<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class TeamTest extends TestCase
{
    use WithFaker;

    // Wrong input
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

    //Team creation
    public function testNewTeam()
    {
        $teamName = $this->faker->name . ' ' . str_random(10);

        $response = $this->json('POST', 'api/teams', [
            'name' => $teamName
        ]);

        //Check proper response
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data',
            ]);

        //Check exists in database
        $this->assertDatabaseHas('teams', ['id' => $response->json('data.id')]);
    }
}
