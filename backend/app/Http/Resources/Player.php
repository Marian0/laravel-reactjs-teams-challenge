<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Player extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $tmp = parent::toArray($request);

        unset($tmp['team_id']);
        unset($tmp['team']['created_at']);
        unset($tmp['team']['updated_at']);

        return $tmp;
    }
}
