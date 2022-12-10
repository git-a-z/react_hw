import { MyButton } from '../components/Button/Button';
import { MyTextField } from '../components/TextField/TextField';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/firebase'

export function Signup() {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleInputs = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlerForm = async (event) => {
        event.preventDefault()
        try {
            setError('')
            setLoading(true)
            await signUp(inputs.email, inputs.password)
            navigate('/signin')
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
            setInputs({ email: '', password: '' })
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={handlerForm}>
                <div className='InputBox'>
                    <MyTextField
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name='email'
                        onChange={handleInputs}
                        value={inputs.email ?? ''}
                        aria-describedby="emailHelp"
                        label="Email"
                    >
                    </MyTextField>
                    <div className='EmptySpace'></div>
                    <MyTextField
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleInputs}
                        value={inputs.password ?? ''}
                        id="exampleInputPassword1"
                        label="Password"
                    >
                    </MyTextField>
                    <div className='EmptySpace'></div>
                    <MyButton type="submit">
                        Sign up
                    </MyButton>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </>
    )
}
