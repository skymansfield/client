import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVendor, deleteVendor, getVendor, editVendor } from '../components/redux/features/vendorSlice';

const VendorAdd = () => {

    const { user, isError } = useSelector((state) => state.user);
    const [vendorName, setVendorName] = useState('')
    const [vendorContactName, setVendorContactName] = useState('')    
    const [vendorPhone, setVendorPhone] = useState ('')
    const [vendorWebsite,setVendorWebsite] = useState('')
    const [vendorAddress, setVendorAddress] = useState('')
    const [vendorCity, setVendorCity] = useState('')
    const [vendorState, setVendorState]= useState('')
    const [vendorZipcode, setVendorZipcode] = useState('')
    const [vendorProjects, setVendorProjects] = useState([])
  

    const dispatch = useDispatch()

    const handleCreateVendor = (e) => {
        e.preventDefault();
        const newVendor = {
            vendorName: vendorName,
            vendorContactName:vendorContactName,
            vendorPhone:vendorPhone,
            vendorWebsite:vendorWebsite,
            vendorAddress: vendorAddress,
            vendorCity:vendorCity,
            vendorState:vendorState,
            vendorZipcode:vendorZipcode,
            vendorProjects:vendorProjects
      
        };
        dispatch(createVendor(newVendor));
        //clear out inputs here
    };

    return (
        <>
            <div className="formHeader">Add New Vendor</div>
            <form id="addForm" action="/api/vendor/new-vendor" method="post">
                <label className="formLabel" htmlFor="vendorName">Vendor Name</label>
                <input className="formInput" onChange={(e) => setVendorName(e.target.value)} id="vendorName" name="vendorName" value={vendorName} type="text" />

                <label className="formLabel" htmlFor="vendorContactName" >Contacts Name</label>
                <input className="formInput" onChange={(e) => setVendorContactName(e.target.value)} id="vendorContactName" value={vendorContactName} type="text" name="vendorContactName" />

                <label className="formLabel" htmlFor="vendorPhone">Phone Number</label>
                <input className="formInput" onChange={(e) => setVendorPhone(e.target.value)} id="vendorPhone" value={vendorPhone} type="Number" name="vendorPhone" />

                <label className="formLabel" htmlFor="vendorWebsite">Website</label>
                <input className="formInput" onChange={(e) => setVendorWebsite(e.target.value)} id="vendorWebsite" value={vendorWebsite} type="text" name="vendorWebsite" />

                <label className="formLabel" htmlFor="vendorAddress" >Address</label>
                <input className="formInput" onChange={(e) => setVendorAddress(e.target.value)} id="vendorAddress" value={vendorAddress} type="text" name="vendorAddress" />

                <label className="formLabel" htmlFor="vendorCity" >City</label>
                <input className="formInput" onChange={(e) => setVendorCity(e.target.value)} id="vendorCity" value={vendorCity} type="text" name="vendorCity" />

                <label className="formLabel" htmlFor="vendorState" >State</label>
                <input className="formInput" onChange={(e) => setVendorState(e.target.value)} id="vendorState" value={vendorState} type="text" name="vendorState" />

                <label className="formLabel" htmlFor="vendorZipcode" >Zipcode</label>
                <input className="formInput" onChange={(e) => setVendorZipcode(e.target.value)} id="vendorZipcode" value={vendorZipcode} type="text" name="vendorZipcode" />
                
                <button className="formButton" onClick={handleCreateVendor}>Submit</button>
            </form>
        </>


    )


}

export default VendorAdd