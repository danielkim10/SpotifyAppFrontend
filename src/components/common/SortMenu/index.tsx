import { useState, useEffect } from 'react';

import SortOption from '../../../interfaces/options/SortOption';

import SortMenuButton from "./SortMenuButton";
import SortMenuDropdown from "./SortMenuDropdown";

const SortMenu = (props: { sortOptions: SortOption[], onOptionSelected: (so: SortOption, asc: boolean) => void }) => {
    const { sortOptions, onOptionSelected } = props;

    const [open, setOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const [selectedOption, setSelectedOption] = useState<SortOption>(sortOptions[0]);
    const [sortAscending, setSortAscending] = useState(true);

    useEffect(() => {
        onOptionSelected(selectedOption, sortAscending);
    }, [selectedOption, sortAscending, onOptionSelected]);

    const handleClose = () => {
        setAnchorElement(null);
        setOpen(false);
    }

    const selectOption = (option: SortOption) => {
        if (option.fieldName === selectedOption.fieldName) {
            setSortAscending(!sortAscending);
        }
        else {
            setSortAscending(true);
            setSelectedOption(option);
        }
        setOpen(false);
    }

    return (
        <div className="sort-menu">
            <SortMenuButton
                selectedOption={selectedOption}
                setOpen={(b: boolean) => setOpen(b)}
                setAnchorElement={(el: HTMLElement | null) => setAnchorElement(el)}
            />
            <SortMenuDropdown
                open={open}
                anchorElement={anchorElement}
                sortOptions={sortOptions}
                selectedOption={selectedOption}
                sortAscending={sortAscending}
                selectOption={selectOption}
                onClose={handleClose}
            />
        </div>
    );
}

export default SortMenu;