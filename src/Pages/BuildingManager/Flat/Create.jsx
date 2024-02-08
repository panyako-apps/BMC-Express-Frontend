import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from 'axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import BuildingManagerDashboardLayout from '../../../Layouts/BuildingManagerDashboardLayout';
import { useEffect } from 'react';

const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

export default function BuildingManagerFlatCreate() {

    const {currentBuildingManager} =useContext(AuthContext);
    const [buildings, setBuildings ] = useState([]);
    const [flatCategories, setFlatCategories ] = useState('');

    const [inputs, setInputs] = useState({
        building_manager_id: currentBuildingManager.id,
        building_id: "",
        name: "",
        flat_no: "",
        flat_category_id: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.post('http://localhost:8800/api/flats', inputs);
            navigate(`/building-manager/${currentBuildingManager.id}/flats`)
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };



    
    useEffect(()=>{
        const fetchBuildings = async () => {
                   
            try {
                const res = await axios.get('http://localhost:8800/api/buildings', {
                    params: {
                        building_manager_id: currentBuildingManager.id
                    }
                })
                setBuildings(res.data);
            } catch (error) 
            {
            } 
    
        }
        fetchBuildings()
    }, [currentBuildingManager])


    useEffect(()=>{
        const fetchFlatCategories = async () => {
                   
            try {
                const res = await axios.get('http://localhost:8800/api/flat-categories')
                setFlatCategories(res.data);
            } catch (error) 
            {
            } 
    
        }
        fetchFlatCategories()
    }, [])


    return (
        <BuildingManagerDashboardLayout>

            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/building-manager/${currentBuildingManager.id}/flats`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Add a Flat</h4>
                            </div>
                        </div>
                    </div>
                    {isProcessing ? 
                    (<div className="p-6 h-36 flex justify-center items-center">
                        <Spinner />
                    </div>)
                    : 
                   ( <form onSubmit={submit} className='p-6'>

                    <div className="grid grid-cols-2 gap-4 mb-3">

                        {buildings && 
                        <div className="">
                        <InputLabel htmlFor="building_id" value={'Buildings'}/>
                            <select 
                                id="building_id" 
                                name="building_id" 
                                className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                onChange={handleInputChange}
                                >
                                {buildings.map((building, index)=>(
                                    <option key={index} value={building.id}>{ building.name }</option>
                                ))}

                            </select>
                        </div>
                        }


                        <div className=''>

                            <InputLabel htmlFor="name" value={'Name'}/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={inputs.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={handleInputChange}
                                required
                                placeholder="Name / Title"

                            />
                        </div>
                        <div className=''>

                            <InputLabel htmlFor="flat_no" value={'Flat No'}/>
                            <TextInput
                                id="flat_no"
                                type="text"
                                name="flat_no"
                                value={inputs.flat_no}
                                className="mt-1 block w-full"
                                autoComplete="flat_no"
                                onChange={handleInputChange}
                                required
                                placeholder="Flat Number"

                            />
                        </div>

                        {flatCategories && <div className="">
                        <InputLabel htmlFor="flat_category_id" value={'Flat Categories'}/>
                            <select 
                                id="flat_category_id" 
                                name="flat_category_id" 
                                className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                onChange={handleInputChange}
                                >
                                {flatCategories.map((flatCategory, index)=>(
                                    <option key={index} value={flatCategory.id}>{ flatCategory.name }</option>
                                ))}

                            </select>
                        </div>}

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

        </BuildingManagerDashboardLayout>
    );
}

