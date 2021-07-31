import { Dispatch, SetStateAction, useEffect, useState } from "react"



export const useStore = (props: {url: string}) => {
    const [url, setUrl] = useState("");
  
    // Listen to changes of url
    useEffect(() => {
        if (props?.url) {
            setUrl(url)
        }
    }, [props.url])

    return {
        url
    }
}

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUrl = (url: string, setState: Dispatch<SetStateAction<string>>) => {
    if (url) setState(url)
}