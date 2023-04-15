import React from 'react'
// import { Input } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import "../assets/styles/navbar.css"




const StyledToolbar= styled(Toolbar)({
    display: "flex", 
    justifyContent: "space-between"
})
  

function NavbarTop() {
  // useEffect(() => {
  // }, [])
  //sx={{display:{xs: "none"}}}
  
  return (
    <div>
        <AppBar position='sticky' color="secondary" >
            <StyledToolbar>
            <Typography variant="h6">!shop</Typography>
            <div className='search'> 
            <SearchIcon />   
                 
       <div className='textdiv'>  
    <InputBase  fullWidth placeholder='search........'/>
        </div>
            <button className='search_button'>search</button>
            </div>            
<Stack direction="row" gap='20px'>
   <IconButton aria-label="cart">
      <Badge badgeContent={5} color="error">
  <ShoppingCartIcon color="primary"/>
      </Badge>
      </IconButton>
   <IconButton aria-label="notification">
      <Badge badgeContent={20} color='error'>
        <NotificationsIcon color="primary"/>        
      </Badge>
      </IconButton>
      <IconButton aria-label="chat">
      <Badge badgeContent={0} color='error'>
        <ChatIcon color="primary"/>        
      </Badge>
      </IconButton>

</Stack>
<Stack direction="row" gap='20px'>
   <Avatar/>
            <ButtonGroup size="small" variant='text' color="primary" >
                <Button >
                    login
                </Button>
                <Button>
                    Register
                </Button>
            </ButtonGroup>
</Stack>
            </StyledToolbar>
        </AppBar>         
    </div>
    
  )
}

export default NavbarTop