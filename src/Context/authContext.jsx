import axios from '../axios';
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    


    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [currentCompany, setCurrentCompany] = useState(JSON.parse(localStorage.getItem("company")) || null);
    const [currentBuildingManager, setCurrentBuildingManager] = useState(JSON.parse(localStorage.getItem("building-manager")) || null);
    const [currentTenant, setCurrentTenant] = useState(JSON.parse(localStorage.getItem("tenant")) || null);
    


    // Admin
    const login = async(inputs) =>{
        const res = await axios.post('/auth/login', inputs);
        setCurrentUser(res.data)
    };

    const logout = async () =>{
        const res = await axios.post('/auth/logout');
        setCurrentUser(null);
    };
    
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);




    //Company 
    const companyLogin = async(inputs) =>{
        const res = await axios.post('/auth/company/login', inputs);
        setCurrentCompany(res.data)
    };

    const companyLogout = async () =>{
        const res = await axios.post('/auth/company/logout');
        setCurrentCompany(null);
    };

    useEffect(()=>{
        localStorage.setItem("company", JSON.stringify(currentCompany))
    }, [currentCompany]);




    //Buiding Manager 
    const buildingManagerLogin = async(inputs) =>{
        const res = await axios.post('/auth/building-manager/login', inputs);
        setCurrentBuildingManager(res.data)
    };

    const buildingManagerLogout = async () =>{
        const res = await axios.post('/auth/building-manager/logout');
        setCurrentBuildingManager(null);
    };

    useEffect(()=>{
        localStorage.setItem("building-manager", JSON.stringify(currentBuildingManager))
    }, [currentBuildingManager]);





    //Buiding Manager 
    const tenantLogin = async(inputs) =>{
        const res = await axios.post('/auth/tenant/login', inputs);
        setCurrentTenant(res.data)
    };

    const tenantLogout = async () =>{
        const res = await axios.post('/auth/tenant/logout');
        setCurrentTenant(null);
    };

    useEffect(()=>{
        localStorage.setItem("tenant", JSON.stringify(currentTenant))
    }, [currentTenant]);




    return (<AuthContext.Provider value={{
            currentUser, login, logout, 
            currentCompany, companyLogin, companyLogout,
            currentBuildingManager, buildingManagerLogin, buildingManagerLogout,
            currentTenant, tenantLogin, tenantLogout
            }}>
                {children}
                
            </AuthContext.Provider>)




};

