import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminDashboardLayout from '../../../Layouts/AdminDashboardLayout'
import Spinner from "../../../Components/Spinner/Spinner";
import { Link } from 'react-router-dom';
import companyLogo from '../../../assets/images/settings/logo.jpg';
import Dropdown from '../../../Components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debounce from 'lodash/debounce'

function CompaniesIndex() {

    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const [companies, setCompanies ] = useState([]);
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


    const fetchCompanies = async () => {
        
        setIsFetching(true)
       
        try {
            const res = await axios.get('http://localhost:8800/api/companies',{
                params: {
                    search: search
                }
            })
            setCompanies(res.data);
        } catch (error) {
        } finally{
            setIsFetching(false)
        }

    }

    useEffect(()=>{
        handleDebouncedSearch()
    }, [search])

    const handleSearch = async (e) =>{
        setSearch(e.target.value);
    }

    const handleDebouncedSearch = debounce(fetchCompanies, 500)


  return (

    <AdminDashboardLayout>

        <section className="container mx-auto px-8 pb-8">
            <div className="py-4 flex justify-between">
                <span className="text-slate-500 uppercase text-xl">All BMC <span className="text-orange-600">Companies</span></span>
                <Link to={'/admin/company/create'} className={btnClasses}>Create BMC</Link>
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
                            Logo 
                        </th>
                        <th scope="col" className="px-2 py-2 text-left">
                            Company Name 
                        </th>
                        <th scope="col" className="px-2 py-2 text-left">
                            Status
                        </th>
                        <th scope="col" className="px-2 py-2 text-left">
                            Company Email 
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>


                {!isFetching && 
                (<tbody >
                {companies.map((company, index) => 
                    (
                    <tr key={company.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                        <td className="px-6 py-4 font-medium text-gray-900 w-16">{index + 1}</td>
                        <td className="px-2 py-4">
                            <div  className="h-16 w-16 rounded-full overflow-hidden shadow">
                                <img src={companyLogo} className="object-cover h-full w-full" />
                                {/* <div className="bg-slate-200 h-full w-full flex items-center justify-center">No Profile</div> */}
                            </div>
                        </td>
                        <td className="text-gray-900 font-light px-2 py-4 w-[15%]">
                            <span>{company.name}</span>
                        </td>

                        <td className="text-teal-600 font-light px-2 py-4">
                            <span >Status Unknown</span>
                        </td>
                        <td className="text-teal-600 font-light px-2 py-4">
                            {company.email}
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

                                        {/* <Dropdown.Link to={`/admin/company/${company.id}/edit`}>
                                            <span className="flex gap-1 items-center">
                                                <FontAwesomeIcon icon={'fa-edit'} className="text-blue-600"/>
                                                <span>
                                                    Edit
                                                </span>
                                            </span>
                                        </Dropdown.Link> */}
                                        
                                        <Dropdown.Link >
                                            <span className="flex gap-1 items-center">
                                                <FontAwesomeIcon icon={'fa-ban'} className="text-red-600"/>
                                                <span>
                                                    Suspend
                                                </span>
                                            </span>
                                        </Dropdown.Link>

                                        {/* <Dropdown.Link >
                                            <DeleteBuildingManagerButton 
                                                buildingManager={buildingManager}
                                                onBuildingManagerDeleted={handleDeletedBuildingManager}
                                                />
                                        </Dropdown.Link> */}
                                        
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
    </AdminDashboardLayout>
  )
}

export default CompaniesIndex


