import Button from '../Button';
import SortOption from '../../../interfaces/options/SortOption';

const SortButton = (props: {selectedOption: SortOption, setOpen: (b: boolean) => void, setAnchorElement: (el: HTMLElement | null) => void}) => {
    const { selectedOption, setOpen, setAnchorElement } = props;
    
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorElement(event.currentTarget);
    }

    return (
        <div id="sort-button">
            <Button label={selectedOption.displayName} endIcon="sort_rounded" bgColorScheme="grey" handleClick={handleButtonClick}/>
        </div>
    );
}

export default SortButton;