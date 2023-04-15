import React from 'react'
// import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNav from './BottomNav'
import NavbarTop from './NavbarTop'

export default function Navbar() {
    // const theme = useTheme();    
    const isSmallScreen =  useMediaQuery('(max-width:600px)');
    console.log(isSmallScreen)
  return (
    <>     
    {(isSmallScreen ? (<BottomNav/>) : (<NavbarTop/>))}
    </>
  )
}
