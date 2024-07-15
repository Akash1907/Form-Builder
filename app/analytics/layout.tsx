import React from 'react'
import Drawer from '../Components/Drawer/Drawer';
import {
  Container,
  } from '../Components/muiIcons/muiIcons';
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