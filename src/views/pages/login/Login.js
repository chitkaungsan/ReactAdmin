import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {


  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let time=new Date().getTime()+(1*60*60*1000);
  let exptime=Math.round(time/1000);
  const getLocalToken = () =>{

    const auth =localStorage.getItem("leaf_access_token");
        if(auth!==null){
      navigate('/index/dashboard')
    }else{
      sessionStorage.setItem('leaf_allow',false);
      navigate('/login')
    }
  }
  useEffect(() => {
    const auth =localStorage.getItem("leaf_access_token");
    if(window.location.pathname!=='/login' || auth!==null){
    getLocalToken();
    }
  })


  const onSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('_method','POST');
    await axios.post(`${process.env.REACT_APP_API_URL}/api/login`,formData)
    .then(({data})=>{
      Swal.fire({
        icon: "success",
        title: "Success",
        showConfirmButton: false
    })
    localStorage.setItem("leaf_access_token",data.token)
    localStorage.setItem("exp_time",exptime)
    navigate('/index/dashboard')
    }).catch(({response})=>{
      Swal.fire({
        icon: 'error',
        title: response.data.message
      })
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
