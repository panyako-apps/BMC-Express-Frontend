import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminDashboardLayout from '../../Layouts/AdminDashboardLayout'
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminDashboard({}) {

    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [buildingManagers, setBuildingManagers] = useState([]);
    const [tenants, setTenants] = useState([]);
    // const [error, setError] = useState('');
    // const [isFetching, setIsFetching] = useState(false);
    const {currentUser} = useContext(AuthContext);


    const fetchCompanies = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/companies')
            setCompanies(res.data);
        } catch (error) {
            // setError(error.response.data)
        } 

    }
    const fetchProjects = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/projects')
            setProjects(res.data);
        } catch (error) {
            // setError(error.response.data)
        } 

    }
    const fetchBuildings = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/buildings')
            setBuildings(res.data);
        } catch (error) {
            // setError(error.response.data)
        } 

    }

    const fetchBuildingManagers = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/building-managers')
            setBuildingManagers(res.data);
        } catch (error) {
            // setError(error.response.data)
        } 

    }

    const fetchTenants = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/tenants')
            setTenants(res.data);
        } catch (error) {
            // setError(error.response.data)
        } 

    }

    useEffect(()=>{
        fetchCompanies();
        fetchProjects();
        fetchBuildings();
        fetchBuildingManagers();
        fetchTenants();
    }, [])


    return (

        <AdminDashboardLayout>
            <>

            <section className="container mx-auto  px-8">
            
                <div className="py-6">
                    <h1 className="text-slate-500 uppercase text-xl">Admin <span className="text-orange-600">Dashboard</span></h1>
                    <hr className='border-b-2 border-b-orange-600 my-3 w-24'/>
                    {currentUser && <span>Welcome:  <span className='font-bold'>{currentUser.first_name}</span></span>}
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <Link to={'/admin/companies'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-building-columns'} className=""/>
                                </div>
                                {companies.length} {companies.length==1 ? 'BMC' : 'BMCs'}
                            </div>
                        </div>
                    </Link>
                    <Link to={'/admin/projects'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-cubes'} className=""/>
                                </div>
                                {projects.length} {projects.length==1 ? 'Project' : 'Projects'}
                            </div>
                        </div>
                    </Link>
                    <Link to={'/admin/buildings'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-building'} className=""/>
                                </div>
                                {buildings.length} {buildings.length==1 ? 'Building' : 'Buildings'}
                            </div>
                        </div>
                    </Link>
                    <Link to={'/admin/building-managers'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-users'} className=""/>
                                </div>
                                {buildingManagers.length} {buildingManagers.length==1 ? 'Building Manager' : 'Building Managers'}
                            </div>
                        </div>
                    </Link>
                    <Link to={'/admin/tenants'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-user-check'} className=""/>
                                </div>
                                {tenants.length} {tenants.length==1 ? 'Tenant' : 'Tenants'}
                            </div>
                        </div>
                    </Link>
                    <Link to={'/'} >
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">Placeholder</div>
                    </Link>
                </div>
            </section>
            </>

        </AdminDashboardLayout>
    )
}

export default AdminDashboard
