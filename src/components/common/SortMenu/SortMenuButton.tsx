import Button from '@mui/material/Button';

import SortRoundedIcon from '@mui/icons-material/SortRounded';
import SortOption from '../../../interfaces/options/SortOption';

const SortButton = (props: {selectedOption: SortOption, setOpen: (b: boolean) => void, setAnchorElement: (el: HTMLElement | null) => void}) => {
    const { selectedOption, setOpen, setAnchorElement } = props;
    
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorElement(event.currentTarget);
    }

    return (
        <div className="sort-button">
            <Button variant="text" endIcon={<SortRoundedIcon />} onClick={handleButtonClick}>
                {selectedOption.displayName}
            </Button>
        </div>
    );
}

export default SortButton;