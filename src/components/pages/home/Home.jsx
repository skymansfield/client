import React, { useState, useEffect } from "react";
import { openModal } from "../../redux/features/modalSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { reset } from "../../redux/features/userSlice";
import "../home/home.css" 
import SignIn from "../../SignIn";
import PPPLogo from '../../../../src/resources/logos/PPP3.gif'
import atrium from '../../../resources/collageImages/atrium.jpg'
import camera from '../../../resources/collageImages/camera.jpg'
import camera2 from '../../../resources/collageImages/camera2.jpg'
import houseArch from '../../../resources/collageImages/house_arch.jpg'
import house1 from '../../../resources/collageImages/house1.jpg'
import kitchenconcrete from '../../../resources/collageImages/kitchenconcrete.jpg'
import roses from '../../../resources/collageImages/roses.jpg'
import tables1 from '../../../resources/collageImages/tables1.png'
import tulips from '../../../resources/collageImages/tulips.jpg'
import weddingLocation from '../../../resources/collageImages/wedding_location.jpg'
import downtownMarket from '../../../resources/collageImages/downtownMarket.jpg'
import building from '../../../resources/collageImages/building.jpg'
import birthday from '../../../resources/collageImages/birthday.jpg'
import market from '../../../resources/collageImages/market.webp'
import vwbus from '../../../resources/collageImages/vwbus.jpg'
import BotanicGarden from '../../../resources/collageImages/BotanicGarden.jpg'
import catering from '../../../resources/collageImages/catering.jpg'
import catering2 from '../../../resources/collageImages/catering2.jpg'
import clipboardwall from '../../../resources/collageImages/clipboardwall.jpg'
import flowerarach from '../../../resources/collageImages/flowerarach.jpg'
import invitations2 from '../../../resources/collageImages/invitations2.jpg'
import ResidentialHousing from '../../../resources/collageImages/Residential-Home-Construction-800.jpg'
import wedding from '../../../resources/collageImages/wedding.jpg'
import garden from '../../../resources/collageImages/garden.png'
import flowers from '../../../resources/collageImages/flowers.png'
import party from '../../../resources/collageImages/party.png'


const Home = ({setSignButton, signButton}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isOpen } = useSelector((store) => store.modal)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [signIn, setSignIn]=useState(true)

  
    
    useEffect(() => {
            dispatch(reset())
          
    }, [dispatch]);

    return (

        <div id="background">
            <div className="row">
                <div className="column">

                    <img className="collageImages" src={atrium} />
                    <img className="collageImages" src={ResidentialHousing} />
                    <img className="collageImages" src={catering} />
                    <img className="collageImages" src={wedding} />
                    {/* <img id="tulips" className="collageImages" src={tulips} /> */}
                 

                </div>
                <div className="column">
             
                    <img className="collageImages" src={birthday} />
                    <img className="collageImages" src={catering2} />
                    <img className="collageImages" src={kitchenconcrete} />
                    <img className="collageImages" src={BotanicGarden} />
             
                 
                </div>
 
            <div className="column">
                    <img className="collageImages" src={vwbus} />
                    <img className="collageImages" src={camera} />
                    <img className="collageImages" src={garden} />
                    <img className="collageImages" src={houseArch} />
                    {/* <img className="collageImages" src={clipboardwall} /> */}

                </div> 
                <div className="column ">
                    <img className="collageImages" src={tables1} />
                    <img className="collageImages" src={party} />
                    <img className="collageImages" src={weddingLocation} />
                    <img className="collageImages" src={invitations2} />
                    {/* <img className="collageImages" src={building} /> */}

                </div>
                <div className="column ">
                <img id="tulips" className="collageImages" src={tulips} />
                    <img className="collageImages" src={flowerarach} />
                    <img className="collageImages" src={clipboardwall} />
                    {/* <img className="collageImages" src={invitations2} /> */}
                    <img className="collageImages" src={building} />

                </div>
            </div>
            <div id="home">
               
                {signIn &&( <button className="homeLinks" onClick={() =>{
                    dispatch(openModal()) 
                    setSignIn(false)
                    }} >Sign-In</button>)}
             
                    {isOpen && 
                        <div id="homeSignIn">
                        <SignIn 
                           signButton={signButton}
                           setSignButton={setSignButton} />
     
                        </div>}
              
                <img className="logo" src={PPPLogo} alt="Personal Project Planner" />
                <h1 id="header"></h1>
                <button className = "homeLinks" onClick={()=> navigate('/IntroPage')}>Check it out</button>
            
            </div>

        </div>


    )


}

export default Home

