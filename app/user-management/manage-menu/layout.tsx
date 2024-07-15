import React from 'react'
import { Container } from '@mui/material';
import Drawer from '@/app/Components/Drawer/Drawer';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
<>
 <Drawer />
    <Container sx={{ height: "calc(100vh - 80px)" }}>

     
        {children}
   </Container>


</>
  )
}