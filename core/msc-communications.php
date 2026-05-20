<?php
/**
 * Core Universal Communications & Email Routing Engine
 * * Completely decoupled, environment-agnostic mailing structures.
 */

if (defined('ABSPATH')) {
    defined('WPINC') || exit;
}

/**
 * Route an outbound email using available structural parameters.
 * Automatically adapts between WordPress wp_mail() or standard PHP mail fallbacks.
 *
 * @param string $to      Recipient email address.
 * @param string $subject Email subject line.
 * @param string $message HTML or plain text message content.
 * @param array  $headers Optional email headers configuration.
 * @return bool True if successfully handed off to the system mail wrapper.
 */
function msc_send_mail($to, $subject, $message, $headers = []) {
    // 1. Sanitize incoming parameters safely using core utilities
    if (function_exists('msc_sanitize_deep')) {
        $to = msc_sanitize_deep($to);
        $subject = msc_sanitize_deep($subject);
    } else {
        $to = filter_var(trim($to), FILTER_SANITIZE_EMAIL);
        $subject = htmlspecialchars(trim($subject), ENT_QUOTES, 'UTF-8');
    }

    // 2. Format transactional metadata headers safely
    $default_headers = [
        'Content-Type: text/html; charset=UTF-8'
    ];
    $final_headers = array_merge($default_headers, $headers);

    // 3. Environment Check: Adapt seamlessly between systems
    if (function_exists('wp_mail')) {
        // WordPress Environment: Routes natively through FluentSMTP / Brevo
        return wp_mail($to, $subject, $message, $final_headers);
    }

    // 4. Standalone Environment: Standard fallback layer
    $header_string = implode("\r\n", $final_headers);
    return mail($to, $subject, $message, $header_string);
}

/**
 * Build a standard transactional notification wrapper layout.
 * Injecting the universal design signature system.
 *
 * @param string $title       The main notification header string.
 * @param string $body_text   Main message paragraph markup.
 * @return string Complete structural HTML template.
 */
function msc_build_transactional_email_template($title, $body_text) {
    return '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</title>
    </head>
    <body style="background-color: #121212; color: #ffffff; font-family: sans-serif; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1c1c1c; padding: 30px; border-radius: 8px; border: 1px solid #2d2d2d;">
            <h1 style="color: #e02b20; font-size: 24px; margin-top: 0;">' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1>
            <div style="color: #b3b3b3; line-height: 1.6; font-size: 16px;">
                ' . $body_text . '
            </div>
        </div>
    </body>
    </html>';
}
