import { useState } from "react"

export const Form = () => {
    const [name, setName] = useState("GB")

    const handleClick = () => {
        setName(name + "+")
    }

    return <form>
        <h2>Name</h2>
        <p>Name: { name }</p>
        <button type="button" onClick={handleClick}>click</button>
    </form>
}
