<?php 
defined('ABSPATH') || exit;

add_action('rest_api_init', 'heliblocks_custom_endpoint');

function heliblocks_custom_endpoint() {
    // tokens
    register_rest_route(
        HELIBLOCKS_REST_NAMESPACE,
        'tokens/',
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'heliblocks_get_tokens'
        ]
    );
    register_rest_route(
        HELIBLOCKS_REST_NAMESPACE,
        'tokens/',
        [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => 'heliblocks_update_tokens',
            'permission_callback' => 'heliblocks_check_permissions'
        ]
    );
    // stylesheet
    register_rest_route(
        HELIBLOCKS_REST_NAMESPACE,
        'stylesheet/',
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'heliblocks_get_stylesheet'
        ]
    );
    register_rest_route(
        HELIBLOCKS_REST_NAMESPACE,
        'stylesheet/',
        [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => 'heliblocks_update_stylesheet',
            'permission_callback' => 'heliblocks_check_permissions'
        ]
    );
}

function heliblocks_get_tokens() {
    $heliblocks_tokens = get_option( HELIBLOCKS_TOKENS );

    $response = new WP_REST_Response( $heliblocks_tokens );
    $response->set_status(200);

    return $response;
}

function heliblocks_update_tokens( $request ) {
    $new_tokens = $request->get_body();
    update_option( HELIBLOCKS_TOKENS, $new_tokens );

    $heliblocks_tokens = get_option( HELIBLOCKS_TOKENS );
    $response = new WP_REST_Response( $heliblocks_tokens );
    $response->set_status(201);

    return $response;
}

function heliblocks_get_stylesheet() {
    $heliblocks_stylesheet = get_option( HELIBLOCKS_STYLESHEET );

    $response = new WP_REST_Response( $heliblocks_stylesheet );
    $response->set_status(200);

    return $response;
}

function heliblocks_update_stylesheet( $request ) {
    $new_stylesheet = $request->get_body();
    update_option( HELIBLOCKS_STYLESHEET, $new_stylesheet );

    $heliblocks_stylesheet = get_option( HELIBLOCKS_STYLESHEET );
    $response = new WP_REST_Response( $heliblocks_stylesheet );
    $response->set_status(201);

    return $response;
}

function heliblocks_check_permissions() {
    return current_user_can("edit_posts");
}