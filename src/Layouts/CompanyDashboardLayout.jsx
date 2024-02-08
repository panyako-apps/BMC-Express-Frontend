
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropdown from "../Components/Dropdown";
import companyLogo from '../assets/images/settings/logo.jpg';

const navLinkClasses = 'border-b-2 h-full flex items-center gap-1 transition-all duration-300 ease-in-out cursor-pointer';

export default function CompanyDashboardLayout({user, header, children}) {

    const {currentCompany, companyLogout} = useContext(AuthContext);
    const location = useLocation();

    const navigate = useNavigate();
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await companyLogout();
        navigate('/company/login')
    };




    return (
       <div>
            <div className="min-h-screen bg-gray-100 ">
            
                <div className="h-16 flex items-center px-6  bg-slate-50 shadow-md w-full z-40 mb-3 sticky top-0 ">
                    <div className="flex w-full items-center justify-between h-full">
                        <div className="flex items-center gap-8 h-full">
                            <Link to={'/company/dashboard'}>
                                <div className="flex items-center gap-2 ">
                                    <div className="uppercase text-slate-500 font-bold">{currentCompany.name}</div>
                                </div>
                            </Link>
                            <nav className="flex gap-4 h-full items-center ">
                            
                                <Link
                                    to="/company/dashboard"
                                    className={`${navLinkClasses} ${
                                        location.pathname === '/company/dashboard'
                                        ? 'text-orange-500 border-b-orange-500'
                                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                    }`}
                                    >
                                    <span className="px-6">
                                        <FontAwesomeIcon icon={'fa-tachometer-alt'} className="text-xl"/>
                                        <span> Dashboard</span>
                                    </span>
                                </Link>

                                <span 
                                 className={`${navLinkClasses} ${
                                    location.pathname === `/company/${currentCompany.id}/projects` || location.pathname === `/company/project/create`
                                    ? 'text-orange-500 border-b-orange-500'
                                    : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="px-6">
                                                <FontAwesomeIcon icon={'fa-cubes'} className="text-xl"/>
                                                <span className=""> Projects</span>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link to={`/company/${currentCompany.id}/projects`}>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                    <span className="text-base"> List of Projects</span>
                                                </span>
                                            </Dropdown.Link>
                                            
                                            <Dropdown.Link to={'/company/project/create'}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-plus-circle'} className="text-xl"/>
                                                        <span className="text-base">
                                                            Add Project
                                                        </span>
                                                    </span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>

                                </span>
                                <span 
                                 className={`${navLinkClasses} ${
                                    location.pathname === `/company/${currentCompany.id}/buildings` 
                                    || location.pathname === `/company/building/create`
                                    ? 'text-orange-500 border-b-orange-500'
                                    : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="px-6">
                                                <FontAwesomeIcon icon={'fa-building'} className="text-xl"/>
                                                <span className="h-16"> Buildings</span>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link to={`/company/${currentCompany.id}/buildings`}>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                    <span className="text-base">
                                                        Buildings List
                                                    </span>
                                                </span>
                                            </Dropdown.Link>
                                            
                                            <Dropdown.Link to={'/company/building/create'}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-circle-plus'} className="text-xl"/>
                                                        <span className="text-base"> Add Building</span>
                                                    </span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>

                                </span>


                                <span 
                                 className={`${navLinkClasses} ${
                                    location.pathname === `/company/${currentCompany.id}/building-managers` || location.pathname === `/company/building-manager/create`
                                    ? 'text-orange-500 border-b-orange-500'
                                    : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="px-6">
                                                <FontAwesomeIcon icon={'fa-users'} className="text-xl"/>
                                                <span className=""> Building Managers</span>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link to={`/company/${currentCompany.id}/building-managers`}>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                    <span className="text-base">
                                                        Building Managers List
                                                    </span>
                                                </span>
                                            </Dropdown.Link>
                                            
                                            <Dropdown.Link to={'/company/building-manager/create'}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-circle-plus'} className="text-xl"/>
                                                        <span className="text-base">
                                                            Add Building Manager
                                                        </span>
                                                    </span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>

                                </span>


                                <span 
                                 className={`${navLinkClasses} ${
                                    location.pathname === `/company/${currentCompany.id}/common-facilities` || location.pathname === `/company/common-facility/create`
                                    ? 'text-orange-500 border-b-orange-500'
                                    : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="px-6">
                                                <FontAwesomeIcon icon={'fa-wifi'} className="text-xl"/>
                                                <span className=""> Common Facilities</span>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link to={`/company/${currentCompany.id}/common-facilities`}>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                    <span className="text-base">
                                                        Common Facilities List
                                                    </span>
                                                </span>
                                            </Dropdown.Link>
                                            
                                            <Dropdown.Link to={'/company/common-facility/create'}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-circle-plus'} className="text-xl"/>
                                                        <span className="text-base">
                                                            Add Common Facility
                                                        </span>
                                                    </span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>

                                </span>

                            </nav>
                        </div>
                        {
                            currentCompany && 
                            (<div className="">
                                <div className="relative">
                                <Dropdown>
                                        <Dropdown.Trigger>
                                            <div className="flex items gap-2">
                                                <div v-if="$page.props.auth.profile.data" className="w-10 h-10 bg-orange-200 rounded-full shrink-0 overflow-hidden cursor-pointer">
                                                    <img src={companyLogo} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {/* <Dropdown.Link to={`#`}>
                                                <FontAwesomeIcon icon={'fa-user'} className=""/>
                                                <span className="pl-1">Profile</span>
                                            </Dropdown.Link> */}
                                            
                                            <Dropdown.Link to={''}>
                                            <button onClick={handleLogout}>
                                                <FontAwesomeIcon icon={'fa-sign-out-alt'} className="mr-1"/>
                                                Logout
                                            </button>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>)
                        }
                    </div>

                </div>

                    {/* <!-- Page Heading --> */}
                    { header && 
                        (<header >
                            <div className="container mx-auto">
                                <slot name="header" />
                            </div>
                        </header>)
                    }


                    {/* <!-- Page Content --> */}
                    <main>
                        {children}
                    </main>

                    {/* <div className="absolute bottom-0 w-full h-36">
                        <div className="container mx-auto flex justify-center items-baseline gap-1">
                            <div className="bg-orange-200 h-4 w-[40%] grow"></div>
                            <div className="bg-orange-600 h-12 w-12"></div>
                            <div className="bg-orange-600 h-24 w-16 rounded-t-full relative items-center p-1"></div>
                            <div className="bg-orange-600 h-36 w-1 rounded-t"></div>
                            <div className="bg-orange-600 h-32 w-12 rounded-t"></div>
                            <div className="bg-orange-600 h-8 w-16"></div>
                            <div className="bg-orange-200 h-4 w-[40%] grow"></div>
                        </div>
                    </div> */}
            </div>
        </div>) 
    }