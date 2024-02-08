import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Components/Dropdown";
import managerProfileImage from '../assets/images/settings/logo.jpg';

const navLinkClasses = 'border-b-2 h-full flex items-center gap-1 transition-all duration-300 ease-in-out cursor-pointer';

export default function BuildingManagerDashboardLayout({user, header, children}) {

    const {currentBuildingManager, buildingManagerLogout} = useContext(AuthContext)

    const location = useLocation();

    const navigate = useNavigate();
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await buildingManagerLogout();
        navigate('/building-manager/login')
    };


    
    return(
            <div>
                <div className="min-h-screen bg-gray-100 ">
                
                    <div className="h-16 flex items-center px-6  bg-slate-50 shadow-md w-full z-40 mb-3 sticky top-0">
                        <div className="flex w-full items-center justify-between h-full">
                            <div className="flex items-center gap-8 h-full">
                                <Link to={'/building-manager/dashboard'}>
                                    <div className="flex items-center gap-2">
                                        <div className="uppercase text-slate-500 font-bold">{currentBuildingManager.first_name} {currentBuildingManager.other_names}</div>
                                    </div>
                                </Link>
                                <nav className="flex gap-4 h-full items-center ">
                       
                                    <Link
                                        to="/building-manager/dashboard"
                                        className={`${navLinkClasses} ${
                                            location.pathname === '/building-manager/dashboard'
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
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/flats` || location.pathname === `/building-manager/flat/create`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                    >
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="px-6">
                                                    <FontAwesomeIcon icon={'fa-door-open'} className="text-xl"/>
                                                    <span className=""> Manage Flats</span>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link to={`/building-manager/${currentBuildingManager.id}/flats`}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                        <span className="text-base"> List of Flats</span>
                                                    </span>
                                                </Dropdown.Link>
                                                
                                                <Dropdown.Link to={'/building-manager/flat/create'}>
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={'fa-plus-circle'} className="text-xl"/>
                                                            <span className="text-base">
                                                                Add Flat
                                                            </span>
                                                        </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>

                                    </span>


                                    <span 
                                        className={`${navLinkClasses} ${
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/tenants` || location.pathname === `/building-manager/tenant/create`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                    >
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="px-6">
                                                    <FontAwesomeIcon icon={'fa-users'} className="text-xl"/>
                                                    <span className=""> Manage Residents</span>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link to={`/building-manager/${currentBuildingManager.id}/tenants`}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                        <span className="text-base"> List of Residents</span>
                                                    </span>
                                                </Dropdown.Link>
                                                
                                                <Dropdown.Link to={'/building-manager/tenant/create'}>
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={'fa-plus-circle'} className="text-xl"/>
                                                            <span className="text-base">
                                                                Add a Resident
                                                            </span>
                                                        </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>

                                    </span>
                                    
                                    {/* <span 
                                        className={`${navLinkClasses} ${
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/bookings` || location.pathname === `/building-manager/booking/create`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                    >
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="px-6">
                                                    <FontAwesomeIcon icon={'fa-user-check'} className="text-xl"/>
                                                    <span className=""> Manage Bookings</span>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link to={`/building-manager/${currentBuildingManager.id}/bookings`}>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                                        <span className="text-base"> List of Bookings</span>
                                                    </span>
                                                </Dropdown.Link>
                                                
                                                <Dropdown.Link to={'/building-manager/booking/create'}>
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={'fa-plus-circle'} className="text-xl"/>
                                                            <span className="text-base">
                                                                Book for a Resident
                                                            </span>
                                                        </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>

                                    </span> */}

                                    <Link
                                        to={`/building-manager/${currentBuildingManager.id}/bills`}
                                        className={`${navLinkClasses} ${
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/bills`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                        >
                                        <span className="px-6">
                                            <FontAwesomeIcon icon={'fa-tachometer-alt'} className="text-xl"/>
                                            <span> Manage Bills</span>
                                        </span>
                                    </Link>
                                    <Link
                                        to={`/building-manager/${currentBuildingManager.id}/bookings`}
                                        className={`${navLinkClasses} ${
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/bookings`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                        >
                                        <span className="px-6">
                                            <FontAwesomeIcon icon={'fa-tachometer-alt'} className="text-xl"/>
                                            <span> Manage Bookings</span>
                                        </span>
                                    </Link>
                                    <Link
                                        to={`/building-manager/${currentBuildingManager.id}/issues`}
                                        className={`${navLinkClasses} ${
                                            location.pathname === `/building-manager/${currentBuildingManager.id}/issues`
                                            ? 'text-orange-500 border-b-orange-500'
                                            : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                                        }`}
                                        >
                                        <span className="px-6">
                                            <FontAwesomeIcon icon={'fa-tachometer-alt'} className="text-xl"/>
                                            <span> Issues</span>
                                        </span>
                                    </Link>


                                </nav>
                            </div>
                            
                            {
                                currentBuildingManager && 
                                (<div className="">
                                    <div className="relative">
                                    <Dropdown>
                                            <Dropdown.Trigger>
                                                <div className="flex items gap-2">
                                                    <div className="w-10 h-10 bg-orange-200 rounded-full shrink-0 overflow-hidden cursor-pointer shadow">
                                                        <img src={managerProfileImage} alt="" className="w-full h-full object-cover" />
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
            </div>
    )
}

