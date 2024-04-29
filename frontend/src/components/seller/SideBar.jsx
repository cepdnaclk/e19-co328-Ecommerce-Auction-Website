import { FaHandHoldingMedical } from "react-icons/fa";
import React, { useState } from 'react';
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo2 from "../../assests/logo3.png"
import { Typography, Box } from "@mui/material";

const SideBar = () => {
    const navigate = useNavigate();
    const Menus = [
      { title: "Dashboard", src: <AiFillDashboard size={30} color="#575573" />, path: "/seller/dashboard" },
      { title: "Create Items", src: <AiFillFileAdd size={30} color="#575573"/>, path: "/seller/createListing" },
    ];
  
    const navigateDashBoard = (e, path) => {
  
      e.preventDefault();
      navigate(path);
    }
  //bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]  from-gray-700 via-gray-900 to-black
    const open = useMediaQuery("(min-width:600px)");
    return (
  
      <>
        <Box
          className={` ${open ? "w-72" : "w-20 "
            }  h-screen p-5  
            pt-8 duration-300 overflow-y-auto fixed top-0 left-0  }`} sx={{backgroundColor: "#fff8e1"}}
        >
          <div className="flex gap-x-7 items-center">
            <img src={logo2} width="50" height="80"/>
            <Typography variant="h5" color="#3f51b5" fontFamily="monospace" fontSize="30" fontWeight="bold">BIDCIRCLE</Typography>
      
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li key={index} onClick={(e, path) => navigateDashBoard(e, Menu.path)} className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-200 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"}  `}>
                <span>{Menu.src}</span>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  <span className="text-slate-500">{Menu.title}</span>
                </span>
              </li>
            ))}
          </ul>
        </Box>
  
      </>
    );
}

export default SideBar