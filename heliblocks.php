<?php
/**
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Heliblocks
 * Version:     2.2.2
 * Description: Use unique structures in your posts and pages, with Block editor and collection snippets of Heliblocks.
 * Author:      Jesús Olazagoitia
 * Author URI:  https://goiblas.com
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */
defined('ABSPATH') || exit;

add_action( 'init', 'heliblocks_init_register_block' );

function heliblocks_init_register_block() {
	load_plugin_textdomain( 'heliblocks', false, basename( __DIR__ ) . '/languages' );

    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'heliblocks_script_register_block',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
    );

	wp_register_style(
        'heliblocks_css_editor',
        plugins_url( 'assets/css/editor.css', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/editor.css' )
		);

	wp_localize_script(
		'heliblocks_script_register_block',
		'hb_assets',
		array(
			'algolia' => plugins_url( 'assets/img/search-by-algolia.svg', __FILE__ )
		)
	);
 
	register_block_type( 'heliblocks/heliblocks', array(
		'editor_script' => 'heliblocks_script_register_block',
		'editor_style' => 'heliblocks_css_editor'
	 ));

	 if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
		 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
		 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'heliblocks_script_register_block', 'heliblocks' );
	  }
}
