import React from 'react'
import Drawer from '@/app/Components/Drawer/Drawer';
import {Container} from '../../Components/muiIcons/muiIcons';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
<>
 <Drawer  />
    <Container maxWidth='xl' sx={{ height: "calc(100vh - 80px)" }}>
        {children}
   </Container>


</>
  )
}