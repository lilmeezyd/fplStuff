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
import PlayerScreen from './screens/PlayerScreen.jsx'
import Unknown from './screens/Unknown.jsx'
import AchievementsScreen from './screens/AchievementsScreen.jsx'
import Fixtures from './screens/Fixtures.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/compare' element={<Compare />} />
      <Route path='/planner' element={<Planner />} />
      <Route path='/statistics/players/:playerId' element={<PlayerScreen />} />
      <Route path='/achievements' element={<AchievementsScreen />} />
      <Route path='/fixtures' element={<Fixtures />} />
      <Route path="*" element={<Unknown/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
