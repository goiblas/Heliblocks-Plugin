import { Modal } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

import { i18n } from "../../utils";
import Explore from "./explore";
import Playground from "./playground";

const ExploreModal = ({ onClose, onChoose }) => {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      {isOpen && (
        <Modal
          style={{ minWidth: "92%", height: "80vh" }}
          title={i18n("Heliblocks")}
          onRequestClose={onClose}
        >
          {/* <Playground onChoose={ onChoose } /> */}
          <Explore onChoose={onChoose} />
        </Modal>
      )}
    </>
  );
};

export default ExploreModal;
