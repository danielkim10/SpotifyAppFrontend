import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SortOption from '../../../interfaces/options/SortOption';

const SortDropdown = (props: {
    open: boolean,
    anchorElement: HTMLElement | null,
    sortOptions: SortOption[],
    selectedOption: SortOption,
    sortAscending: boolean,
    selectOption: (option: SortOption) => void,
    onClose: () => void
}) => {
    const { open, anchorElement, sortOptions, selectedOption, sortAscending, selectOption, onClose } = props;

    return (
        <Menu open={open} anchorEl={anchorElement} onClose={onClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
            {
                sortOptions.map((option: SortOption) => {
                    return (
                        <MenuItem key={option.displayName} onClick={() => selectOption(option)}>
                            <ListItemText>{option.displayName}</ListItemText>
                            <ListItemIcon>
                                {
                                    option.fieldName === selectedOption.fieldName ?
                                    sortAscending ?
                                    <ArrowDownwardRoundedIcon/> :
                                    <ArrowUpwardRoundedIcon/> :
                                    <></>
                                }
                            </ListItemIcon>
                        </MenuItem>
                    );
                })
            }
        </Menu>
    );
}

export default SortDropdown;