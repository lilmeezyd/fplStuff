import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from '../slices/authSlice'
import { Spinner } from 'react-bootstrap'

const Login = () => { 
    const initialState = { email: '', password: '' }
    const [data, setData] = useState(initialState)
    const { email, password } = data

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const { adminInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(adminInfo) {
          navigate('/admin')
        }
      }, [navigate, adminInfo])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/admin')
          } catch (err) {
            console.log(err)
              //toast.error(err?.data?.message || err.error)
          }
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