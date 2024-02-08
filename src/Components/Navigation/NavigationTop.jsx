import { useContext } from "react"
import { AuthContext } from "../../Context/authContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from "../Dropdown";
import adminProfileImage from '../../assets/images/settings/logo.jpg';

 export default function NavigationTop({currentPageTitle}) {
   
    const {currentUser, logout} = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/admin/login')
    };

    const navLinkClasses = 'border-b-2 h-full flex items-center gap-1 transition-all duration-300 ease-in-out cursor-pointer';


    return (
    <div className="h-16 flex items-center px-6  bg-slate-50 shadow-md w-full z-40 mb-3 sticky top-0">
       <div className="flex w-full items-center justify-between h-full">
            <div className="flex items-center gap-8 h-full">
                <Link to={'/admin/dashboard'}>
                    <div className="flex items-center gap-2">
                        <div className="uppercase text-slate-500 font-bold">{currentPageTitle ? currentPageTitle : 'Admin Dashboard'}</div>
                    </div>
                </Link>

            </div>
            
            <nav className="flex gap-4 h-full items-center ">
                <Link
                    to="/admin/dashboard"
                    className={`${navLinkClasses} ${
                        location.pathname === '/admin/dashboard'
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
                    location.pathname === `/admin/companies` || location.pathname === `/admin/company/create`
                    ? 'text-orange-500 border-b-orange-500'
                    : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                }`}
                >
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="px-6">
                                <FontAwesomeIcon icon={'fa-building'} className="text-xl"/>
                                <span className=""> BMCs</span>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link to={`/admin/companies`}>
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={'fa-list-alt'} className="text-xl"/>
                                    <span className="text-base"> List of BMCs</span>
                                </span>
                            </Dropdown.Link>
                            
                            <Dropdown.Link to={'/admin/company/create'}>
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon icon={'fa-plus-circle'} className="text-xl"/>
                                        <span className="text-base">
                                            Add BMC
                                        </span>
                                    </span>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

                </span>

                <Link
                    to="/admin/projects"
                    className={`${navLinkClasses} ${
                        location.pathname === '/admin/projects'
                        ? 'text-orange-500 border-b-orange-500'
                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                    }`}
                    >
                    <span className="px-6">
                        <FontAwesomeIcon icon={'fa-cubes'} className="text-xl"/>
                        <span> BMC Projects</span>
                    </span>
                </Link>
                <Link
                    to="/admin/buildings"
                    className={`${navLinkClasses} ${
                        location.pathname === '/admin/buildings'
                        ? 'text-orange-500 border-b-orange-500'
                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                    }`}
                    >
                    <span className="px-6">
                        <FontAwesomeIcon icon={'fa-building'} className="text-xl"/>
                        <span> Buildings</span>
                    </span>
                </Link>
    
                <Link
                    to="/admin/building-managers"
                    className={`${navLinkClasses} ${
                        location.pathname === '/admin/building-managers'
                        ? 'text-orange-500 border-b-orange-500'
                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                    }`}
                    >
                    <span className="px-6">
                        <FontAwesomeIcon icon={'fa-users'} className="text-xl"/>
                        <span> Building Managers</span>
                    </span>
                </Link>

                <Link
                    to="/admin/tenants"
                    className={`${navLinkClasses} ${
                        location.pathname === '/admin/tenants'
                        ? 'text-orange-500 border-b-orange-500'
                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                    }`}
                    >
                    <span className="px-6">
                        <FontAwesomeIcon icon={'fa-users'} className="text-xl"/>
                        <span> Residents</span>
                    </span>
                </Link>
                {/* <Link
                    to="#"
                    className={`${navLinkClasses} ${
                        location.pathname === '#'
                        ? 'text-orange-500 border-b-orange-500'
                        : 'text-slate-500 hover:text-slate-800 border-b-transparent hover:border-b-orange-500'
                    }`}
                    >
                    <span className="px-6">
                        <FontAwesomeIcon icon={'fa-cogs'} className="text-xl"/>
                        <span> CMS</span>
                    </span>
                </Link> */}

            </nav>

            
            {
                currentUser && 
                (<div className="">
                    <div className="relative">
                    <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items gap-2">
                                    <div className="w-10 h-10 bg-orange-200 rounded-full shrink-0 overflow-hidden cursor-pointer shadow">
                                        <img src={adminProfileImage} alt="" className="w-full h-full object-cover" />
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
    )
     
}
