<?php


namespace GoogleMapRender;


use GoogleMapRender\Models\Polygon;
use Illuminate\Http\Request;

/**
 *
 * Запис даних, отриманих із MakePolygon( створення багатокутника по кліках), у базу даних
 *
 * Class PostPolygonController
 * @package GoogleMapRender
 */
class PostPolygonController
{
    /**
     * @param Request $request
     * @return array
     */
    public function post(Request $request)
    {
        $points = [];
        foreach ($request->get('polygon', []) as $item) {
            $points[] = [
                'lat' => (float)$item['lat'],
                'lng' => (float)$item['lng'],
            ];
        }
        $зщднпщт = Polygon::query()->create(['polygon' => $points]);

        return $зщднпщт->getAttributes();
    }
}
