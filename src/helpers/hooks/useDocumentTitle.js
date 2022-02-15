import { useRef, useEffect } from 'react'

function useDocumentTitle(title) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
            document.title = defaultTitle.current;
    }, [])
}

export default useDocumentTitle