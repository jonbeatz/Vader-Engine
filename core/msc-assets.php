<?php
/**
 * Core Universal Asset Engine & Framework Bridge
 * Decoupled styles injector and WordPress enqueuing hook manager.
 *
 * CSS load order (Global Shield architecture):
 *   Shield → Layout → Components → Features → (optional) Extensions
 */

if (defined('ABSPATH')) {
    defined('WPINC') || exit;

    add_action('wp_enqueue_scripts', 'msc_register_core_visual_shield');
}

/**
 * Enqueue the Studio Dark satellite chain in dependency order.
 *
 * @param string $ui_url Base URL to the ui/ directory (trailing slash).
 * @return string Last handle in the chain (for dependents).
 */
function msc_enqueue_shield_satellite_chain($ui_url) {
    if (!function_exists('wp_enqueue_style')) {
        return 'msc-hero-slider';
    }

    $version = '1.1.0';

    wp_enqueue_style('msc-shield-tokens', $ui_url . 'msc-shield.css', [], $version, 'all');
    wp_enqueue_style('msc-layout', $ui_url . 'msc-layout.css', ['msc-shield-tokens'], $version, 'all');
    wp_enqueue_style('msc-components', $ui_url . 'msc-components.css', ['msc-layout'], $version, 'all');

    $deps = ['msc-components'];

    if (getenv('MSC_SHIELD_EXTENSIONS') === '1' || (defined('MSC_SHIELD_EXTENSIONS') && MSC_SHIELD_EXTENSIONS)) {
        wp_enqueue_style('msc-shield-extensions', $ui_url . 'msc-shield-extensions.css', $deps, $version, 'all');
        $deps = ['msc-shield-extensions'];
    }

    $features = [
        'msc-portfolio' => 'msc-portfolio.css',
        'msc-dashboard' => 'msc-dashboard.css',
        'msc-auth' => 'msc-auth.css',
        'msc-hero-slider' => 'msc-hero-slider.css',
    ];

    foreach ($features as $handle => $file) {
        wp_enqueue_style($handle, $ui_url . $file, $deps, $version, 'all');
        $deps = [$handle];
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
        'msc-layout.css',
        'msc-components.css',
        'msc-portfolio.css',
        'msc-dashboard.css',
        'msc-auth.css',
        'msc-hero-slider.css',
    ];

    $html = '';
    foreach ($files as $file) {
        $id = 'msc-' . preg_replace('/\.css$/', '', $file) . '-standalone';
        $html .= '<link rel="stylesheet" href="ui/' . $file . '?v=' . $version . '" id="' . $id . '" media="all">' . "\n";
    }

    if (getenv('MSC_SHIELD_EXTENSIONS') === '1') {
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
