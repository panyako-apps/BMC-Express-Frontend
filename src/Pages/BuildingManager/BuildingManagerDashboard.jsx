import React, { useContext, useEffect, useState } from 'react'
import BuildingManagerDashboardLayout from '../../Layouts/BuildingManagerDashboardLayout'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext'
import axios from '../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BuildingManagerDashboard() {
  
    const {currentBuildingManager} = useContext(AuthContext);
    const [flats, setFlats] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [bookings, setBookings] = useState([]);


    const fetchFlats = async () => {
               
        try {
            const res = await axios.get('/flats', {
                params: {
                    building_manager_id: currentBuildingManager.id
                }
            })
            setFlats(res.data);
        } catch (error) 
        {
        } 

    }
    const fetchTenants = async () => {
               
        try {
            const res = await axios.get('/tenants', {
                params: {
                    building_manager_id: currentBuildingManager.id
                }
            })
            setTenants(res.data);
        } catch (error) 
        {
        } 

    }
    const fetchBookings = async () => {
               
        try {
            const res = await axios.get('/bookings', {
                params: {
                    building_manager_id: currentBuildingManager.id
                }
            })
            setBookings(res.data);
        } catch (error) 
        {
        } 

    }


    useEffect(()=>{
        fetchFlats();
        fetchTenants();
        fetchBookings();
    }, [])



    return (
        <BuildingManagerDashboardLayout>

            <section className="container mx-auto  px-8">
                <div className="py-8">
                    <span className="text-slate-500 uppercase text-xl">Welcome : <span className="text-orange-600">{currentBuildingManager.first_name}, {currentBuildingManager.other_names}</span></span>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <Link to={`/building-manager/${currentBuildingManager.id}/flats`}>
                    <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                        <div className="">
                            <div className=" text-3xl mb-3 text-orange-600">
                                <FontAwesomeIcon icon={'fa-door-open'} className=""/>
                            </div>
                            {flats.length} {flats.length==1 ? 'Flat' : 'Flats'}
                        </div>
                    </div>
                    </Link>

                    <Link to={`/building-manager/${currentBuildingManager.id}/tenants`}>
                    <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                        <div className="">
                            <div className=" text-3xl mb-3 text-orange-600">
                                <FontAwesomeIcon icon={'fa-users'} className=""/>
                            </div>
                            {tenants.length} {tenants.length==1 ? 'Tenant' : 'Tenants'}
                        </div>
                    </div>
                    </Link>
                    <Link to={`/building-manager/${currentBuildingManager.id}/bookings`}>
                    <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl mb-3 text-orange-600">
                                <FontAwesomeIcon icon={'fa-user-check'} className=""/>
                            </div>
                            {bookings.length} {bookings.length==1 ? 'Booking' : 'Bookings'}
                        </div>
                    </div>
                    </Link>

                </div>
            </section>

        </BuildingManagerDashboardLayout> 
    )
}

export default BuildingManagerDashboard


