import { useEffect, useContext } from 'react';

import HeaderContext from '../../context/HeaderContext';

const useHeaderCallback = (page: string) => {
    const header = useContext(HeaderContext);
    useEffect(() => {
        header.callback(page);
    }, [header, page])
}

export default useHeaderCallback;