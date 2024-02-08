import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CompaniesIndex from './Pages/Admin/Company/Index';
import ProjectsIndex from './Pages/Admin/Project/Index';
import TenantsIndex from './Pages/Admin/Tenant/Index';
import BuildingsIndex from './Pages/Admin/Building/Index';
import BuildingManagersIndex from './Pages/Admin/BuildingManager/Index';
import CreateCompany from './Pages/Admin/Company/Create';

import RegisterCompany from './Pages/Auth/Company/Register';
import LoginCompany from './Pages/Auth/Company/Login';
import CompanyDashboard from './Pages/Company/CompanyDashboard';
import CompanyProjectsIndex from './Pages/Company/Project/Index';
import CompanyBuildingsIndex from './Pages/Company/Building/Index';
import CompanyBuildingManagersIndex from './Pages/Company/BuildingManager/Index';
import CompanyCommonFacilitiesIndex from './Pages/Company/CommonFacility/Index';
import RegisterBuildingManager from './Pages/Auth/BuildingManager/Register';
import LoginBuildingManager from './Pages/Auth/BuildingManager/Login';
import BuildingManagerDashboard from './Pages/BuildingManager/BuildingManagerDashboard';
import BuildingManagerFlatsIndex from './Pages/BuildingManager/Flat/Index';
import BuildingManagerTenantsIndex from './Pages/BuildingManager/Tenant/Index';
import CompanyProjectCreate from './Pages/Company/Project/Create';
import CompanyBuildingCreate from './Pages/Company/Building/Create';
import CompanyBuildingManagerCreate from './Pages/Company/BuildingManager/Create';
import CompanyCommonFacilityCreate from './Pages/Company/CommonFacility/Create';
import CompanyProjectEdit from './Pages/Company/Project/Edit';
import CompanyBuildingEdit from './Pages/Company/Building/Edit';
import CompanyCommonFacilityEdit from './Pages/Company/CommonFacility/Edit';
import CompanyBuildingManagerEdit from './Pages/Company/BuildingManager/Edit';
import BuildingManagerFlatCreate from './Pages/BuildingManager/Flat/Create';
import BuildingManagerFlatEdit from './Pages/BuildingManager/Flat/Edit';
import BuildingManagerTenantCreate from './Pages/BuildingManager/Tenant/Create';
import BuildingManagerTenantEdit from './Pages/BuildingManager/Tenant/Edit';
import BuildingManagerBookingsIndex from './Pages/BuildingManager/Booking/Index';
import BuildingManagerBookingCreate from './Pages/BuildingManager/Booking/Create';
import LoginTenant from './Pages/Auth/Tenant/Login';
import TenantDashboard from './Pages/Tenant/TenantDashboard';
import TenantBillsIndex from './Pages/Tenant/Bill/Index';
import TenantIssuesIndex from './Pages/Tenant/Issue/Index';
import TenantBookingsIndex from './Pages/Tenant/Booking/Index';
import TenantIssueCreate from './Pages/Tenant/Issue/Create';
import TenantBookingCreate from './Pages/Tenant/Booking/Create';
import BuildingManagerIssuesIndex from './Pages/BuildingManager/Issue/Index';
import BuildingManagerBillsIndex from './Pages/BuildingManager/Bills/Index';
import BuildingManagerBillCreate from './Pages/BuildingManager/Bills/Create';
import TenantIssueEdit from './Pages/Tenant/Issue/Edit';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          
          <Route path='/' element={<Navigate to={'/tenant/login'} />}></Route>

          {/* Admin */}
          <Route path='/register' element={<Register />}></Route>
          <Route path='/admin/login' element={<Login />}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
          <Route path='/admin/companies' element={<CompaniesIndex />}></Route>
          <Route path='/admin/projects' element={<ProjectsIndex />}></Route>
          <Route path='/admin/buildings' element={<BuildingsIndex />}></Route>
          <Route path='/admin/building-managers' element={<BuildingManagersIndex />}></Route>
          <Route path='/admin/tenants' element={<TenantsIndex />}></Route>
          <Route path='/admin/company/create' element={<CreateCompany />}></Route>
          

          {/* Company */}
          <Route path='/company/register' element={<RegisterCompany />}></Route>
          <Route path='/company/login' element={<LoginCompany />}></Route>
          <Route path='/company/dashboard' element={<CompanyDashboard />}></Route>
          <Route path='/company/:id/projects' element={<CompanyProjectsIndex />}></Route>
          <Route path='/company/:id/buildings' element={<CompanyBuildingsIndex />}></Route>
          <Route path='/company/:id/building-managers' element={<CompanyBuildingManagersIndex />}></Route>
          <Route path='/company/:id/common-facilities' element={<CompanyCommonFacilitiesIndex />}></Route>

          <Route path='/company/project/create' element={<CompanyProjectCreate />}></Route>
          <Route path='/company/building/create' element={<CompanyBuildingCreate />}></Route>
          <Route path='/company/building-manager/create' element={<CompanyBuildingManagerCreate />}></Route>
          <Route path='/company/common-facility/create' element={<CompanyCommonFacilityCreate />}></Route>


          <Route path='/company/project/:id/edit' element={<CompanyProjectEdit />}></Route>
          <Route path='/company/building/:id/edit' element={<CompanyBuildingEdit />}></Route>
          <Route path='/company/common-facility/:id/edit' element={<CompanyCommonFacilityEdit />}></Route>
          <Route path='/company/building-manager/:id/edit' element={<CompanyBuildingManagerEdit />}></Route>

          {/* Building Manager */}
          <Route path='/building-manager/register' element={<RegisterBuildingManager />}></Route>
          <Route path='/building-manager/login' element={<LoginBuildingManager />}></Route>
          <Route path='/building-manager/dashboard' element={<BuildingManagerDashboard />}></Route>
          <Route path='/building-manager/:id/flats' element={<BuildingManagerFlatsIndex />}></Route>
          <Route path='/building-manager/:id/tenants' element={<BuildingManagerTenantsIndex />}></Route>
          <Route path='/building-manager/flat/create' element={<BuildingManagerFlatCreate />}></Route>
          <Route path='/building-manager/flat/:id/edit' element={<BuildingManagerFlatEdit />}></Route>
          <Route path='/building-manager/tenant/create' element={<BuildingManagerTenantCreate />}></Route>
          <Route path='/building-manager/tenant/:id/edit' element={<BuildingManagerTenantEdit />}></Route>
          <Route path='/building-manager/:id/bookings' element={<BuildingManagerBookingsIndex />}></Route>
          <Route path='/building-manager/booking/create' element={<BuildingManagerBookingCreate />}></Route>
          <Route path='/building-manager/:id/issues' element={<BuildingManagerIssuesIndex />}></Route>
          <Route path='/building-manager/:id/bills' element={<BuildingManagerBillsIndex />}></Route>
          <Route path='/building-manager/bill/create' element={<BuildingManagerBillCreate />}></Route>


          {/* Tenant / Resident */}
          {/* <Route path='/building-manager/register' element={<RegisterBuildingManager />}></Route> */}
          <Route path='/tenant/login' element={<LoginTenant />}></Route>
          <Route path='/tenant/dashboard' element={<TenantDashboard />}></Route>
          <Route path='/tenant/:id/bookings' element={<TenantBookingsIndex />}></Route>
          <Route path='/tenant/:id/bills' element={<TenantBillsIndex />}></Route>
          <Route path='/tenant/:id/issues' element={<TenantIssuesIndex />}></Route>
          <Route path='/tenant/:id/bookings' element={<TenantBookingsIndex />}></Route>
          <Route path='/tenant/issue/create' element={<TenantIssueCreate />}></Route>
          <Route path='/tenant/booking/create' element={<TenantBookingCreate />}></Route>
          <Route path='/tenant/issue/:id/edit' element={<TenantIssueEdit />}></Route>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
