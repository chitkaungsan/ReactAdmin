import React,{useState,useEffect} from 'react'
import {useNavigate, useParams  } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CFormInput,
  CForm,
  CContainer
} from '@coreui/react'

import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';

const UserEdit = () =>{
const navigate = useNavigate();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [role, setRole] = useState('');
const [roles, setRoles] = useState([]);
const [password, setPassword] = useState('');
const [password_confirmation, setPasswordConfirmation] = useState('');
const [validationError,setValidationError] = useState({});
const [roleName, setRoleName] = useState('');
const {id} = useParams();
const token =localStorage.getItem('leaf_access_token');

const config = {
  headers: {Authorization: `Bearer ${token}`}
}
useEffect(() => {
  fetchData();
  fetchRole();
}, [])


const fetchData = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/user/${id}`,config)
  .then(({data})=>{
    setName(data.results[0].name);
    setEmail(data.results[0].email);
    setRole(data.results[0].role_id);
    setRoleName(data.results[0].role_name);
  })
}
const fetchRole = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/roles`,config)
  .then(({data})=>{
    setRoles(data.results)
  })
}
const _getRoleValue = (e) =>{
  setRole(e.value);
}

const formData = new FormData();
formData.append('name',name);
formData.append('email', email);
formData.append('role',role);
formData.append('_method','POST');

const _userUpdate = async (e) => {
 e.preventDefault();
 await axios.post(`${process.env.REACT_APP_API_URL}/api/user/edit/${id}`,formData,config)
 .then(({data})=>{
if(data.status===500){
  setValidationError(data.error)
}else if(data.status===200){
  Swal.fire({
    icon: 'success',
    title: 'Success, User update successfully',
    showConfirmButton: false
  })
  navigate('/index/userList')
  }
 })
}
    return(
      <CContainer>
    <CRow>

      <div className='col-sm-6 col-lg-6 col-md-6'>
        <CCard className="mb-4">
          <CCardHeader>
          <div className="d-flex justify-content-between">
              <strong className='text-center'>User Edit</strong>

          </div>
               </CCardHeader>
                <CCardBody>
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-6">
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
                <CForm onSubmit={_userUpdate}>
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
                    value={{ label: roleName , value: role }}
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
                 disabled
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
                 disabled
                  />
                </div>
              </CRow>
               <CRow>
              <div className='col-sm-4'>

              </div>

                <CCol xs={2}>
                <CButton color='light' type='submit' >Update</CButton>
                </CCol>
                <CCol xs={2}>
                </CCol>
                <CCol xs={2}>
                  <CButton color='info' onClick={() => navigate(-1)}>Cancel</CButton>
                </CCol>
              </CRow>
              </CForm>

                </CCardBody>
            </CCard>
        </div>
      </CRow>
      </CContainer>
    )
  }

export default UserEdit;
