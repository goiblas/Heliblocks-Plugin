<?php 
defined('ABSPATH') || exit;

$heliblocks_initial_tokens = '{"black":"#1c1c21","white":"#ffffff","primary":"#0064bd","secondary":"#a155d0","tertiary":"#50d254"}';
$heliblocks_initial_stylesheet = "
:root {
    --hb-color-primary-100: #D6E4FF;
    --hb-color-primary-200: #ADC8FF;
    --hb-color-primary-300: #84A9FF;
    --hb-color-primary-400: #6690FF;
    --hb-color-primary-500: #3366FF;
    --hb-color-primary-600: #254EDB;
    --hb-color-primary-700: #1939B7;
    --hb-color-primary-800: #102693;
    --hb-color-primary-900: #091A7A;

    --hb-color-secondary-100: #FDDBD2;
    --hb-color-secondary-200: #FBAFA7;
    --hb-color-secondary-300: #F57A79;
    --hb-color-secondary-400: #EC5765;
    --hb-color-secondary-500: #E02447;
    --hb-color-secondary-600: #C01A49;
    --hb-color-secondary-700: #A11247;
    --hb-color-secondary-800: #810B43;
    --hb-color-secondary-900: #6B063F;

    --hb-color-tertiary-100: #F5F5F5;
    --hb-color-tertiary-200: #EEEEEE;
    --hb-color-tertiary-300: #E0E0E0;
    --hb-color-tertiary-400: #BDBDBD;
    --hb-color-tertiary-500: #9E9E9E;
    --hb-color-tertiary-600: #757575;
    --hb-color-tertiary-700: #616161;
    --hb-color-tertiary-800: #424242;
    --hb-color-tertiary-900: #212121;

    --hb-color-black: #1c1c21;
    --hb-color-white: #ffffff;
}";

if( get_option( HELIBLOCKS_TOKENS ) === false ) {
    update_option( HELIBLOCKS_TOKENS, $heliblocks_initial_tokens );
}

if( get_option( HELIBLOCKS_STYLESHEET ) === false ) {
    update_option( HELIBLOCKS_STYLESHEET, $heliblocks_initial_stylesheet );
}