import React from "react"
import './footer.css'
import PPP3 from '../../resources/logos/PPP3.gif'
import phone from '../../resources/logos/phoneFinal.gif'
import instagram from '../../resources/logos/instagram.gif'
import facebook from '../../resources/logos/facebook.gif'
import twitter from '../../resources/logos/twitter.gif'
import github from '../../resources/logos/githubteal.gif'

const Footer = () => {


    return (

        <div id="footerArea">
     

                <div className="regText" id="addressArea">
                    Personal Project Planner<br />
                    123 Any Street<br />
                    Anytown, AZ 86336<br />
                    (928) 282-5555 <br />
                    <a className="regText" href="mailto:alicen@gmail.com" id="emailLink"> PPPlanner@gmail.com</a>
                </div>

                <div id="footerMiddle">
                    <div className="regText" id="tagLine">"Where All Your Projects Come To Life"</div>

                    <div id="iconArea">
                        <a href="#iconArea"> <img className="icons" src={phone} alt="phone" /></a>
                        <a href="#iconArea"> <img className="icons" src={instagram} alt="instagram" /></a>
                        <a href="#iconArea"> <img className="icons" src={facebook} alt="facebook" /></a>
                        <a href="#iconArea"> <img className="icons" src={twitter} alt="twitter" /></a>
                        <a href="#iconArea"> <img id="github" className="icons" src={github} alt="github" /></a>
                    </div>
                </div>

                <div id="copyrightArea">
                    <img id="footerLogo" src={PPP3} alt="PPP Logo" />
                    <p className="regText" id="copyright">&#169; 2023 Personal Project Planner</p>
                </div>
       
        </div>



    )
}
export default Footer