import React from 'react'
import CategoryNavBar from './CategoryNavBar'
import useMediaQuery from "@mui/material/useMediaQuery";
import {Box} from '@mui/material';

import UserNavBar from './UserNavBar'
import Listings from './Listings';
import Hero from '../Hero';

const Home = () => {
    const props = useMediaQuery("(min-width:600px)");
    return (
      
         
          <div style={{ width: '100%' }}>
            
            
            <Box sx={{paddingTop:'60', marginTop:'1'}} className="mt-16 p-4">
            <UserNavBar />
              {/* HEADER */}
              
              {/* <AddItem /> */}
              {/* <Test/> */}
              <Hero/>
              <CategoryNavBar/>
              <br/><br/>
              
              <Listings/>
              
              </Box>
          
          </div>
        
      );
    };

export default Home