import React from 'react'
import KpiCreate from './views/Setup/KPI/Create'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Table
const KPIList = React.lazy(()=>import('./views/Setup/KPI/Index'))
const KPICreate = React.lazy(()=>import('./views/Setup/KPI/Create'))
// Agency
const AgencyList = React.lazy(()=>import('./views/Setup/Agency/AgencyList'))
// Product
const ProductList = React.lazy(()=>import('./views/Setup/Product/ProductList'))
 //user list
 const UserList = React.lazy(()=>import('./views/User/UserList'))
 const UserEdit = React.lazy(()=>import('./views/User/UserEdit'))

//  Role
const RoleList = React.lazy(()=>import('./views/role/RoleList'))
//Distributor
const DistributorList = React.lazy(()=>import('./views/Setup/Distributor/DistributorList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kpiList', name: 'KpiList', element: KPIList },
  { path: '/kpiCreate', name: 'KpiCreate', element: KPICreate },
  { path: '/agencyList', name: 'AgencyList', element: AgencyList },
  { path: '/productList', name: 'ProductList', element: ProductList },
  { path: '/distributorList', name: 'DistributorList', element: DistributorList },
  { path: '/userList', name: 'UserList', element: UserList },
  { path: '/user/edit/:id', name: 'UserEdit', element: UserEdit },
  { path: '/roleList', name: 'RoleList', element: RoleList}
]

export default routes
