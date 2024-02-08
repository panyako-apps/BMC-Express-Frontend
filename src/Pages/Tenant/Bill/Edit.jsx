import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from '../../../axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import TenantDashboardLayout from '../../../Layouts/TenantDashboardLayout';


const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';



export default function TenantBillEdit() {
    
    const {currentTenant} = useContext(AuthContext);
    const [bill, setBill] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
    });


    const navigate = useNavigate();
    const location = useLocation();
    const billId = location.pathname.split('/')[3];

    
    
    useEffect(()=>{
        const fetchIssue = async () => {
                   
            try {
                const res = await axios.get(`/bills/${billId}`)

                setIssue(res.data);

                setInputs({
                    name: res.data.name || '', 
                    description: res.data.description || '',
                });

            } 
            catch (error){
            } 
    
        }
        fetchIssue()

    }, [billId])
    
    
    
    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.put(`/bills/${bill.id}`, inputs);
            navigate(`/company/${currentTenant.id}/bills`)
        } catch (error) {
            console.log(error)
            // setError(error.response.data)
        }

        setIsProcessing(false)

    };

    if(!bill){
        return <Spinner />
    }

    return (
        <TenantDashboardLayout>
            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/company/${currentTenant.id}/bills`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Edit a bill</h4>
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

                            <InputLabel htmlFor="name" value={'bill Name'}/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={inputs.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={handleInputChange}
                                required
                                placeholder="bill Name / Title"

                            />
                        </div>
                        <div className=''>
                            <InputLabel htmlFor="name" value={'Location'}/>

                            <TextInput
                                id="location"
                                name="location"
                                value={inputs.location}
                                className="mt-1 block w-full "
                                autoComplete="location"
                                onChange={handleInputChange}
                                placeholder="bill Location"
                            />
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
                                placeholder='Shot and Precise Description about the bill'
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
                            // error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                        }
                    </form>)
                    }

                </div>

            </div>

        </TenantDashboardLayout>
    );
}

