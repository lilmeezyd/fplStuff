import {useEffect} from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute() {
    const navigate = useNavigate()
    const { adminInfo } = useSelector((state) => state.auth);
    useEffect(() => {
      if(!adminInfo) return navigate('/')
    })
    
    
  return (
    <Outlet />
  )
}

export default PrivateRoute