<?php 
defined('ABSPATH') || exit;

function heliblocks_enqueue_stylesheet_variables() {
	$heliblocks_stylesheet = get_option(HELIBLOCKS_STYLESHEET);
	
	wp_register_style('heliblocks-css-variables', false);
	wp_enqueue_style('heliblocks-css-variables');
	wp_add_inline_style( 'heliblocks-css-variables', $heliblocks_stylesheet );
}
add_action( 'wp_enqueue_scripts', 'heliblocks_enqueue_stylesheet_variables' );

