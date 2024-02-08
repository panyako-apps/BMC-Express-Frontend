import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '../../../Components/InputLabel';
import TextInput from '../../../Components/TextInput';
import axios from 'axios';
import { AuthContext } from '../../../Context/authContext';
import Spinner from '../../../Components/Spinner/Spinner';
import CompanyDashboardLayout from '../../../Layouts/CompanyDashboardLayout';
import { useEffect } from 'react';

export default function CompanyCommonFacilityCreate() {

    const inputClasses = 'block border w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4'
    const btnClasses = 'rounded-md bg-orange-600 hover:bg-orange-700 text-white shadow-sm px-5 py-1.5 transition-all duration-300 ease-in-out';

    const {currentCompany} =useContext(AuthContext);
    const [projects, setProjects ] = useState([]);
    const [selectedProjectId, setSelectedProjectId ] = useState('');

    const [inputs, setInputs] = useState({
        company_id: currentCompany.id,
        project_id: "",
        name: "",
        description: "",
        image: "",
    });

    const [fileReaderImageURL, setFileReaderImageURL] = useState('');

    
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    const handleFileChange = (e) => {
        
        const selectedImage = e.target.files[0];

        const reader = new FileReader();

        reader.onload = () =>{
            setInputs((prev) => ({
              ...prev,
              image: selectedImage,
            }));

            setFileReaderImageURL(reader.result)
        }

        reader.readAsDataURL(selectedImage);


      };



    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('company_id', inputs.company_id);
        formData.append('project_id', inputs.project_id);
        formData.append('name', inputs.name);
        formData.append('description', inputs.description);
        formData.append('image', inputs.image);

        setIsProcessing(true)

        try {
            await axios.post('http://localhost:8800/api/common-facilities/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/company/${currentCompany.id}/common-facilities`)
        } catch (error) {
            console.log(error)
        }

        setIsProcessing(false)

    };



    
    useEffect(()=>{
        const fetchProjects = async () => {
                   
            try {
                const res = await axios.get('http://localhost:8800/api/projects', {
                    params: {
                        company_id: currentCompany.id
                    }
                })
                setProjects(res.data);
            } catch (error) 
            {
            } 
    
        }
        fetchProjects()
    }, [currentCompany])




    return (
        <CompanyDashboardLayout>

            <div className="container mx-auto py-16">

                <div className="mb-8">
                    <Link to={`/company/${currentCompany.id}/common-facilities`} className="rounded-md bg-orange-600 hover:bg-orange-700 pl-3 pr-4 py-2 text-white"> <font-awesome-icon icon="fa-chevron-left"></font-awesome-icon> Back</Link>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                        <div className="flex gap-2 items-center bg-slate-200 rounded-t px-4 py-2">
                            <div className="py-2">
                                <h4 className="font-bold text-color-main leading-4 text-lg uppercase">Add a Common Facility</h4>
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

                        <div className=''>

                            <InputLabel htmlFor="name" value={'Facility Name'}/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={inputs.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={handleInputChange}
                                required
                                placeholder="Facility Name / Title"

                            />
                        </div>
          

                        <div className="">
                        <InputLabel htmlFor="project_id" value={'Projects'}/>
                            <select 
                                id="project_id" 
                                name="project_id" 
                                className="h-10 block w-full rounded-md border border-slate-300 shadow-sm focus:border-transparent focus:ring-none sm:text-sm text-slate-600 py-1 px-4 bg-slate-100"
                                onChange={handleInputChange}
                                >
                                {projects.map((project, index)=>(
                                    <option key={index} value={project.id}>{ project.name }</option>
                                ))}

                            </select>
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
                                placeholder='Shot and Precise Description about the facility'
                            ></textarea>
                        </div>


                        <div className={`${fileReaderImageURL && 'col-span-2'} flex gap-4`}>
                        {
                            fileReaderImageURL && 
                            <div className="h-24 rounded-md overflow-hidden shadow border border-slate-300">
                                <img src={fileReaderImageURL} className='h-full'/>
                            </div>
                        }
                        <div className='grow'>

                            <InputLabel htmlFor="image" value={fileReaderImageURL ? 'Select Another Image' : 'Facility Image'}/>
                            <input
                                id="image"
                                type="file"
                                name="image"
                                className="block w-full bg-slate-100 p-1.5 rounded-md border border-slate-300"
                                onChange={handleFileChange}

                            />
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
             
                    </form>)
                    }

                </div>

            </div>

        </CompanyDashboardLayout>
    );
}

