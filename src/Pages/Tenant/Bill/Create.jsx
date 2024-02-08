import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from 'axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import TenantDashboardLayout from '../../../Layouts/TenantDashboardLayout';


export default function TenantBookingCreate() {

    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const {currentTenant} =useContext(AuthContext);

    const [inputs, setInputs] = useState({
        tenant_id: currentTenant.id,
        // flat_id: "", //Right way
        house_no: "", //Client's way
        date: "",
        time: "",

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
            await axios.post('http://localhost:8800/api/bookings', inputs);
            navigate(`/tenant/${currentTenant.id}/bookings`)
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };



    return (
        <TenantDashboardLayout>

            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/tenant/${currentTenant.id}/bookings`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Book a House</h4>
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

                            <div className='mb-4 col-span-2'>

                                <InputLabel htmlFor="house_no" value={'Enter House Number'}/>
                                <TextInput
                                    id="house_no"
                                    type="text"
                                    name="house_no"
                                    value={inputs.house_no}
                                    className="mt-1 block w-full"
                                    autoComplete="house_no"
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter House No"

                                />
                            </div>

                            <div className='mb-4'>

                                <InputLabel htmlFor="date" value={'Pick A Date'}/>
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={inputs.date}
                                    className="mt-1 block w-full"
                                    autoComplete="date"
                                    onChange={handleInputChange}
                                    required

                                />
                            </div>
                            <div className='mb-4'>

                                <InputLabel htmlFor="time" value={'Set Time'}/>
                                <TextInput
                                    id="time"
                                    type="time"
                                    name="time"
                                    value={inputs.time}
                                    className="mt-1 block w-full"
                                    autoComplete="time"
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

        </TenantDashboardLayout>
    );
}

