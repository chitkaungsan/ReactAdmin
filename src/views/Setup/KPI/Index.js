import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import {
  CCollapse,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner
} from '@coreui/react'
import {
  cilPencil,
  cilTrash,
  cilPlus
} from '@coreui/icons'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom';
const KpiList = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [pending, setPending] = React.useState(true);
    const token = localStorage.getItem('leaf_access_token');
    const navigate = useNavigate();
    const config = {
      headers: {Authorization: `Bearer ${token}`}
    }
    const handleEdit=(e)=>{
      console.log(e);
    }
    const handleDelete= (e)=>{
      console.log(e);
    }
    useEffect(() => {
      fetchData()
    }, [])
    const fetchData = async () =>{

    await axios.get(`${process.env.REACT_APP_API_URL}/api/get/kpi`, config)
    .then(({data})=>{
      if(data.status===505){
        navigate('/login')
      }else{
        setData(data.result)
      }
      setPending(false);
    },20000).catch(({response})=>{
      console.log(response);
    })
}
const columns = [
    {
      name: 'Number',
      selector: row => row.no,
      center: true,
    },
    {
        name: 'Product Name',
        selector: row => row.product_name,
        sortable: true,
        grow: 3
    },
     {
        name: 'Staff Position',
        selector: row => row.staff_type,
        sortable: true,
    },
     {
        name: 'Started Date',
        selector: row => row.start_date,
        sortable: true,
    },
    {
        name: 'Finished Date',
        selector: row => row.end_date,
        sortable: true,
    },
    {
         name:"Action",
  cell: (row: { id: any }) => (
      <>
      <div className="row">
        <div className='col'>
      <a href="#" onClick={()=>handleEdit(row.id)}>
        <CIcon  icon={cilPencil} size="lg"/>
    </a>
        </div>
                <div className='col'>
      <a href="#" onClick={()=>handleDelete(row.id)}>
        <CIcon  icon={cilTrash} size="lg"/>
    </a>
        </div>
      </div>


    </>
  ),
  allowOverflow: true,
  button: true,
    },

];


  return (
    <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <div className="d-flex justify-content-between">

              <strong className='text-center'>KPI List</strong>


          <CButton variant='outline' size="sm"><Link to='/index/kpiCreate' style={{ textDecoration: 'none' }}>Create</Link></CButton>
          </div>



          </CCardHeader>
          <CCardBody>
              <CCollapse visible={visible}>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
              </CCollapse>
              <a href="#" onClick={()=>setVisible(!visible)}>Search</a>

            <DataTable
            columns={columns}
            data={data}
            pagination
            defaultSortFieldId={1}
            progressPending={pending}
            progressComponent={<CSpinner color='primary'/>}

        />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )


}

export default KpiList;
