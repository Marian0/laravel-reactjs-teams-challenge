<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Team::class, function (Faker $faker) {

    $teams = [
        'Aldosivi',
        'Asociación Atlética Argentinos Juniors',
        'Tucumán',
        'Banfield',
        'Belgrano',
        'Boca Juniors',
        'Club Estudiantes de La Plata',
        'Club de Gimnasia y Esgrima La Plata',
        'Club Deportivo Godoy Cruz Antonio Tomba Godoy Cruz',
        'Huracán',
        'Independiente Avellaneda',
        'Lanús Lanús',
        'Newells Old Boys',
        'Patronato de la Juventud Católica',
        'Racing Club',
        'River Plate',
        'Rosario Central',
        'San Lorenzo de Almagro',
        'Talleres',
        'Tigre',
        'Unión Santa Fe',
        'Vélez Sarsfield',
    ];

    shuffle($teams);

    return [
        'name' => array_get($teams, 0) . ' ' .  rand(0,1000)
    ];
});
