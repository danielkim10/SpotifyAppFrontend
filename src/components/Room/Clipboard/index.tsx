import { useState, useContext } from 'react';

import Menu from '@mui/material/Menu';
import TrackInterface from '../../../interfaces/track';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import { formatMultipleArtists } from '../../../utilities/random';
import ClipboardHeader from './ClipboardHeader';

const Clipboard = (props: { open: boolean }) => {
    const { open } = props;

    const [clipboardItems, setClipboardItems] = useState<TrackInterface[]>([]);
    const [selectedItem, setSelectedItem] = useState("");

    const clipboard = useContext(ClipboardContext);

    const addItem = () => {

    }

    const selectItem = () => {
        
    }

    const deleteItem = () => {

    }

    return (
        <Menu open={open}>
            <div className="chat-window">
            <ClipboardHeader/>
            {
                clipboardItems.map(item => {
                    return (
                        <div onClick={selectItem}>
                            <img alt="" src=""/>
                            <span>{item.name}</span>
                            <span>{formatMultipleArtists(item.artists)}</span>
                        </div>
                    );
                })
            }
            </div>
        </Menu>
    );
}

export default Clipboard;