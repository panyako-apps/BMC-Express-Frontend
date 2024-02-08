import React, { useContext, useEffect, useState } from 'react'
import CompanyDashboardLayout from '../../Layouts/CompanyDashboardLayout'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CompanyDashboard() {
  
    const {currentCompany} = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [buildingManagers, setBuildingManagers] = useState([]);
    const [commonFacilities, setCommonFacilities] = useState([]);

    const fetchProjects = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/projects', {
                params: {
                    company_id: currentCompany.id
                }
            })
            setProjects(res.data);
        } catch (error) 
        {
        } 

    }
    const fetchBuildings = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/buildings', {
                params: {
                    company_id: currentCompany.id
                }
            })
            setBuildings(res.data);
        } catch (error) 
        {
        } 

    }

    const fetchBuildingManagers = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/building-managers', {
                params: {
                    company_id: currentCompany.id
                }
            })
            setBuildingManagers(res.data);
        } catch (error) {
        } 

    }

    const fetchCommonFacilities = async () => {
               
        try {
            const res = await axios.get('http://localhost:8800/api/common-facilities', {
                params: {
                    company_id: currentCompany.id
                }
            })
            setCommonFacilities(res.data);
        } catch (error) {
        } 

    }


    useEffect(()=>{
        fetchProjects();
        fetchBuildings();
        fetchBuildingManagers();
        fetchCommonFacilities();
    }, [])





    return (
        <CompanyDashboardLayout>


            <section className="container mx-auto  px-8">
                <div className="py-8">
                    <span className="text-slate-500 uppercase text-xl"><span className="text-orange-600">Dashboard</span></span>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <Link to={`/company/${currentCompany.id}/projects`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-cubes'} className=""/>
                                </div>
                                {projects.length} {projects.length==1 ? 'Project' : 'Projects'}
                            </div>
                        </div>
                    </Link>
                    <Link to={`/company/${currentCompany.id}/buildings`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-cubes'} className=""/>
                                </div>
                                {buildings.length} {buildings.length==1 ? 'Building' : 'Buildings'}
                            </div>
                        </div>
                    </Link>
                    <Link to={`/company/${currentCompany.id}/building-managers`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-users'} className=""/>
                                </div>
                                {buildingManagers.length} {buildingManagers.length==1 ? 'Manager' : 'Managers'}
                            </div>
                        </div>
                    </Link>
                    <Link to={`/company/${currentCompany.id}/common-facilities`}>
                        <div className="rounded-xl p-6 min-h-[10rem] bg-slate-200 hover:bg-orange-200 transition-all duration-300 ease-in-out flex items-center justify-center">
                            <div className="text-center">
                                <div className=" text-3xl mb-3 text-orange-600">
                                    <FontAwesomeIcon icon={'fa-wifi'} className=""/>
                                </div>
                                {commonFacilities.length} {commonFacilities.length==1 ? 'Common Facility' : 'Common Facilities'}
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

        </CompanyDashboardLayout> 
    )
}

export default CompanyDashboard

