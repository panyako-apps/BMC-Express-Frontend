import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from '../../../axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import BuildingManagerDashboardLayout from '../../../Layouts/BuildingManagerDashboardLayout';
import { useEffect } from 'react';

const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

export default function BuildingManagerBillCreate() {

    const {currentBuildingManager} =useContext(AuthContext);
    const [flats, setFlats ] = useState([]);
    const [flat, setFlat ] = useState({});

    const [inputs, setInputs] = useState({
        building_manager_id: currentBuildingManager.id,
        tenant_id: "", 
        flat_id: "", 
        firstname: "", 
        othernames: "", 
        flat_no: "", 
        mobile_no: "", 
        // status: "", 
        flat_category_name: "", 
        amount: "", 
        duedate: "", 
        
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const changeSelectFlat = (e) => {
        const selectedFlat = flats.find((item) => item.id === e.target.value);
        setFlat(selectedFlat); 
    };
    

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.post('/bills', inputs);
            navigate(`/building-manager/${currentBuildingManager.id}/bills`)
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };


    
    useEffect(()=>{
        const fetchFlats = async () => {
                   
            try {
                const res = await axios.get('/flats', {
                    params: {
                        building_manager_id: currentBuildingManager.id
                    }
                })
                setFlats(res.data);
                // console.log(res.data)
                
            }   
            catch (error) 
            {

            } 
        }
        fetchFlats()
    }, [currentBuildingManager])



    useEffect(() => {

        setInputs(prevInputs => ({
            ...prevInputs,
            flat_id: flat.id, 
            tenant_id: flat.tenant_id, 
            firstname: flat.tenant_first_name, 
            othernames: flat.tenant_other_names, 
            flat_no: flat.flat_no, 
            mobile_no: flat.tenant_mobile_no, 
            // status: flat.tenant_status, 
            flat_category_name: flat.flat_category_name, 
        }));
    }, [flat]);



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
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Add a Bill</h4>
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

                        {flats && 
                        <div className="">
                        <InputLabel htmlFor="flat_id" value={'Flat'}/>
                            <select 
                                id="flat_id" 
                                name="flat_id" 
                                className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                onChange={(e)=>changeSelectFlat(e)}
                                >

                                 <option>Select an Flat</option>

                                {flats.map((flat, index)=>(
                                        <option key={index} value={flat.id}>{ flat.name }</option>
                                ))}

                            </select>
                        </div>
                        }

                        {inputs.flat_category_name && <div className=''>

                            <InputLabel htmlFor="flat_category_name" value={'Flat Category'}/>
                            <TextInput
                                id="flat_category_name"
                                type="text"
                                name="flat_category_name"
                                value={inputs.flat_category_name}
                                className="mt-1 block w-full"
                                autoComplete="flat_category_name"
                                onChange={handleInputChange}
                                required
                                placeholder="Flat Category"

                            />
                        </div>}
           
                        {inputs.firstname && <div className=''>

                            <InputLabel htmlFor="firstname" value={'First Name'}/>
                            <TextInput
                                id="firstname"
                                type="text"
                                name="firstname"
                                value={inputs.firstname}
                                className="mt-1 block w-full"
                                autoComplete="firstname"
                                onChange={handleInputChange}
                                required
                                placeholder="First Name"

                            />
                        </div>}
                        {inputs.othernames && <div className=''>

                            <InputLabel htmlFor="othernames" value={'Other Names'}/>
                            <TextInput
                                id="othernames"
                                type="text"
                                name="othernames"
                                value={inputs.othernames}
                                className="mt-1 block w-full"
                                autoComplete="othernames"
                                onChange={handleInputChange}
                                required
                                placeholder="Other Names"

                            />
                        </div>}
                       
                       
                        {inputs.flat_no && <div className=''>

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
                                placeholder="Flat No"

                            />
                        </div>}
                       
                        {inputs.mobile_no && <div className=''>

                            <InputLabel htmlFor="mobile_no" value={'Mobile No'}/>
                            <TextInput
                                id="mobile_no"
                                type="text"
                                name="mobile_no"
                                value={inputs.mobile_no}
                                className="mt-1 block w-full"
                                autoComplete="mobile_no"
                                onChange={handleInputChange}
                                required
                                placeholder="Mobile No"

                            />
                        </div>}
                  
                        {/* {inputs.status && <div className=''>

                            <InputLabel htmlFor="status" value={'Status'}/>
                            <TextInput
                                id="status"
                                type="text"
                                name="status"
                                value={inputs.status}
                                className="mt-1 block w-full"
                                autoComplete="status"
                                onChange={handleInputChange}
                                required
                                placeholder="Status"

                            />
                        </div>} */}
               
                        <div className=''>

                            <InputLabel htmlFor="amount" value={'Amount'}/>
                            <TextInput
                                id="amount"
                                type="number"
                                step="0.5"
                                name="amount"
                                value={inputs.amount}
                                className="mt-1 block w-full"
                                autoComplete="amount"
                                onChange={handleInputChange}
                                required
                                placeholder="Amount"

                            />
                        </div>
                       
                        <div className='mb-4'>

                        <InputLabel htmlFor="duedate" value={'Due Date'}/>
                        <TextInput
                            id="duedate"
                            type="date"
                            name="duedate"
                            value={inputs.duedate}
                            className="mt-1 block w-full"
                            autoComplete="duedate"
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

