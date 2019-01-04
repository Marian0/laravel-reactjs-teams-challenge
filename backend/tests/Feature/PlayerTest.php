<?php

namespace Tests\Feature;

use App\Models\Player;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class PlayerTest extends TestCase
{
    use WithFaker;

    //Get players
    public function testGet()
    {
        $response = $this->get('/api/players');

        //Valid response
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'
        ]);

        //Check output with database
        $players = Player::count('*');
        $response->assertJsonCount($players, 'data');
    }

    //Create new player
    public function testCreatePlayer()
    {
        $response = $this->json('POST', 'api/players', [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
        ]);

        //Valid response
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data',
            ]);

        //Exists in database
        $this->assertDatabaseHas('players', [
            'id' => $response->json('data.id')
        ]);
    }

    //Update player
    public function testUpdatePlayer()
    {
        $response = $this->get('/api/players');

        $players = $response->json('data');

        $this->assertTrue(count($players) > 0);

        //pick a random player
        shuffle($players);
        $player = $players[0];


        $response = $this->json('PATCH', 'api/players/' . array_get($player, 'id'), [
            'first_name' => $this->faker->firstName,
        ]);

        //Valid response
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data',
            ]);

        //Exists in database
        $this->assertDatabaseHas('players', [
            'id' => $response->json('data.id'),
            'first_name' => $response->json('data.first_name')
        ]);
    }

    //Update player Wrong Team
    public function testUpdatePlayerWrongTeam()
    {
        $response = $this->get('/api/players');

        $players = $response->json('data');

        $this->assertTrue(count($players) > 0);

        //pick a random player
        shuffle($players);
        $player = $players[0];


        $response = $this->json('PATCH', 'api/players/' . array_get($player, 'id'), [
            'team_id' => -123,
        ]);

        //Valid response
        $response
            ->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);

    }
}
