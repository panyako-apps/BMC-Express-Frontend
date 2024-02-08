
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminDashboardLayout from '../../../Layouts/AdminDashboardLayout'
import Spinner from "../../../Components/Spinner/Spinner";
import debounce from 'lodash/debounce'

function ProjectsIndex() {

    const [projects, setProjects ] = useState([]);
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


    const fetchProjects = async () => {
        
        setIsFetching(true)
       
        try {
            const res = await axios.get('http://localhost:8800/api/projects',{
                params: {
                    search: search
                }
            })
            setProjects(res.data);
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

    const handleDebouncedSearch = debounce(fetchProjects, 500)


  return (
    <AdminDashboardLayout>


        
        <section className="container mx-auto px-8 pb-8">

            <div className="p-4">
                <span className="text-slate-500 uppercase text-xl">All BMC <span className="text-orange-600">Projects</span></span>
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
                            Project Name 
                        </th>
                        <th scope="col" className="px-2 py-2 text-left">
                            Description 
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
               
                {!isFetching &&
                (<tbody >
                {projects.map((project, index) => 
                    (
                    <tr key={project.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                        <td className="text-gray-900 font-light px-2 py-4 w-[15%]">
                            <span>{project.name}</span>
                        </td>
                        <td className="text-teal-600 font-light px-2 py-4">
                            {project.description}
                        </td>

                        <td className="text-gray-900 font-light px-2 py-4">
                            <div className="flex justify-center">
                                {/* <Dropdown align="right" width="36">
                                    <template #trigger>
                                        <button type="button" className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300 flex items-center justify-center">
                                            <font-awesome-icon icon="fa-ellipsis-h"></font-awesome-icon>
                                        </button>
                                    </template>

                                    <template #content>
                                        <DropdownLink >
                                            <span className="flex gap-1 items-center">
                                                <font-awesome-icon icon="fa-ban"></font-awesome-icon>
                                                <span>
                                                    Suspend
                                                </span>
                                            </span>
                                        </DropdownLink>
                                    

                                    </template>
                                </Dropdown> */}

                            </div>
                        </td> 

                    </tr>
                    )
                )}</tbody>)}
            </table>
            {  isFetching &&
                (<div className="h-96 flex items-center justify-center">
                    <Spinner />
                </div>) 
            }
                
      
        </section>
    </AdminDashboardLayout>
  )}

export default ProjectsIndex
