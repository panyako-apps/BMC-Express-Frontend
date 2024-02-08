import { useState } from 'react';
import InputLabel from '../../../Components/InputLabel';
import PrimaryButton from '../../../Components/PrimaryButton';
import TextInput from '../../../Components/TextInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboardLayout from '../../../Layouts/AdminDashboardLayout';


export default function RegisterCompany() {
    const [inputs, setInputs] = useState({
        name: "",
        other_names: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            const response =  await axios.post('http://localhost:8800/api/auth/company/register', inputs);
            navigate('/company/login')
        } catch (error) {
            setError(error.response.data)
        }

        setIsProcessing(false)

    };

    return (
        <AdminDashboardLayout>
            {/* <Head title="Register" /> */}
            <section className="container mx-auto px-8 pb-8">
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="name" className='font-bold'>Name of Company</label>

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

                        <PrimaryButton type="submit" className="ms-4" disabled={isProcessing}>
                            Create
                        </PrimaryButton>
                        


                    </div>
                    {
                        error && <div className="bg-red-200 text-red-600 font-bold p-2 text-center">{error}</div>
                    }
                </form>
            </section>
        </AdminDashboardLayout>
    );
}

