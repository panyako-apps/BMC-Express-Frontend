import React, { useContext, useEffect, useState } from 'react'
import BuildingManagerDashboardLayout from '../../../Layouts/BuildingManagerDashboardLayout'
import { AuthContext } from '../../../Context/authContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dropdown from '../../../Components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debounce from 'lodash/debounce'


function BuildingManagerBillsIndex() {
    
    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const {currentBuildingManager} = useContext(AuthContext);
    const [bills, setBills ] = useState([]);
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


    const fetchBills = async () => {
        try {
            const res = await axios.get('http://localhost:8800/api/bills', {
                params: {
                    building_manager_id: currentBuildingManager.id,
                    search: search
                }
            })
            setBills(res.data);
            // console.log(res.data)
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

    const handleDebouncedSearch = debounce(fetchBills, 500)
    

    const formatPrice = (price)=>{
        return price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            });
    }


    return (
        <BuildingManagerDashboardLayout>
            <section className="container mx-auto px-8 pb-8">
                <div className="py-4 flex justify-between">
                    <span className="text-slate-500 uppercase text-xl"><span className="text-orange-600">bills</span></span>
                    <Link to={'/building-manager/bill/create'} className={btnClasses}>Add Bill</Link>
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
                                Tenant's Name  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Flat Name  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Flat No  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Status  
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Amount Owed  
                            </th>
                            <th scope="col" className="px-2 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>


                    {!isFetching && 
                    (<tbody >
                    {bills.map((bill, index) => 
                        (
                        <tr key={bill.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                
                            <td className="px-6 py-4 font-medium text-gray-900 w-16">{index + 1}</td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{bill.tenant.first_name} {bill.tenant.other_names}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{bill.flat.name}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{bill.flat.flat_no}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{bill.status}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{formatPrice(bill.amount)}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <div className="flex justify-center">

                                <Dropdown>
                                    <Dropdown.Trigger>

                                        <span className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300 flex items-center justify-center">
                                                <FontAwesomeIcon icon={'fa-ellipsis'}/>
                                        </span>
                                    </Dropdown.Trigger>

                                    {/* <Dropdown.Content>
                                    </Dropdown.Content> */}
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
        </BuildingManagerDashboardLayout>
    )
}

export default BuildingManagerBillsIndex




