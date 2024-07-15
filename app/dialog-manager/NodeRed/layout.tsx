import React from 'react'
import Drawer from '../../Components/Drawer/Drawer';
import { Container } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
<>
 <Drawer />
    <Container maxWidth='xl' sx={{ height: "calc(100vh - 30px)", paddingTop:'10px', paddingBottom:'50px' }}>
        {children}
   </Container>


</>
  )
}