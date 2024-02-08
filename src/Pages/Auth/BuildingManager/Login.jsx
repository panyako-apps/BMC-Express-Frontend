import { useContext, useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import Checkbox from '../../../Components/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import managerAuthImage from '../../../assets/images/settings/manager-auth.jpg';

export default function LoginBuildingManager({status, canResetPassword}) {
   
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();
    const {buildingManagerLogin} = useContext(AuthContext)


    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const submit = async (e) => {
        e.preventDefault();

        setIsProcessing(true)

        try {
            await buildingManagerLogin(inputs);
            navigate('/building-manager/dashboard')
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };


    return (
        <>
        <div className='h-screen'>

            <div  className="flex justify-center h-full relative">
                        
                <div className="flex flex-col justify-between z-30">

                    <div className="flex items-center justify-center h-full">
                        <div className="w-[20rem] md:w-[450px] mx-auto bg-white rounded-xl overflow-hidden shadow">
                            <div className="text-xl bg-orange-100 text-orange-600 py-3 px-6 font-bold uppercase flex justify-between items-center">
                                <h1>Building Manager</h1>
                                <div className="h-10 w-10 border-dashed border border-orange-600 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={'fa-lock'} className="text-xl"/>
                                </div>
                            </div>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                            <div className="px-6 py-12">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={inputs.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={handleInputChange}
                                        />

                                        {/* <InputError message={errors.email} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={inputs.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={handleInputChange}
                                        />

                                        {/* <InputError message={errors.password} className="mt-2" /> */}
                                    </div>

                                    <div className="block mt-4">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={inputs.remember}
                                            onChange={handleInputChange}
                                                />
                                            <span className="ms-2 text-sm text-gray-600 ">Remember me</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm text-gray-600  hover:text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}

                                        <button className="py-2 w-full px-6 rounded-lg text-white bg-orange-500 hover:bg-orange-500 border border-orange-500"
                                            disabled={isProcessing}>
                                            Log in
                                        </button>
                                    </div>
                                    {
                                        error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="text-white uppercase font-bold mb-2">Login as</h4>
                        <div className="md:flex items-center gap-2">
                            <Link to={'/company/login'} className="py-1.5 px-6 w-full text-center rounded-lg text-white bg-orange-600 hover:bg-orange-500 border border-orange-600 transition-all duration-300 ease-in-out"> Company</Link>
                            <Link to={'/tenant/login'} className="py-1.5 px-6 w-full text-center rounded-lg text-orange-600 hover:text-white bg-white hover:bg-orange-600 border border-orange-600 transition-all duration-300 ease-in-out"> Tenant</Link>
                        </div>
                    </div>

                    {/* <div className="md:flex justify-between gap-2 bg-white px-6 py-2 mb-4 rounded">
                        <div className="text-slate-500 font-bold ">
                            <span>Don't Have Account?  Register</span>
                            <span><a :href="route('company.register.create')" className="text-blue-600 hover:text-blue-400"> Here.</a></span>
                        </div>
                    </div>  */}

                    <div className="mb-16 md:w-[450px] md:mx-auto">
                        <hr className="mt-8 mb-2 border-white" />
                        <div className="flex justify-center gap-4 px-8 md:px-0">
                            <a href="/" className="text-white hover:text-orange-600 font-bold">About</a>
                            <a href="/" className="text-white hover:text-orange-600 font-bold">Terms</a>
                            <a href="/" className="text-white hover:text-orange-600 font-bold">Plans</a>
                            <a href="/" className="text-white hover:text-orange-600 font-bold">Contact Us</a>
                        </div>
                    </div>


                </div>


                <div className="absolute inset-0 bg-black z-20 bg-opacity-75"></div>
                <img src={managerAuthImage} alt="" className="absolute inset-0 w-full h-full object-cover " />


            </div>
        </div>

           
        </>
    );
}




