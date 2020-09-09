<?php

namespace GoogleMapRender\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Polygon
 * @package GoogleMapRender\Models
 */
class Polygon extends Model
{
    protected $table = 'polygons';

    protected $guarded = ['id'];

    protected $casts = [
        'polygon' => 'array',
    ];
}
