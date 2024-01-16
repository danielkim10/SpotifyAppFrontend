interface SearchBar {
    id: string,
    placeholder: string,
    className: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
};

export default SearchBar;