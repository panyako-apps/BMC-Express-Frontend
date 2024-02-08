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



export default function CompanyBuildingManagerEdit() {
    
    const {currentCompany} = useContext(AuthContext);
    const [buildingManager, setBuildingManager] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const [buildings, setBuildings] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);


    const [inputs, setInputs] = useState({
        first_name: "",
        other_names: "",
        building_ids: selectedBuildings
    });


    const navigate = useNavigate();
    const location = useLocation();
    const buildingManagerId = location.pathname.split('/')[3];

    
    
    useEffect(()=>{
        const fetchBuildingManager = async () => {
                   
            try {
                const res = await axios.get(`/building-managers/${buildingManagerId}`)

                setBuildingManager(res.data);

                setSelectedBuildings(res.data.buildings.map(building=> building.id))

                setInputs({
                    first_name: res.data.first_name || '', 
                    other_names: res.data.other_names || '',
                });

            } 
            catch (error){
            } 
    
        }
        fetchBuildingManager()

    }, [buildingManagerId])
    
    
    
    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.put(`/building-managers/${buildingManager.id}`, inputs);
            navigate(`/company/${currentCompany.id}/building-managers`)
        } catch (error) {
            console.log(error)
            // setError(error.response.data)
        }

        setIsProcessing(false)

    };



    const fetchBuildings = async () => {
        try {
            const res = await axios.get('/buildings', {
                params: {
                    company_id: currentCompany.id,
                }
            })
            setBuildings(res.data);
        } catch (error) 
        {
        } 

    }

    useEffect(()=>{
        fetchBuildings()
    }, [])


    const toggleSelectedBuilding = (id) => {

        const isSelected = selectedBuildings.includes(id);
    
        if (isSelected) {
            setSelectedBuildings(selectedBuildings.filter((buildingId) => buildingId !== id));
        } else {
            setSelectedBuildings([...selectedBuildings, id]);
        }
    }

    useEffect(() => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          building_ids: selectedBuildings,
        }));
      }, [selectedBuildings]);

      


    if(!buildingManager){
        return <Spinner />
    }

    return (
        <CompanyDashboardLayout>
             <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/company/${currentCompany.id}/building-managers`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Edit Manager's Info</h4>
                            </div>
                        </div>
                    </div>
                    {isProcessing ? 
                    (<div className="p-6 h-36 flex justify-center items-center">
                        <Spinner />
                    </div>)
                    : 
                    (<form onSubmit={submit} className='p-6'>
                        <div className="grid grid-cols-2 gap-4 mb-3">

                            <div>
                                <InputLabel htmlFor="first_name" value={'First Name'}/>

                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    value={inputs.first_name}
                                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm  mt-1 block w-full"
                                    autoComplete="first_name"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                
                                <InputLabel htmlFor="other_names" value={'Other Names'}/>

                                <TextInput
                                    id="other_names"
                                    name="other_names"
                                    value={inputs.other_names}
                                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm  mt-1 block w-full"
                                    autoComplete="other_names"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <InputLabel value="Assign Buildings" />
                                <div  className="columns-3 gap-4">
                                    {buildings.map((building, index)=>(
                                        <div key={building.id+index} className="flex items-center gap-2 px-2 py-1 bg-slate-200 mb-2 rounded">
                                            <input 
                                                type="checkbox" 
                                                id={'building_'+index} 
                                                checked={selectedBuildings.includes(building.id)}
                                                name='buidings'
                                                value={building.id} 
                                                className="rounded border-slate-400"
                                                onChange={()=>toggleSelectedBuilding(building.id)}
                                            />
                                            <label htmlFor={'building_'+index}  className="text-blue-900 cursor-pointer">{ building.name }</label>
                                        </div>

                                    ))}
                               
                                </div>
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
                                error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                            }
                    </form>)
                    }

                </div>

                </div>

        </CompanyDashboardLayout>
    );
}

