import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

import { TEXT_DOMAIN } from './../config';

registerBlockType( 'lab-heliblock-builder/lab-heliblock-builder', {
	title: __('Heliblock Builder', TEXT_DOMAIN),
	icon: 'lock',
    category: 'layout',
    supports: {
        align: true,
    },
    attributes: {
        html: {
            type: 'string',
            default: ''
        },
        css: {
            type: 'string',
            default: ''
        },
        isChoosed: {
            type: 'boolean',
            default: false
        },
        uniqueClassName: {
            type: 'string',
            default: ''
        },
        store: {
            type: 'string',
            default: '[]'
        }
    },
    edit,
    save
} );
