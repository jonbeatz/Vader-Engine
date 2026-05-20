<?php
/**
 * Core Universal Asset Engine & Framework Bridge
 * * Decoupled styles injector and WordPress enqueuing hook manager.
 */

if (defined('ABSPATH')) {
    defined('WPINC') || exit;
    
    // Automatically hook into WordPress theme/plugin header processing loops
    add_action('wp_enqueue_scripts', 'msc_register_core_visual_shield');
}

/**
 * Handle structural UI stylesheet injection based on the target framework environment.
 * * WordPress: Enqueues style safely using native system functions.
 * Standalone: Returns an absolute file path or dynamic URL reference.
 *
 * @return void|string
 */
function msc_register_core_visual_shield() {
    // 1. WordPress Enqueue Routing Layer
    if (function_exists('wp_enqueue_style')) {
        $ui_url = (defined('WP_PLUGIN_URL'))
            ? plugin_dir_url(dirname(__FILE__)) . 'ui/'
            : get_template_directory_uri() . '/ui/';

        // Master baseline tokens
        wp_enqueue_style('msc-shield-tokens', $ui_url . 'msc-shield.css', [], '1.0.0', 'all');
        $deps = ['msc-shield-tokens'];
        if (getenv('MSC_SHIELD_EXTENSIONS') === '1' || (defined('MSC_SHIELD_EXTENSIONS') && MSC_SHIELD_EXTENSIONS)) {
            wp_enqueue_style('msc-shield-extensions', $ui_url . 'msc-shield-extensions.css', $deps, '1.0.0', 'all');
            $deps = ['msc-shield-extensions'];
        }
        wp_enqueue_style('msc-hero-slider', $ui_url . 'msc-hero-slider.css', $deps, '1.0.0', 'all');
        return;
    }

    // 2. Standalone Injection Engine Routing Layer
    $html = '<link rel="stylesheet" href="ui/msc-shield.css" id="msc-shield-tokens-standalone" media="all">' . "\n";
    if (getenv('MSC_SHIELD_EXTENSIONS') === '1') {
        $html .= '<link rel="stylesheet" href="ui/msc-shield-extensions.css" id="msc-shield-extensions-standalone" media="all">' . "\n";
    }
    $html .= '<link rel="stylesheet" href="ui/msc-hero-slider.css" id="msc-hero-slider-standalone" media="all">';
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
