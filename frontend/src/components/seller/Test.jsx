import React from 'react'
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import axios from 'axios';
const Test = () => {
const handleClick = async ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    try{
    
    const response = await axios.get('http://localhost:9081/seller/hi', {
        headers: {
          'Authorization': user.accessToken,
          "Content-Type": "application/json"  
        },
       
      });
      console.log(response.data)
    }catch(e){
        console.log(e);

    }
    console.log("hi");
}

  return (
    <Button type="submit" color='secondary' variant='contained' onClick={handleClick} >s</Button>
  )
}

export default Test