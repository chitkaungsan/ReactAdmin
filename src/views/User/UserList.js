import React,{useState,useEffect} from 'react'
import GridLoader from "react-spinners/GridLoader";
import {useNavigate  } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner,
  CFormLabel,
  CFormInput,
  CForm,
} from '@coreui/react'
import {
  cilPencil,
  cilTrash,
} from '@coreui/icons'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2';
import Select from 'react-select';
const UserList = () =>{
const navigate = useNavigate();
const [userList, setUserList] = useState([]);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [role, setRole] = useState('');
const [roles, setRoles] = useState([]);
const [password, setPassword] = useState('');
const [password_confirmation, setPasswordConfirmation] = useState('');
const [validationError,setValidationError] = useState({});
const [pending, setPending] = React.useState(true);

const token =localStorage.getItem('leaf_access_token');

const config = {
  headers: {Authorization: `Bearer ${token}`}
}

useEffect(() => {
  fetchData()
  fetchApi()
}, [])


const fetchData = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/roles`,config)
  .then(({data})=>{
    setRoles(data.results)
    setPending(false)
  })
}
const fetchApi = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/user/list`,config)
  .then(({data})=>{
    setUserList(data.results)
  })
}
const _getRoleValue = (e) =>{
  setRole(e.value);
}
const formData = new FormData();
formData.append('name',name);
formData.append('email', email);
formData.append('role',role);
formData.append('password',password);
formData.append('password_confirmation',password_confirmation);
formData.append('_method','POST');
const _storeUser = async (e) => {
 e.preventDefault();
 await axios.post(`${process.env.REACT_APP_API_URL}/api/register`,formData,config)
 .then(({data})=>{
if(data.status===500){
  setValidationError(data.error)
}else if(data.status===200){
  Swal.fire({
    icon: 'success',
    title: 'Success, User create successfully',
    showConfirmButton: false
  })
  fetchApi();
}
 })
}

const columns= [
  {
    name: "No",
    selector: row => row.no,
    sortable: true,
  },{
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    grow: 4
  },{
    name: 'Email',
    selector: row => row.email,
    sortable: true,
    grow: 5
  },{
    name: 'Role',
    selector: row => row.role_name,
    sortable: true,
    grow: 5

  }, {
         name:"Action",
  cell: (row: { id: any }) => (
      <>
      <div className="row">
        <div className='col'>
      <a href='#' >
      <Link to={`/index/user/edit/${row.id}`} >
        <CIcon  icon={cilPencil} size="lg"/>
        </Link>
    </a>
        </div>
                <div className='col'>
      <a href="#">
        <CIcon  icon={cilTrash} size="lg"/>
    </a>
        </div>
      </div>
    </>
  ),
  allowOverflow: true,
  button: true,
    },
]
    return(
    <CRow>
      <CCol  lg md sm={5}>
        <CCard className="mb-4">
          <CCardHeader>
          <div className="d-flex justify-content-between">
              <strong className='text-center'>User Create</strong>

          </div>
               </CCardHeader>
                <CCardBody>
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <CForm onSubmit={_storeUser}>
                 <CRow className="mb-4">
                <CFormLabel htmlFor="selectName" className="col-sm-4 col-form-label">
                <small>Name</small>
                </CFormLabel>
                <div className="col-sm-8">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='text'
                 value={name}
                 onChange={(event)=>{setName(event.target.value)}}
                  />
                </div>
              </CRow>
              <CRow className="mb-4">
                <CFormLabel htmlFor="selectEmail" className="col-sm-4 col-form-label">
                <small>Email</small>
                </CFormLabel>
                <div className="col-sm-8">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='email'
                 value={email}
                 onChange={(event)=>{setEmail(event.target.value)}}
                  />
                </div>
              </CRow>
              <CRow className="mb-4">
                <CFormLabel htmlFor="selectProducts" className="col-sm-4 col-form-label">
              <small>    Roles</small>
                </CFormLabel>
                <div className="col-sm-8">
                   <Select size="sm"
                    options={roles}
                    onChange={_getRoleValue}
                />
                </div>
              </CRow>
               <CRow className="mb-4">
                <CFormLabel htmlFor="selectPassword" className="col-sm-4 col-form-label">
                <small>Password</small>
                </CFormLabel>
                <div className="col-sm-8">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='password'
                 value={password}
                 onChange={(event)=>{setPassword(event.target.value)}}
                  />
                </div>
              </CRow>
              <CRow className="mb-4">
                <CFormLabel htmlFor="selectPassword" className="col-sm-4 col-form-label">
                <small>Confirm Password</small>
                </CFormLabel>
                <div className="col-sm-8">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='password'
                 value={password_confirmation}
                 onChange={(event)=>{setPasswordConfirmation(event.target.value)}}
                  />
                </div>
              </CRow>
               <CRow>
              <div className='col-sm-4'>

              </div>

                <CCol xs={2}>
                <CButton color='light' type='submit' >Create</CButton>
                </CCol>
                <CCol xs={2}>
                  <CButton color='light' type='submit' >Reset</CButton>
                </CCol>
                <CCol xs={2}>
                  <CButton color='info' onClick={() => navigate(-1)}>Return</CButton>
                </CCol>
              </CRow>
              </CForm>

                </CCardBody>
            </CCard>
        </CCol>
        <CCol  lg md sm={7}>
        <CCard className="mb-4">
          <CCardHeader>
          <div className="d-flex justify-content-between">
              <strong className='text-center'>User List</strong>

          </div>
               </CCardHeader>
                <CCardBody>
                  <DataTable
                    columns={columns}
                    pagination
                    defaultSortFieldId={1}
                    data={userList}
                     progressPending={pending}
                    progressComponent={<CSpinner color='primary'/>}
        />
                </CCardBody>
            </CCard>
        </CCol>

      </CRow>
    )
  }

export default UserList;
