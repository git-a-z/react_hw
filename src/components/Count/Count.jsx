import { useState } from "react"

export const Count = (props) => {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }

    return <>
        <h2>Count</h2>        
        <p>Count: { count }</p>
        <button type="button" onClick={handleClick}>click</button>
        <p>Name: { props.name }</p>
    </>
}
