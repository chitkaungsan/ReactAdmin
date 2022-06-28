import React,{useEffect,useState,useRef} from 'react'
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
  CForm
} from '@coreui/react'
import {
  cilPencil,
  cilTrash,
} from '@coreui/icons'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react'
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RoleList = () => {
const [name, setName] = React.useState('');
const [btnLoad, setBtnLoad] = React.useState(false);
const [pending, setPending] = React.useState(true);
const [create, setCreate] = React.useState(true);
const [id,setId] = React.useState('');
const [roles, setRoles] = useState([]);
const navigate = useNavigate();
useEffect(()=>{
  fetchData()
},[])
const token =localStorage.getItem('leaf_access_token');

const config = {
  headers: {Authorization: `Bearer ${token}`}
}
const fetchData = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/role/list`,config)
  .then(({data})=>{
    console.log(data.results);
    setRoles(data.results)
    setBtnLoad(true);
    setPending(false);
  })
}
const _onEdit= (e) =>{
  console.log(e);
  const url =`${process.env.REACT_APP_API_URL}/api/get/role/edit/${e}`;
  console.log(url)
  axios.get(url,config)
  .then(({data})=>{
    setId(e);
    setName(data.results[0].name)
  })
  setCreate(false);
}
const _backCreate = () =>{
  onReset();
  setCreate(true);
  setName('');
}
const formRef = useRef();
const onReset = () =>{
  formRef.current.reset();
}
const onSubmit = (e) =>{
  e.preventDefault();
    setPending(false);
  const formData =new FormData();
  formData.append('id',id)
  formData.append('name',name)
  formData.append('_method','POST')
  axios.post(`${process.env.REACT_APP_API_URL}/api/role/create`,formData,config)
  .then(({data})=>{
    console.log(data)
    if(data.status===200){

    Swal.fire({
      icon: 'success',
      title: 'user Create Successfully'
    })
    setPending(true);
    fetchData();
    }

  })
}
  const columns= [
  {
    name: "No",
    selector: row => row.id,
    sortable: true,
    grow: 1
  },{
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    grow: 3
  },{
         name:"Action",
  cell: (row: { id: any }) => (
      <>
      <div className="row">
        <div className='col'>
      <a href="#" onClick={()=>_onEdit(row.id)}>
        <CIcon  icon={cilPencil} size="lg"/>
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
      <CCol sm  lg md={12}>
        <CCard>
          <CCardHeader>
            Role Create
          </CCardHeader>
          <CCardBody>
          <CRow>
      {
        create?
        <CForm onSubmit={onSubmit}  ref={formRef}>
           <CCol  sm lg md={12}>
            <CRow>
                <CFormLabel htmlFor="selectName" className="col-sm-2 col-form-label">
                <small>Role Name</small>
                </CFormLabel>
                <div className="col-sm-6">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='text'
                 onChange={(event)=>{setName(event.target.value)}}
                 value={name}
                  />
                </div>
                 <div className="col-sm-2">
                <CButton size={'sm'} type='submit'>Submit</CButton>
                </div>
                </CRow>
                 </CCol>
          </CForm>
        :
        <CForm onSubmit={onSubmit}  ref={formRef}>
            <CCol  sm lg md={12}>
            <CRow>
                <CFormLabel htmlFor="selectName" className="col-sm-2 col-form-label">
                <small>Role Name</small>
                </CFormLabel>
                <div className="col-sm-6">
                <CFormInput value={id} type='hidden' onChange={(event)=>{setId(event.target.value)}}/>
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='text'
                 value={name}
                 onChange={(event)=>{setName(event.target.value)}}
                  />
                </div>
                 <div className="col-sm-2">
                <CButton size={'sm'} type="submit">Update</CButton>
                </div>
                 <div className="col-sm-2">
                <CButton color='info' size={'sm'} onClick={() =>_backCreate('qq')}>Cancel</CButton>
                </div>
                </CRow>
                 </CCol>
              </CForm>
      }
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol  sm  lg md={12}>
      <CCard>
        <CCardHeader>
          Role List
        </CCardHeader>
        <CCardBody>
     {btnLoad?
         <DataTable
            columns={columns}
            data={roles}
            pagination
            defaultSortFieldId={1}
            progressPending={pending}
            progressComponent={<CSpinner color='primary'/>}

        />  :
  <div className='text-center'>
        <CSpinner color='primary' />

  </div>
        }
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
  )
}
export default RoleList;
