<?php


namespace GoogleMapRender;


use Illuminate\Support\ServiceProvider;

class GoogleMapRenderProvider extends ServiceProvider
{
    public function register()
    {
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('vendor/courier'),
        ], 'public');
    }

}
