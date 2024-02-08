import React, { useContext, useEffect, useState } from 'react'
import TenantDashboardLayout from '../../Layouts/TenantDashboardLayout'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../axios';

export default function TenantDashboard() {
  
    const {currentTenant} = useContext(AuthContext);

    const [flats, setFlats] = useState([]);
    const [bills, setBills] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [issues, setIssues] = useState([]);



    const fetchFlats = async () => {
               
        try {
            const res = await axios.get('/flats', {
                params: {
                    tenant_id: currentTenant.id
                }
            })
            setFlats(res.data);
        } catch (error) 
        {
        } 

    }
    const fetchIssues = async () => {
               
        try {
            const res = await axios.get('/issues', {
                params: {
                    tenant_id: currentTenant.id
                }
            })
            setIssues(res.data);
        } catch (error) 
        {
        } 

    }
    const fetchBookings = async () => {
               
        try {
            const res = await axios.get('/bookings', {
                params: {
                    tenant_id: currentTenant.id
                }
            })
            setBookings(res.data);
        } catch (error) 
        {
        } 

    }


    useEffect(()=>{
        fetchFlats();
        fetchIssues();
        fetchBookings();
    }, [])



    return (
        <TenantDashboardLayout>

            <section className="container mx-auto  px-8">
                
                <div className="py-8">
                    <span className="text-slate-500 uppercase text-xl">Welcome : <span className="text-orange-600">{currentTenant.first_name}, {currentTenant.other_names}</span></span>
                </div>

                <div className="grid grid-cols-4 gap-4">


                    <Link to={`/tenant/${currentTenant.id}/bills`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-file-invoice-dollar'} className=""/>
                                </div>
                                {bills.length} {bills.length==1 ? 'Bill' : 'Bills'}
                            </div>
                        </div>
                    </Link>

                    <Link to={`/tenant/${currentTenant.id}/bookings`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-calendar-check'} className=""/>
                                </div>
                                {bookings.length} {bookings.length==1 ? 'Booking' : 'Bookings'}
                            </div>
                        </div>
                    </Link>

                    <Link to={`/tenant/${currentTenant.id}/issues`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-exclamation-triangle'} className=""/>
                                </div>
                                {issues.length} {issues.length==1 ? 'Fault' : 'Issues'}
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

        </TenantDashboardLayout> 
    )
}



