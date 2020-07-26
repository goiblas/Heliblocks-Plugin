import { useContext, createContext } from "@wordpress/element";
import { Slot, Fill } from '@wordpress/components';

const SlotFillContext = createContext(null);

export const SlotFillProvider = ({id, children }) => {
    return (
        <SlotFillContext.Provider value={{id}}>
            {children}
        </SlotFillContext.Provider>
    )
}

export const MediaSlot = props => {
    const {id} = useContext(SlotFillContext);
    return <Slot name={`Inspector.Media.${id}`} {...props} />
}

export const MediaFill = props => {
    const {id} = useContext(SlotFillContext);
    return <Fill name={`Inspector.Media.${id}`} {...props} />
} 

