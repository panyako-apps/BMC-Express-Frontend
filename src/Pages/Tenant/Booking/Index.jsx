import React, { useContext, useEffect, useState } from 'react'
import TenantDashboardLayout from '../../../Layouts/TenantDashboardLayout'
import { AuthContext } from '../../../Context/authContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dropdown from '../../../Components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteIssueButton from './Delete';
import debounce from 'lodash/debounce'
import moment from 'moment'

function TenantIssuesIndex() {
    
    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const {currentTenant} = useContext(AuthContext);
    const [bookings, setBookings ] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');

    const perpageValues = [
        '5',
        '10',
        '15',
        '20',
        '25',
        '30',
        '50',
        '100',
    ];


    const fetchIssues = async () => {
        try {
            const res = await axios.get('http://localhost:8800/api/bookings', {
                params: {
                    tenant_id: currentTenant.id,
                    search: search
                }
            })
            setBookings(res.data);
        } catch (error) 
        {
        } 

    }

    useEffect(()=>{
        handleDebouncedSearch()
    }, [search])

    const handleDeletedIssue = () =>{
        handleDebouncedSearch();
    }

    const handleSearch = async (e) =>{
        setSearch(e.target.value);
    }

    const handleDebouncedSearch = debounce(fetchIssues, 500)
    

    return (
        <TenantDashboardLayout>
            <section className="container mx-auto px-8 pb-8">
                <div className="py-4 flex justify-between">
                    <span className="text-slate-500 uppercase text-xl"><span className="text-orange-600">Bookings</span></span>
                    <Link to={'/tenant/booking/create'} className={btnClasses}>Book A House</Link>
                </div>
                <div className="md:flex justify-between gap-2 mb-6 border border-slate-500 border-dashed rounded-md p-4">
                    
                    <div className="grid grid-cols-2 gap-2 items-end mb-3 md:mb-0 md:w-1/2">
                        <div className="flex items-center gap-1">
                            <label htmlFor="perPage" className="block text-sm font-bold text-slate-700">Show</label>
                            <select name="perPage" id="perPage" className="block rounded-md border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 bg-slate-200"
                                value={perPage}
                                onChange={(e) => setPerPage(e.target.value)}
                                >
                                {perpageValues.map((value, index)=>(
                                    <option key={index} >{ value }</option>
                                ))}

                            </select>
                            <div className="">
                                <span className="text-slate-700">Entries</span>
                            </div>
                        </div> 

                    </div>

                    <div className="flex items-center gap-1">
                        <label htmlFor="search" className="block text-sm font-bold text-slate-700">Search</label>
                        <input 
                            type="search" 
                            name="search" 
                            value={search}
                            onChange={(e)=> handleSearch(e)}
                            onInput={handleDebouncedSearch}
                            className="block w-96 rounded-md border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-2" 
                            placeholder="Live Search..." 
                            />
                    </div>
                </div>

                <table className="min-w-full text-sm">
                    <thead className="bg-gray-200 text-gray-500">
                        <tr>
                            <th scope="col" className="px-2 py-2 text-left">
                                #
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                House No  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Booking Date  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Time Slot  
                            </th>
                            <th scope="col" className="px-2 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>


                    {!isFetching && 
                    (<tbody >
                    {bookings.map((booking, index) => 
                        (
                        <tr key={booking.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                
                            <td className="px-6 py-4 font-medium text-gray-900 w-16">{index + 1}</td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{booking.house_no}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{moment(booking.date).format('MMMM Do, YYYY')}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{booking.time}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <div className="flex justify-center">

                                <Dropdown>
                                    <Dropdown.Trigger>

                                        <span className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300 flex items-center justify-center">
                                                <FontAwesomeIcon icon={'fa-ellipsis'}/>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link to={`/tenant/booking/${booking.id}/edit`}>
                                            <span className="flex gap-1 items-center">
                                                <FontAwesomeIcon icon={'fa-edit'} className="text-blue-600"/>
                                                <span>
                                                    Edit
                                                </span>
                                            </span>
                                        </Dropdown.Link>
                                        <Dropdown.Link >
                                            <DeleteIssueButton 
                                                booking={booking}
                                                onIssueDeleted={handleDeletedIssue}
                                                />
                                        </Dropdown.Link>
                                        
                                    </Dropdown.Content>
                                </Dropdown>
                                </div>
                            </td> 

                        </tr>
                        )
                    )}</tbody>)}

                </table>

                {isFetching &&
                    (<div className="h-96 flex items-center justify-center">
                        <Spinner />
                    </div>) }
                
                {/* <div className="mt-4">
                    <Pagination v-if="!isFetching && props.companies.meta.last_page>1" :links="props.companies.meta.links" :classNamees="'mb-8'"/>
                </div> */}

                
            </section>
        </TenantDashboardLayout>
    )
}

export default TenantIssuesIndex




