import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <div>Layoute</div>
      <Outlet/>
    </div>
  )
}

export default Layout