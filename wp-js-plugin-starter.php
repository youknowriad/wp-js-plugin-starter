<?php
/**
 * Plugin Name: WP JS Plugin Starter
 * Plugin URI: https://github.com/youknowriad/wp-js-plugin-starter
 * Description: Just another WordPress plugin starter
 * Version: 1.0.1
 * Author: Riad Benguella
 *
 * @package wp-js-plugin-starter
 */

 /**
 * Retrieves a URL to a file in the plugin's directory.
 *
 * @param  string $path Relative path of the desired file.
 *
 * @return string       Fully qualified URL pointing to the desired file.
 *
 * @since 1.0.0
 */
function wp_js_plugin_starter_url( $path ) {
	return plugins_url( $path, __FILE__ );
}

/**
 * Registers the plugin's block.
 *
 * @since 1.0.0
 */
function wp_js_plugin_starter_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'wp-js-plugin-starter',
		wp_js_plugin_starter_url( 'dist/index.js' ),
		array( 'wp-blocks', 'wp-element' ),
		'1.0.1'
	);

	register_block_type( 'wp-js-plugin-starter/hello-world', array(
		'editor_script' => 'wp-js-plugin-starter',
	) );
}

/**
 * Trigger the block registration on init.
 */
add_action( 'init', 'wp_js_plugin_starter_register_block' );
