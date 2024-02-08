import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from '../../../axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import CompanyDashboardLayout from '../../../Layouts/CompanyDashboardLayout';


const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';



export default function CompanyBuildingEdit() {
    
    const {currentCompany} = useContext(AuthContext);
    const [building, setBuilding] = useState();
    const [projects, setProjects] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    
    const [inputs, setInputs] = useState({
        project_id: "",
        name: "",
        description: "",
    });


    const navigate = useNavigate();
    const location = useLocation();
    const buildingId = location.pathname.split('/')[3];

    
    
    useEffect(()=>{
        const fetchBuilding = async () => {
                   
            try {
                const res = await axios.get(`/buildings/${buildingId}`)

                setBuilding(res.data);

                setInputs({
                    project_id: res.data.project_id || '',
                    name: res.data.name || '', 
                    description: res.data.description || '',
                });

            } 
            catch (error){
            } 
    
        }
        fetchBuilding()

    }, [buildingId])
    
    
    
    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.put(`/buildings/${building.id}`, inputs);
            navigate(`/company/${currentCompany.id}/buildings`)
        } catch (error) {
            console.log(error)
            // setError(error.response.data)
        }

        setIsProcessing(false)

    };



    useEffect(()=>{
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
        fetchProjects()
    }, [currentCompany.id])



    if(!building || !projects){
        return <Spinner />
    }

    return (
        <CompanyDashboardLayout>
            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/company/${currentCompany.id}/buildings`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Edit a Building</h4>
                            </div>
                        </div>
                    </div>
                    {isProcessing ? 
                    (<div className="p-6 h-36 flex justify-center items-center">
                        <Spinner />
                    </div>)
                    : 
                   ( <form onSubmit={submit} className='p-6'>

                   <div className="grid grid-cols-2 gap-4">

                       <div className=''>

                           <InputLabel htmlFor="name" value={'Building Name'}/>
                           <TextInput
                               id="name"
                               type="text"
                               name="name"
                               value={inputs.name}
                               className="mt-1 block w-full"
                               autoComplete="name"
                               onChange={handleInputChange}
                               required
                               placeholder="Building Name / Title"

                           />
                       </div>
         

                       <div className="">
                       <InputLabel htmlFor="project_id" value={'Projects'}/>
                           <select 
                               id="project_id" 
                               name="project_id" 
                               className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                               onChange={handleInputChange}
                               >
                               {projects.map((project, index)=>(
                                   <option key={index} value={project.id}>{ project.name }</option>
                               ))}

                           </select>
                       </div>

                       <div className="col-span-2 mb-3">
                           <InputLabel htmlFor="description" value="Description" />

                           <textarea
                               id="description"
                               name="description"
                               value={inputs.description}
                               className={inputClasses}
                               onChange={handleInputChange}
                               required
                               rows={5}
                               placeholder='Shot and Precise Description about the project'
                           ></textarea>
                       </div>
                   </div>

                       <div className="flex gap-2">
                           <button 
                               type="submit"
                               className={`${btnClasses} ${ isProcessing && 'opacity-25' }`}
                               disabled={isProcessing}
                               >
                                   Submit
                           </button>
                       </div>
                       {
                        //    error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                       }
                   </form>)
                    }

                </div>

            </div>

        </CompanyDashboardLayout>
    );
}

