import { useContext, useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import PrimaryButton from '../../../Components/PrimaryButton';
import TextInput from '../../../Components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboardLayout from '../../../Layouts/AdminDashboardLayout';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';


export default function CreateCompany() {

    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';


    const [inputs, setInputs] = useState({
        name: "",
        other_names: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            const response =  await axios.post('http://localhost:8800/api/auth/company/register', inputs);
            navigate('/admin/companies')
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };

    return (
        <AdminDashboardLayout>

            <section className="container mx-auto px-8 py-8">

                <div className="mb-8">
                    <Link to={`/admin/${currentUser.id}/companies`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Add a Company</h4>
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
                                <div>
                                    <InputLabel htmlFor="name" value={'Name of the Company'}/>

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={inputs.name}
                                        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm  mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    {/* <InputError message={errors.name} className="mt-2" /> */}
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
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    type="submit"
                                    className={`${btnClasses} ${ isProcessing && 'opacity-25' }`}
                                    disabled={isProcessing}
                                    >
                                        Create
                                </button>
                            </div>
                            {
                                error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                            }
                        </form>
                    )}
                </div>
                
            </section>
        </AdminDashboardLayout>
    );
}

