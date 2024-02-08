import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Components/Dropdown";
import tenantProfileImage from '../assets/images/settings/logo.jpg';

const navLinkClasses = 'border-b-2 h-full flex items-center gap-1 transition-all duration-300 ease-in-out cursor-pointer';

export default function TenantDashboardLayout({user, header, children}) {

    const {currentTenant, tenantLogout} = useContext(AuthContext)

    const location = useLocation();

    const navigate = useNavigate();
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await tenantLogout();
        navigate('/tenant/login')
    };


    
    return(
        <div className="min-h-screen  bg-gray-100">
        
            <div className="h-16 flex items-center px-6  bg-slate-50 shadow-md w-full z-40 mb-3 sticky top-0">
                <div className="flex w-full items-center justify-between h-full">
                    <div className="flex items-center gap-8 h-full">
                        <Link to={'/tenant/dashboard'}>
                            <div className="flex items-center gap-2">
                                <div className="uppercase text-slate-500 font-bold">{currentTenant.first_name} {currentTenant.other_names}</div>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex gap-4 h-full items-center ">
            
                        <Link
                            to="/tenant/dashboard"
                            className={`${navLinkClasses} ${
                                location.pathname === '/tenant/dashboard'
                                ? 'text-orange-500 border-b-orange-500'
                                : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                            }`}
                            >
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-tachometer-alt'} className="text-xl"/>
                                <span> Dashboard</span>
                            </span>
                        </Link>
                        <Link
                            to={`/tenant/${currentTenant.id}/bookings`}
                            className={`${navLinkClasses} ${
                                location.pathname === `/tenant/${currentTenant.id}/bookings`
                                ? 'text-orange-500 border-b-orange-500'
                                : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                            }`}
                            >
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-door-open'} className="text-xl"/>
                                <span> Book Facilities</span>
                            </span>
                        </Link>
            
                        <Link
                            to={`/tenant/${currentTenant.id}/bills`}
                            className={`${navLinkClasses} ${
                                location.pathname === `/tenant/${currentTenant.id}/bills`
                                ? 'text-orange-500 border-b-orange-500'
                                : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                            }`}
                            >
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-file-invoice-dollar'} className="text-xl"/>
                                <span>View Bills</span>
                            </span>
                        </Link>
                        {/* <Link
                            to={`/tenant/${currentTenant.id}/bills`}
                            className={`${navLinkClasses} ${
                                location.pathname === `/tenant/${currentTenant.id}/bills`
                                ? 'text-orange-500 border-b-orange-500'
                                : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                            }`}
                            >
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-file-invoice-dollar'} className="text-xl"/>
                                <span>Update Payment Status</span>
                            </span>
                        </Link> */}

                        <Link
                            to={`/tenant/${currentTenant.id}/issues`}
                            className={`${navLinkClasses} ${
                                location.pathname === `/tenant/${currentTenant.id}/issues`
                                ? 'text-orange-500 border-b-orange-500'
                                : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                            }`}
                            >
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-exclamation-triangle'} className="text-xl"/>
                                <span> View Fault Issues</span>
                            </span>
                        </Link>


                    </nav>
                    
                    {
                        currentTenant && 
                        (<div className="">
                            <div className="relative">
                            <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="flex items gap-2">
                                            <div className="w-10 h-10 bg-orange-200 rounded-full shrink-0 overflow-hidden cursor-pointer shadow">
                                                <img src={tenantProfileImage} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {/* <Dropdown.Link to={`#`}>
                                            <FontAwesomeIcon icon={'fa-user'} className=""/>
                                            <span className="pl-1">Profile</span>
                                        </Dropdown.Link>
                                         */}
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
    )
}

