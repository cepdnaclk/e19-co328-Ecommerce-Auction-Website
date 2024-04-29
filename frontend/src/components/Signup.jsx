
import React from 'react'
import loginImage from '../assests/loginimage.avif'
import bid from '../assests/bid.png'
import logo from '../assests/logo.jpg'
import logo1 from '../assests/brand.png'
import gold from '../assests/goldlogo.png'
import SignupForm from './SignupForm'
import Header from './themes/Header';
import LogInForm from './LogInForm'

const Signup = ({props}) => {
 

    return (
        <section className=" select-none h-screen flex flex-col md:flex-row justify-center  md:space-y-0 md:space-x-16 
        items-center my-2 mx-5 md:mx-0 md:my-0 bg-blac">
            {/* <div className="md:w-1/3 max-w-md flex-none">
                <div>
                    <img src={logo} alt="" width="900" height="800" />
                </div>
            </div> */}
            <div className="md:w-1/3 max-w-xl flex-1 flex-grow">
                <div className="my-5 flex items-center">
                    {/* <img src = {logo} alt="" width="120" height = "100"/> */}
                    <img src={gold} width="550" height = "500"/>
                    {/* <p className="mx-4 mb-0 text-center font-semibold text-slate-500 text-6xl">BIDCircle</p> */}
                    {/* <Header title = "BIDCIRCLE" subtitle=""/> */}
                </div>
               
                 {props == "signup"? <SignupForm/> :<LogInForm/>}
                
            </div>
            
        </section>
        
    );

}

export default Signup