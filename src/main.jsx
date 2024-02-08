import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/authContext.jsx'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBan, faBuilding, faBuildingColumns, faCalendarCheck, faChevronLeft, faCogs, faCubes, faDoorOpen, faEdit, faEllipsisH, faExclamationTriangle, faFileInvoiceDollar, faKey, faListAlt, faLock, faLockOpen, faPlus, faPlusCircle, faSignOutAlt, faSwimmingPool, faTachometerAlt, faTrashAlt, faUser, faUserCheck, faUserPlus, faUsers, faWifi } from '@fortawesome/free-solid-svg-icons'

library.add(
  faBuilding, 
  faEllipsisH, 
  faListAlt, 
  faCubes, 
  faKey, 
  faUser,
  faUserCheck,
  faUsers, 
  faCogs, 
  faTachometerAlt, 
  faEdit, 
  faTrashAlt, 
  faLockOpen, 
  faPlus,
  faPlusCircle, 
  faUserPlus,
  faLock,
  faBan,
  faChevronLeft,
  faDoorOpen,
  faSwimmingPool,
  faWifi, 
  faBuildingColumns,
  faSignOutAlt,
  faExclamationTriangle,
  faCalendarCheck,
  faFileInvoiceDollar,
  )



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
