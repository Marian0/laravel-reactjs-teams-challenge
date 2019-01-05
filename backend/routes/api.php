<?php

Route::middleware(['auth:api'])->group(function () {
    Route::resource('players', 'PlayersController');
    Route::get('teams/{id}/players', 'TeamsController@team_players');
    Route::resource('teams', 'TeamsController');
});