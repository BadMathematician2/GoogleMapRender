<?php

namespace App\Packages\GoogleMapRender\Models;

use Illuminate\Database\Eloquent\Model;

class Polygon extends Model
{
    protected $table = 'polygons';

    protected $guarded = ['id'];
}
