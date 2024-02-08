import { useContext, useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import PrimaryButton from '../../../Components/PrimaryButton';
import TextInput from '../../../Components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/authContext';

export default function RegisterBuildingManager() {


    const {currentCompany} =useContext(AuthContext);

    const [inputs, setInputs] = useState({
        company_id: currentCompany.id,
        first_name: "",
        other_names: "",
        email: "",
        password: "",
        password_confirmation: ""
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
            const response =  await axios.post('http://localhost:8800/api/auth/building-manager/register', inputs);
            navigate('/building-manager/login')
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };

    return (
        <>
            {/* <Head title="Register" /> */}


            <form onSubmit={submit}>
                <div>
                    <label htmlFor="first_name" className='font-bold'>Name</label>

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={inputs.first_name}
                        className="border border-gray-300  focus:border-indigo-500  focus:ring-indigo-500  rounded-md shadow-sm  mt-1 block w-full"
                        autoComplete="first_name"
                        isFocused={true}
                        onChange={handleInputChange}
                        required
                    />

                    {/* <InputError message={errors.name} className="mt-2" /> */}
                </div>
                <div>
                    <label htmlFor="other_names" className='font-bold'>Name</label>

                    <TextInput
                        id="other_names"
                        name="other_names"
                        value={inputs.other_names}
                        className="border border-gray-300  focus:border-indigo-500  focus:ring-indigo-500  rounded-md shadow-sm  mt-1 block w-full"
                        autoComplete="other_names"
                        isFocused={true}
                        onChange={handleInputChange}
                        required
                    />

                    {/* <InputError message={errors.name} className="mt-2" /> */}
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
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

                <div className="mt-4">
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

                <div className="flex items-center justify-end mt-4">
                    <Link
                        to={'/login'}
                        className="underline text-sm text-gray-600  hover:text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton type="submit" className="ms-4" disabled={isProcessing}>
                        Register
                    </PrimaryButton>
                </div>
                {
                    error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                }
            </form>
        </>
    );
}
