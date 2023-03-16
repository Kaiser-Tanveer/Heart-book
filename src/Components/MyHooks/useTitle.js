import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - HeartBook`
    }, [title])
};

export default useTitle;