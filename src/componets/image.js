import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const Image = ({ onChange, src, alt }) => {
    const onSelectImage = ( media ) => {
        onChange({
            src: media.url,
            alt: media.alt
        })
    } 
   return (
    <MediaUpload 
        onSelect={ onSelectImage }
        allowedTypes="image"
        value={ src }
        render={ ( { open } ) => (
            <Button className={ src ? 'image-button' : 'button button-large' } style={src ? { height: 'auto'} : ''} onClick={ open }>
                { ! src ? 'Upload Image' : <img src={ src } alt={ alt } /> }
            </Button>
        ) }
        />
    )
}

export default Image;
