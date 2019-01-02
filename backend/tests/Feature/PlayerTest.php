<?php

namespace Tests\Feature;

use App\Models\Player;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PlayerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGet()
    {
        $response = $this->get('/api/players');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'
        ]);

        $players = Player::count('*');
        $response->assertJsonCount($players, 'data');
    }
}
