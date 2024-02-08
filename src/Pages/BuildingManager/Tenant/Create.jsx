import { useContext, useEffect, useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import BuildingManagerDashboardLayout from '../../../Layouts/BuildingManagerDashboardLayout';

const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

export default function BuildingManagerTenantCreate() {

    const {currentBuildingManager} =useContext(AuthContext);
    const [fileReaderDocumentURL, setFileReaderDocumentURL] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const [buildings, setBuildings] = useState();
    const [flats, setFlats] = useState();
    const [residentTypes, setResidentTypes] = useState();


    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        building_manager_id: currentBuildingManager.id,
        resident_type_id: "",
        building_id: "",
        flat_id: "",
        first_name: "",
        other_names: "", //nullable
        email: "",
        password: "",
        password_confirmation: "",
        mobile_no: "", //nullable
        document: "" //nullable
    });


    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    
    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.post('/tenants', inputs);
            navigate(`/building-manager/${currentBuildingManager.id}/tenants`)
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };



    useEffect(()=>{
        const fetchBuildings = async () => {
                   
            try {
                const res = await axios.get('/buildings', {
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
        const fetchFlats = async () => {
                   
            try {
                const res = await axios.get('/flats', {
                    params: {
                        building_id: inputs.building_id
                    }
                })
                setFlats(res.data);
            } catch (error) 
            {
            } 
    
        }
        fetchFlats()
    }, [inputs.building_id])



    useEffect(()=>{
        const fetchResidentTypes = async () => {
                   
            try {
                const res = await axios.get('/resident-types')
                setResidentTypes(res.data);
            } catch (error) 
            {
            } 
        }

        fetchResidentTypes()

    }, [])



    const handleFileChange = (e) => {
        
        const selectedDocument = e.target.files[0];

        const reader = new FileReader();

        reader.onload = () =>{
            setInputs((prev) => ({
              ...prev,
              document: selectedDocument,
            }));

            setFileReaderDocumentURL(reader.result)
        }

        reader.readAsDataURL(selectedDocument);

      };


    return (
        <BuildingManagerDashboardLayout>
            {/* <Head title="Register" /> */}
            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/building-manager/${currentBuildingManager.id}/tenants`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Add a Resident</h4>
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
                                    onChange={handleInputChange}
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
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>

                            <div className="">
                                <InputLabel htmlFor="mobile_no" value="Mobile No." />

                                <TextInput
                                    id="mobile_no"
                                    type="text"
                                    name="mobile_no"
                                    value={inputs.mobile_no}
                                    className="mt-1 block w-full"
                                    autoComplete="mobile_no"
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>


                            {buildings && 
                                <div className="">
                                <InputLabel htmlFor="building_id" value={'Buildings'}/>
                                    <select 
                                        id="building_id" 
                                        name="building_id" 
                                        className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                        onChange={handleInputChange}
                                        >
                                        <option>Select Building</option>
                                        {buildings.map((building, index)=>(
                                            <option key={index} value={building.id}>{ building.name }</option>
                                        ))}

                                    </select>
                                </div>
                                }


                            {flats && 
                            <div className="">
                            <InputLabel htmlFor="flat_id" value={'Choose a Flats'}/>
                                <select 
                                    id="flat_id" 
                                    name="flat_id" 
                                    className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                    onChange={handleInputChange}
                                    >
                                    <option>Select Flat</option>
                                    
                                    {flats.map((flat, index)=>(
                                        <option key={index} value={flat.id}>{ flat.name }</option>
                                    ))}

                                </select>
                            </div>
                            }
                            
                            {residentTypes && 
                            <div className="">
                            <InputLabel htmlFor="resident_type_id" value={'Choose a Resident Type'}/>
                                <select 
                                    id="resident_type_id" 
                                    name="resident_type_id" 
                                    className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                    onChange={handleInputChange}
                                    >
                                    {residentTypes.map((residentType, index)=>(
                                        <option key={index} value={residentType.id}>{ residentType.name }</option>
                                    ))}

                                </select>
                            </div>
                            }


                            <div className={`${fileReaderDocumentURL && 'col-span-2'} flex gap-4`}>
                                {
                                    fileReaderDocumentURL && 
                                    <div className="h-24 rounded-md overflow-hidden shadow border border-slate-300">
                                        <img src={fileReaderDocumentURL} className='h-full'/>
                                    </div>
                                }
                                <div className='grow'>

                                    <InputLabel htmlFor="document" value={fileReaderDocumentURL ? 'Select Another Document' : 'Supporting Document'}/>
                                    <input
                                        id="document"
                                        type="file"
                                        name="document"
                                        className="block w-full bg-slate-100 p-1.5 rounded-md border border-slate-300"
                                        onChange={handleFileChange}

                                    />
                                </div>

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


        </BuildingManagerDashboardLayout>
    );
}
