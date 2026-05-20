<?php
/**
 * Baseline bootstrap loader
 * * Acts as the centralized registry and file dependency compiler.
 */

defined('ABSPATH') || defined('MSC_STANDALONE_RUN') || define('MSC_STANDALONE_RUN', true);

// Fallback direct execution check if completely outside framework environments
if (defined('ABSPATH')) {
    defined('WPINC') || exit;
}

/**
 * Core Engine Registry Wrapper
 */
class MSC_Engine_Bootstrap {

    /**
     * Track loaded internal engine components
     * @var array
     */
    private static $loaded_modules = [];

    /**
     * Auto-load and compile core module stack in exact execution order
     */
    public static function initiate_engine() {
        $core_dir = dirname(__FILE__) . '/';

        // 1. Enforce strict sequential loading sequence
        $manifest = [
            'utilities'      => $core_dir . 'msc-utilities.php',
            'communications' => $core_dir . 'msc-communications.php',
            'assets'         => $core_dir . 'msc-assets.php'
        ];

        foreach ($manifest as $module_id => $file_path) {
            if (file_exists($file_path)) {
                require_once $file_path;
                self::$loaded_modules[$module_id] = true;
            } else {
                self::$loaded_modules[$module_id] = false;
            }
        }
    }

    /**
     * Check if a specific engine module successfully initialized
     *
     * @param string $module_id Key name of the module from the manifest
     * @return bool
     */
    public static function is_active($module_id) {
        return isset(self::$loaded_modules[$module_id]) && self::$loaded_modules[$module_id] === true;
    }
}

// Automatically fire up the engine components upon link inclusion
MSC_Engine_Bootstrap::initiate_engine();
