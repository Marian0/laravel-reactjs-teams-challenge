<?php

use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\Team::class, 50)->create()->each(function (\App\Models\Team $team) {
            $players = factory(\App\Models\Player::class, rand(2,20))->make();

            foreach ($players as $player) {
                $team->players()->save($player);
            }
        });

    }
}
