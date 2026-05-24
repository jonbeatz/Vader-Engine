<?php
/**
 * Core Universal Asset Engine & Framework Bridge
 * Decoupled styles injector and WordPress enqueuing hook manager.
 *
 * CSS load order (Global Shield architecture):
 *   Shield → Layout → Components → Features → (optional) Extensions
 */

defined('ABSPATH') || exit;

add_action('wp_enqueue_scripts', 'msc_register_core_visual_shield');

/**
 * Enqueue the Studio Dark satellite chain in dependency order.
 *
 * @param string $ui_url Base URL to the ui/ directory (trailing slash).
 * @return string Last handle in the chain (for dependents).
 */
function msc_enqueue_shield_satellite_chain($ui_url) {
    if (!function_exists('wp_enqueue_style')) {
        return 'msc-shield-load';
    }

    $version = '1.1.0';

    wp_enqueue_style('msc-shield-tokens', $ui_url . 'msc-shield.css', [], $version, 'all');
    wp_enqueue_style('msc-studio-dark-shield', $ui_url . 'studio-dark-shield.css', ['msc-shield-tokens'], $version, 'all');
    wp_enqueue_style('msc-shield-load', $ui_url . 'msc-shield-load.css', ['msc-studio-dark-shield'], $version, 'all');

    $deps = ['msc-shield-load'];

    if (getenv('MSC_SHIELD_EXTENSIONS') === '1' || (defined('MSC_SHIELD_EXTENSIONS') && MSC_SHIELD_EXTENSIONS)) {
        wp_enqueue_style('msc-shield-extensions', $ui_url . 'msc-shield-extensions.css', $deps, $version, 'all');
        $deps = ['msc-shield-extensions'];
    }

    return $deps[0];
}

/**
 * Handle structural UI stylesheet injection based on the target framework environment.
 * WordPress: Enqueues style safely using native system functions.
 * Standalone: Returns link tags in Shield → Layout → Components → Features order.
 *
 * @return void|string
 */
function msc_register_core_visual_shield() {
    $ui_url = (defined('WP_PLUGIN_URL'))
        ? plugin_dir_url(dirname(__FILE__)) . 'ui/'
        : get_template_directory_uri() . '/ui/';

    if (function_exists('wp_enqueue_style')) {
        msc_enqueue_shield_satellite_chain($ui_url);
        return;
    }

    $version = '1.1.0';
    $files = [
        'msc-shield.css',
        'studio-dark-shield.css',
        'msc-shield-load.css',
    ];

    $html = '';
    foreach ($files as $file) {
        $id = 'msc-' . preg_replace('/\.css$/', '', $file) . '-standalone';
        $html .= '<link rel="stylesheet" href="ui/' . $file . '?v=' . $version . '" id="' . $id . '" media="all">' . "\n";
    }

    if (getenv('MSC_SHIELD_EXTENSIONS') === '1' || (defined('MSC_SHIELD_EXTENSIONS') && MSC_SHIELD_EXTENSIONS)) {
        $html .= '<link rel="stylesheet" href="ui/msc-shield-extensions.css?v=' . $version . '" id="msc-shield-extensions-standalone" media="all">' . "\n";
    }

    return $html;
}

/**
 * Procedural helper to echo standalone styles when out of WordPress lifecycle scope.
 */
function msc_render_standalone_shield() {
    if (!function_exists('wp_enqueue_style')) {
        echo msc_register_core_visual_shield();
    }
}
