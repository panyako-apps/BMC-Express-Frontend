import { useContext, useEffect, useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { AuthContext } from '../../../Context/authContext';
import CompanyDashboardLayout from '../../../Layouts/CompanyDashboardLayout';
import Spinner from '../../../Components/Spinner/Spinner';

export default function CompanyBuildingManagerCreate() {

    const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const {currentCompany} =useContext(AuthContext);

    const [buildings, setBuildings] = useState([]);

    const [selectedBuildings, setSelectedBuildings] = useState([]);


    const [inputs, setInputs] = useState({
        company_id: currentCompany.id,
        first_name: "",
        other_names: "",
        email: "",
        password: "",
        password_confirmation: "",
        building_ids: selectedBuildings
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
            const response =  await axios.post('/building-managers', inputs);
            navigate(`/company/${currentCompany.id}/building-managers`)
        } catch (error) {
            setError(error.response.data)
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

      
    return (
        <CompanyDashboardLayout>
            {/* <Head title="Register" /> */}
            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/company/${currentCompany.id}/building-managers`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Register a Building Manager</h4>
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
                                    isFocused={true}
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
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={inputs.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* <InputError message={errors.email} className="mt-2" /> */}
                            </div>

                            <div className="">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={inputs.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* <InputError message={errors.password} className="mt-2" /> */}
                            </div>

                            <div className="">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={inputs.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* <InputError message={errors.password_confirmation} className="mt-2" /> */}
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
