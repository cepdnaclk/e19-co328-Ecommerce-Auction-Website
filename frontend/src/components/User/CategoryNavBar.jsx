import React from 'react';
import {
  Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
    const navigate = useNavigate();

    const handle =(id)=>{
        navigate("/category/?name="+id);
        window.location.reload();
        
      }

    const handleAll = ()=>{
      navigate("/");
      window.location.reload();
    }
 
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '45px',
        backgroundColor: '#E6F0FF',
        width: '97vw',
        marginTop:'1',
        height: '30px',
        paddingLeft: '5px',
        padding:'8'
      }}
    >
      <Button onClick={()=>handleAll()}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        All
              </Typography>
      </Button>
      
      <Button onClick={()=>handle("Fine Arts")}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        Fine arts
      </Typography>
      </Button>
      <Button onClick={()=>handle("Decorative Arts")}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        Decorative arts
      </Typography>
      </Button>
      <Button onClick={()=>handle("Jewellery")}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        Jewellery
      </Typography>
      </Button>

      <Button onClick={()=>handle("Watches")}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        Watches
      </Typography>
      </Button>

      <Button onClick={()=>handle("Other")}><Typography
        variant="inherit"
        color="#424242"
        fontSize="22"
       
      >
        Other
      </Typography>
      </Button>
      
      
        
    </Box>
  );
};

