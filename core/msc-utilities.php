<?php
/**
 * Core Universal Utilities & Data Sanitizer
 * * Completely decoupled, environment-agnostic logic helpers.
 */

defined('ABSPATH') || exit;

/**
 * Deep recursive sanitation for strings, arrays, and objects.
 * Strips malicious input while retaining structured array keys.
 *
 * @param mixed $data The input data payload to sanitize.
 * @return mixed The fully sanitized payload.
 */
function msc_sanitize_deep($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = msc_sanitize_deep($value);
        }
    } elseif (is_object($data)) {
        foreach ($data as $key => $value) {
            $data->$key = msc_sanitize_deep($value);
        }
    } else {
        // Universal string sanitization
        $data = trim($data);
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
    return $data;
}

/**
 * Safely extracts a value from a multi-dimensional array using dot-notation.
 * Prevents undefined index notices and keeps data lookups clean.
 *
 * @param array  $array   The source array.
 * @param string $key_path The dot-notation path (e.g., 'user.profile.id').
 * @param mixed  $default  Fallback value if key path is missing.
 * @return mixed The extracted value or default fallback.
 */
function msc_array_get_nested($array, $key_path, $default = null) {
    if (!is_array($array) || is_null($key_path)) {
        return $default;
    }

    if (isset($array[$key_path])) {
        return $array[$key_path];
    }

    foreach (explode('.', $key_path) as $segment) {
        if (is_array($array) && array_key_exists($segment, $array)) {
            $array = $array[$segment];
        } else {
            return $default;
        }
    }

    return $array;
}
