import React from 'react'
import { AppBar,Box,Button,Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image'
export const Navbar = () => {
  const {token} = useSelector<RootState,RootState["auth"]>((state) => state.auth);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    location.reload();
  }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Image src="/images/massyve.svg" alt="Logo" width={70} height={70}/>
        <Box sx={{flex:1}}/>
        {token && <Button onClick={handleLogout} sx={(theme)=>({backgroundColor:"red",color:"white"})} variant='contained'>Log out</Button>}
      </Toolbar>
    </AppBar>
  )
}
