import React from 'react'
import SideBar from './SideBar'
import useMediaQuery from "@mui/material/useMediaQuery";
import {Box} from '@mui/material';
import Header from '../themes/Header';
import NavBar from './NavBar';
import AddItem from './AddItem';
import Test from './Test';
import Listings from '../User/Listings';
const DashBoard = () => {
    const props = useMediaQuery("(min-width:600px)");
    return (
        <Box className="flex">
          <SideBar />
          <div style={{ marginLeft: '300px', width: 'calc(100% - 300px)' }}>
            <NavBar />
            <Box m="20px" p="65px" className="mt-16 p-4">
              {/* HEADER */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="BIDCIRCLE Seller dashboard" />
              </Box>
              {/* <AddItem /> */}
              {/* <Test/> */}
              <Listings/>
            </Box>
          </div>
        </Box>
      );
    };

export default DashBoard