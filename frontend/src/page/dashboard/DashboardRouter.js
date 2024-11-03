import React from 'react'
import RootLayout from './RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

const DashboardRouter = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </RootLayout>
  )
}
export default DashboardRouter;
