<?php

namespace GoogleMapRender;

use Illuminate\Database\Eloquent\Model;

class Polygon extends Model
{
    protected $table = 'polygons';

    protected $guarded = ['id'];
}
