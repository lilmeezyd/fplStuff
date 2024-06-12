import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import Statistics from './screens/Statistics.jsx'
import Compare from './screens/Compare.jsx'
import Planner from './screens/Planner.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/compare' element={<Compare />} />
      <Route path='/planner' element={<Planner />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
