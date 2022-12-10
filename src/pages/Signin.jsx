import { MyButton } from '../components/Button/Button';
import { MyTextField } from '../components/TextField/TextField';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/firebase'

export function Signin() {
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
            await signIn(inputs.email, inputs.password)
            navigate('/profile')
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
            setInputs({ email: '', password: '' })
        }
    }

    return (
        <>
            <h1>Sign in</h1>
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
                        Sign in
                    </MyButton>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Login or password is FALIED</p>}
        </>
    )
}
