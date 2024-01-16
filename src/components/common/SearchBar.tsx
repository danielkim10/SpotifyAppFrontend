// interfaces
import SearchBarInterface from '../../interfaces/searchBar';

// mui components
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

// mui icons
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
                    )
                }
            }
            onChange={searchBarInterface.onChange}
        />
    );
}

export default SearchBar;