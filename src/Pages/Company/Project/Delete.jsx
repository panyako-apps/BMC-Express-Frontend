import React, { useContext, useState } from 'react';
import Modal from '../../../Components/Modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/authContext';
import axios from '../../../axios';


const btnClasses = 'rounded-md border border-transparent bg-slate-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded-md border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';

const DeleteProjectButton = ({ project, onProjectDeleted }) => {
  
  const navigate = useNavigate();
  const {currentCompany} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };


  const deleteProject = async () => {
    setInProgress(true);

    try {
        await axios.delete(`/projects/${project.id}`);
        onProjectDeleted();
        navigate(`/company/${currentCompany.id}/projects`);
    } catch (error) {
        console.log(error)
    } finally{
      setInProgress(false);
      toggleModal();
    }

  };

  return (
    <div>
      <button onClick={toggleModal} >
        <span className="flex gap-1 items-center">
            <FontAwesomeIcon icon={'fa-trash-alt'} className="text-red-600"/>
            <span>
                Delete
            </span>
        </span>
      </button>



      <Modal show={show} closeable={true} maxWidth="sm">
        {inProgress ? (
          <div className="p-6 h-36 flex justify-center items-center">
            <Spinner text="Deleting..." />
          </div>
        ) : (
          <div className="p-6">
            <div className="flex gap-2 items-center mb-3">
              <h2 className="text-red-500">Are you sure, you want to delete this Project?</h2>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={deleteProject}
                className={btnCloseClasses}
              >
                  <FontAwesomeIcon icon={'fa-trash-alt'} className="text-white"/> Yes, Delete
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className={btnClasses}
              >
                No, Go Back
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DeleteProjectButton;
