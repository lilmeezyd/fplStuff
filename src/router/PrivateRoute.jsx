import {useEffect} from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute() {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
      if(!userInfo) return navigate('/')
    })
    
    
  return (
    <Outlet />
  )
}

export default PrivateRoute