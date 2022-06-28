import React,{useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const DefaultLayout = () => {

  const navigate = useNavigate();


  const getLocalToken = () =>{
    const auth =localStorage.getItem("leaf_access_token");
    const exptime=localStorage.getItem("exp_time");
    const current_time=Math.round((new Date()).getTime() / 1000);

    if(exptime<current_time){
      localStorage.clear();
    }
    if(auth!==null){
      navigate(window.location.pathname)
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Token is Expired',
        showConfirmButton: false
      })
      navigate('/login')
    }

  }
  useEffect(() => {
    getLocalToken()
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
