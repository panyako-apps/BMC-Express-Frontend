
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminDashboardLayout from '../../../Layouts/AdminDashboardLayout'
import Spinner from "../../../Components/Spinner/Spinner";
import debounce from 'lodash/debounce'

function BuildingManagersIndex() {

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
        
        setIsFetching(true)
       
        try {
            const res = await axios.get('http://localhost:8800/api/building-managers',{
                params: {
                    search: search
                }
            })
            setBuildingManagers(res.data);
            
        } catch (error) {
            // setError(error.response.data)
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

    const handleDebouncedSearch = debounce(fetchBuildingManagers, 500)


    const computeDescription = ((description)=>{
        if(description.length >300){
            return description.slice(0,300)+'...'
        }
        return description;
    })
    

  return (
    <AdminDashboardLayout>

        <div className="p-8 mb-">
            <span className="text-slate-500 uppercase text-xl">All BMC <span className="text-orange-600">Building Managers</span></span>
        </div>

        
        <section className="container mx-auto px-8 pb-8">

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
                        <th scope="col" className="px-2 py-2 text-center">
                            Status
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            Email. 
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
               
                <tbody >

                {buildingManagers.map((buildingManager, index) => 
                    (
                    <tr key={buildingManager.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900 w-16">{index + 1}</td>
                                            
                        <td className="text-gray-900 font-light px-2 py-4 w-36">
                            <div  className="h-16 w-16 rounded-full overflow-hidden ">
                                {/* <img v-if="buildingManager.profile.profileimage" :src="buildingManager.profile.profileimage" className="object-cover h-full w-full" > */}
                                <div className="bg-slate-200 h-full w-full flex items-center justify-center">No Profile</div>
                            </div>
                        </td>
                        <td className="text-gray-900 font-light px-2 py-4">
                            <span>{buildingManager.first_name} {buildingManager.other_names}</span>
                        </td>
                        <td className="text-teal-600 font-light px-2 py-4">
                            <span >Status Unknown</span>
                        </td>
                        <td className="text-teal-600 font-light px-2 py-4">
                            {buildingManager.email}
                        </td>
                        <td className="text-teal-600 font-light px-2 py-4 text-center">
                            Actions
                        </td>

                    </tr>
                    )
                )}</tbody>

            </table>

            {  isFetching &&
                (<div className="h-96 flex items-center justify-center">
                    <Spinner />
                </div>) 
            }
        </section>
    </AdminDashboardLayout>
  )}

export default BuildingManagersIndex

