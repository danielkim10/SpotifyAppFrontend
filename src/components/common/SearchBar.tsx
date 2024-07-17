import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import SearchBarInterface from '../../interfaces/searchBar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = (props: {searchBarInterface: SearchBarInterface}) => {
    const { searchBarInterface } = props;

    return (
        <TextField id={searchBarInterface.id} className={searchBarInterface.className}
            placeholder={searchBarInterface.placeholder} value={searchBarInterface.value}
            InputProps={
                {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={searchBarInterface.onClear}>
                                <CloseRoundedIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {
                        '& .MuiInputBase-input': {
                            color: 'white'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        },
                    },
                }
            }
            onChange={searchBarInterface.onChange}
            sx={{
                '& .MuiInputBase-root': {
                    color: 'white'
                },
                '& .MuiInputLabel-root': {
                    color: 'white'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                },
            }}
        />
    );
}

export default SearchBar;