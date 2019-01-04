<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Team extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $t = parent::toArray($request);
        $t['player_count'] = \App\Models\Player::where('team_id', $this->resource->id)->count();

        return $t;
    }
}
