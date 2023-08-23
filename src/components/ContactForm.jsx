import React, { useEffect, useState } from 'react';

const ContactForm = ()=>{

    const [thankyou, setThankyou] = useState(false)
    const [firstName, setFirstName]= useState("")
   


    return(

        <div id="contactUs">
        <form>
            <label htmlFor="fname" className="formLabel">First Name</label>
            <input className="formInput" type="text" id="firstName" name="firstName" placeholder="Your name.."
                onChange={(e) => setFirstName(e.target.value)} value={firstName} />
       
            <label htmlFor="lname" className="formLabel">Last Name</label>
            <input className="formInput" type="text" id="lname" name="lastname" placeholder="Your last name.." />
       
            <label htmlFor="email" className="formLabel">Email</label>
            <input type="text" id="email" name="email" placeholder="Your Email.." />
       
            <label htmlFor="subject" className="formLabel">Subject</label>
            <textarea className="formInput" id="subject" name="subject" placeholder="Write something.."></textarea>
       
            <button className="formButton" type="submit" value="Submit" onClick={(e) => {
                setThankyou(true)
            }}>Submit</button>
            {thankyou && (
                <div id="contactResponse">
                    <span onclick={() => setThankyou(false)} class="close" title="Close Modal">&times;</span>
                    <h1>{`Thank you ${firstName} for contacting us, you should receive a response shortly`}</h1>
                </div>
            )}
       
        </form>
       
       </div>

    )


}

export default ContactForm






