import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const initialState = { email: '', password: '' }
    const [data, setData] = useState(initialState)
    const { email, password } = data

    const onSubmit = (e) => {
        e.preventDefault()
        setData(initialState)
    }

    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    return (
        <div className='login-form'>
            <div className='login'>Login into Cap10z lounge</div>
            <form onSubmit={onSubmit}>
                <div className='form-group form-group-login'>
                    <label htmlFor="Email">Email</label>
                    <input className='form-control' onChange={onChange} placeholder='Enter Email' id='email' name='email' value={email} type="email" />
                </div>
                <div className='form-group form-group-login'>
                    <label htmlFor="Password">Password</label>
                    <input className='form-control' onChange={onChange} placeholder='Enter Password' id='password' name='password' value={password} type="password" />
                </div>
                <div className='form-group form-group-login'>
                    <button className='btn btn-warning form-control'>Login</button>
                </div>
            </form>
            <p><Link to="/request-password-reset">Forgot Password </Link> </p>
        </div>
    )
}

export default Login