import React, { useContext, useEffect, useState } from 'react'
import CompanyDashboardLayout from '../../../Layouts/CompanyDashboardLayout'
import { AuthContext } from '../../../Context/authContext';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Dropdown from '../../../Components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteBuildingManagerButton from './Delete';
import profileImage from '../../../assets/images/settings/logo.jpg';
import debounce from 'lodash/debounce'

const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

function CompanyBuildingManagersIndex() {

    const {currentCompany} = useContext(AuthContext);
    const [buildingManagers, setBuildingManagers ] = useState([]);
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


    const fetchBuildingManagers = async () => {
               
        try {
            const res = await axios.get('/building-managers', {
                params: {
                    company_id: currentCompany.id, 
                    search: search
                }
            })
            setBuildingManagers(res.data);
        } catch (error) 
        {
        } 

    }

    useEffect(()=>{
        handleDebouncedSearch()
    }, [search])

    
    const handleDeletedBuildingManager = () =>{
        handleDebouncedSearch();
    }

    const handleSearch = async (e) =>{
        setSearch(e.target.value);
    }

    const handleDebouncedSearch = debounce(fetchBuildingManagers, 500)


    return (
        <CompanyDashboardLayout>
            <section className="container mx-auto px-8 pb-8">
                <div className="py-4 flex justify-between">
                    <span className="text-slate-500 uppercase text-xl">{currentCompany.name} - <span className="text-orange-600">Building Managers</span></span>
                    <Link to={'/company/building-manager/create'} className={btnClasses}>Add a Building Manager</Link>
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
                                Profile Image
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Manager's Name
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Assigned to
                            </th>
                            <th scope="col" className="px-2 py-2 text-left">
                                Email Address
                            </th>
                            <th scope="col" className="px-2 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>


                    {!isFetching && 
                    (<tbody >
                    {buildingManagers.map((buildingManager, index) => 
                        (
                        <tr key={buildingManager.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                
                            <td className="px-6 py-4 font-medium text-gray-900 w-16">{index + 1}</td>
                            <td className="text-gray-900 font-light px-2 py-4 w-24">
                                <div  className="h-12 w-12 rounded-full overflow-hidden shadow-md">
                                    <img src={profileImage} className="object-cover h-full w-full" />
                                </div>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4 w-[20%]">
                                <span>{buildingManager.first_name} {buildingManager.other_names}</span>
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4 w-[20%]">
                                    
                                {buildingManager.buildings.length  && buildingManager.buildings.map((building, index)=>(
                                    <div key={building.id+index} className='bg-slate-100 rounded mb-1 px-2 py-1 flex items-center gap-2'>
                                       <div className='w-2 h-2 rounded-md bg-orange-600'></div> {building.name}
                                    </div>
                                ))}
                            </td>
                            <td className="text-gray-900 font-light px-2 py-4">
                                <span>{buildingManager.email}</span>
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

                                        <Dropdown.Link to={`/company/building-manager/${buildingManager.id}/edit`}>
                                            <span className="flex gap-1 items-center">
                                                <FontAwesomeIcon icon={'fa-edit'} className="text-blue-600"/>
                                                <span>
                                                    Edit
                                                </span>
                                            </span>
                                        </Dropdown.Link>
                                        
                                        {/* <Dropdown.Link >
                                            <span className="flex gap-1 items-center">
                                                <FontAwesomeIcon icon={'fa-ban'} className="text-red-600"/>
                                                <span>
                                                    Suspend
                                                </span>
                                            </span>
                                        </Dropdown.Link> */}

                                        <Dropdown.Link >
                                            <DeleteBuildingManagerButton 
                                                buildingManager={buildingManager}
                                                onBuildingManagerDeleted={handleDeletedBuildingManager}
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
        </CompanyDashboardLayout>
    )
}

export default CompanyBuildingManagersIndex

