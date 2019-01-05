<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\ClientRepository;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class TeamTest extends TestCase
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

    // Wrong input
    public function testEmptyNameNewTeam()
    {
        $response = $this->json('POST', 'api/teams', [

        ], $this->headers);

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
        ], $this->headers);

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
