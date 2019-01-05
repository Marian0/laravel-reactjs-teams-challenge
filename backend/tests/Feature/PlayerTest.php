<?php

namespace Tests\Feature;

use App\Models\Player;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\ClientRepository;

class PlayerTest extends TestCase
{
    use WithFaker, DatabaseTransactions;

    protected $headers = [];
    protected $scopes = [];
    protected $user;


    public function setUp()
    {
        parent::setUp();
        $clientRepository = new ClientRepository();
        $client = $clientRepository->createPersonalAccessClient(
            null, 'Test Personal Access Client', env('APP_URL')
        );
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $client->id,
            'created_at' => new \DateTime(),
            'updated_at' => new \DateTime(),
        ]);
        $this->user = factory(User::class)->create();
        $token = $this->user->createToken('TestToken', $this->scopes)->accessToken;
        $this->headers['Accept'] = 'application/json';
        $this->headers['Authorization'] = 'Bearer '.$token;
    }

    //Get players
    public function testGet()
    {
        $response = $this->get('/api/players', $this->headers);

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
        ], $this->headers);

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
        $response = $this->get('/api/players', $this->headers);

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
        $response = $this->get('/api/players', $this->headers);

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
