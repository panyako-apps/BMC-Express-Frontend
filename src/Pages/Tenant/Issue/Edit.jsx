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



export default function TenantIssueEdit() {
    
    const {currentTenant} = useContext(AuthContext);
    const [issue, setIssue] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    
    const [inputs, setInputs] = useState({
        description: "",
    });


    const navigate = useNavigate();
    const location = useLocation();
    const issueId = location.pathname.split('/')[3];

    
    
    useEffect(()=>{
        const fetchIssue = async () => {
                   
            try {
                const res = await axios.get(`/issues/${issueId}`)

                setIssue(res.data);
                
                // console.log(res.data)

                setInputs({
                    name: res.data.name || '', 
                    description: res.data.description || '',
                });

            } 
            catch (error){
            } 
    
        }
        fetchIssue()

    }, [issueId])
    
    
    
    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await axios.put(`/issues/${issue.id}`, inputs);
            navigate(`/tenant/${currentTenant.id}/issues`)
        } catch (error) {
            console.log(error)
            // setError(error.response.data)
        }

        setIsProcessing(false)

    };

    if(!issue){
        return <Spinner />
    }

    return (
        <TenantDashboardLayout>
            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/tenant/${currentTenant.id}/issues`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Edit a Issue</h4>
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

                        <div className="col-span-2 mb-3">
                            <InputLabel htmlFor="description" value="Description" />

                            <textarea
                                id="description"
                                name="description"
                                value={inputs.description}
                                className={inputClasses}
                                onChange={handleInputChange}
                                required
                                rows={2}
                                placeholder='Shot and Precise Description about the issue'
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

