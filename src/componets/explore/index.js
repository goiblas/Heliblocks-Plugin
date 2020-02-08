import { Modal } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TEXT_DOMAIN } from './../../config';

import Explore from './explore';
import Playground from './playground';

const ExploreModal = ({ onClose, onChoose }) => {
    const [ isOpen, setOpen ] = useState( false );
    useEffect( () => {
        setOpen(true)
    }, []);

	return (
		<>
        {isOpen && 
            <Modal 
                style={{minWidth: '92%'}}
                title={__('Explore', TEXT_DOMAIN)}
                onRequestClose={ onClose }>
                {/* <Playground onChoose={ onChoose } /> */}
                <Explore onChoose={ onChoose } />
            </Modal>
        }
		</>
	)
}

export default ExploreModal;