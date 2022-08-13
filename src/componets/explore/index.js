import { Modal } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";

import { i18n } from "../../utils";

const ExploreModal = ({ onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(true) }, []);

  const onCloseHandle = () => {
    setOpen(false);
    onClose();
  }
  if (!open) {
    return null;
  }

  return (
      <Modal
        title={i18n("Heliblocks")}
        onRequestClose={onCloseHandle}
      >
        <p>
          <strong>{i18n("This plugin has been deprecated.")}</strong> <br />
          {i18n("Previously added blocks will continue to work normally but new ones cannot be added.")}
        </p>
        
        <Button isPrimary onClick={onCloseHandle}>
          {i18n("Accept")}
        </Button>
      </Modal>
  );
};

export default ExploreModal;
