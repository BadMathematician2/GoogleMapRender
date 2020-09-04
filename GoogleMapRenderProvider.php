<?php


namespace GoogleMapRender;


use Illuminate\Support\ServiceProvider;

class GoogleMapRenderProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('resources/js'),
        ], 'public');
    }

}
