<?php


namespace GoogleMapRender;


use Illuminate\Support\ServiceProvider;

class GoogleMapRenderProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('resources/js'),
        ], 'render_in_map');
        $this->publishes([
            __DIR__ . '/resources/css' => public_path('resources/css'),
        ], 'render_in_map');
        $this->loadMigrationsFrom(__DIR__ . '/migrations');
    }

}
