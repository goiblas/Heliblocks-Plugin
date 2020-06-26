import { MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

const ImageUpload = ({ onChange, src, alt }) => {
  const onSelectImage = media => {
    console.log(media);
    if (media) {
      onChange({
        src: media.url,
        alt: media.alt
      });
    }
  };
  return (
    <div style={{ marginBottom: "16px" }}>
      <MediaUpload
        onSelect={onSelectImage}
        allowedTypes="image"
        value={src}
        render={({ open }) => (
          <Button className={"hb-image-button"} onClick={open}>
            <img src={src} alt={alt} />
          </Button>
        )}
      />
    </div>
  );
};

export default ImageUpload;
