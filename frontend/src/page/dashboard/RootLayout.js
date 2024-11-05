import React from 'react'
import Header from '../../component/common/header';

export const metadata = {
  title: 'Demo App',
  description: 'React App'
}

const RootLayout = ({children}) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        {children}
      </div>
    </div>
  )
}
export default RootLayout;
