import { Modal , TabPanel} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

import { i18n } from "../../utils";
import Explore from "./explore";
import Playground from "./playground";
import Account from "./account";

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
        
        <TabPanel
        className="hb-tab-panel"
        activeClass="is-actived-tab"
        style={{ borderBottom: "1px solid #ddd"}}
        tabs={ [
            {
                name: 'explore',
                title: 'Explore'
            },
            {
                name: 'account',
                title: 'Account'
            },
        ] }>
        {
            ( tab ) => {
              if(tab.name === "explore") {
                return <Explore onChoose={onChoose} />
              } else {
                return <Account onChoose={onChoose} />
              }
            }
        }
    </TabPanel>
        </Modal>
      )}
    </>
  );
};

export default ExploreModal;
