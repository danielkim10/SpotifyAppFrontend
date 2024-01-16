interface SortOption {
    fieldName: string,
    displayName: string,
    sortFunction: (a: any, b: any, asc: boolean) => number
};

export default SortOption;