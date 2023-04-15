import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search'
import { Typography } from '@mui/material';



function BottomNav() {
  const [value, setValue] = React.useState(0);
  return (    
    <BottomNavigation       
        value={value}
        sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-around",
            position: "fixed",
            bottom: 0,
            width: "100%",
            padding: "16px",
            height: '5%'
    }}
    
        onChange={(event:any , newValue:any) => {
          setValue(newValue);          
        }}>
        <BottomNavigationAction label={<Typography variant="body1" style={{ fontSize: "2rem" }}>Home</Typography>} icon={<HomeIcon  style={{ fontSize: "4rem" }} />}    />
        <BottomNavigationAction label={<Typography variant="body1" style={{ fontSize: "2rem" }}>Chat</Typography>} icon={<ChatIcon style={{ fontSize: "4rem" }} />}  />
        <BottomNavigationAction label={<Typography variant="body1" style={{ fontSize: "2rem" }}>Search</Typography>} icon={<SearchIcon style={{ fontSize: "4rem" }}/>}  />
        <BottomNavigationAction label={<Typography variant="body1" style={{ fontSize: "2rem" }}>Notifications</Typography>} icon={<NotificationsIcon style={{ fontSize: "4rem" }}/>} />
        <BottomNavigationAction label={<Typography variant="body1" style={{ fontSize: "2rem" }}>profile</Typography>} icon={<PersonIcon style={{ fontSize: "4rem" }}/>}  />
      </BottomNavigation>
      
      
  )
}

export default BottomNav