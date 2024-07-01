interface ContextMenuOption {
    name: string,
    iconName: string,
    function: (a?: any) => void,
    visible: boolean
};

export default ContextMenuOption;