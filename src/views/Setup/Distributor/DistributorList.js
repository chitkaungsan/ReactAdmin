import React,{useState,useEffect} from 'react'
import GridLoader from "react-spinners/GridLoader";
import {
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
} from '@coreui/icons'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2';
const AgencyList = () => {
    const [pending, setPending] = React.useState(true);
    const [btnLoad, setBtnLoad] = React.useState(true);
    const [results, setResults] = useState([]);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#0200FA");

const override: CSSProperties = {
  display: "block",
  margin: "auto",
  borderColor: "red",
};

const columns= [
  {
    name: "No",
    selector: row => row.no,
    sortable: true,
    grow: 1
  },
  {
    name: 'Code',
    selector: row => row.code,
    sortable: true,
    grow: 2
  },{
    name: 'Distributor Name',
    selector: row => row.name,
    sortable: true,
    grow: 3
  },{
    name: 'Parent Name',
    selector: row => row.parentName,
    sortable: true,
    grow: 4
  },{
    name: 'Type',
    selector: row => row.type,
    sortable: true,
  },{
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    grow: 2
  },
  {
         name:"Action",
  cell: (row: { id: any }) => (
      <>
      <div className="row">
        <div className='col'>
      <a href="#">
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
const token =localStorage.getItem('leaf_access_token');

const config = {
  headers: {Authorization: `Bearer ${token}`}
}

useEffect(()=>{
  fetchData()
},[])
const fetchData = async () =>{
  await axios.get(`${process.env.REACT_APP_API_URL}/api/get/distributor`,config)
  .then(({data})=>{
    setResults(data.results);
    setPending(false);
  })
}
const _handleSync = () => {
    setBtnLoad(false);
     axios.get(`${process.env.REACT_APP_API_URL}/api/get/fetch/distributor`,config)
  .then(({data})=>{
    // setResults(data.message);
    console.log(data);
    if(data.status===200){
      setBtnLoad(true);
      Swal.fire({
        icon: "success",
        title: "Data is updated",
        showConfirmButton: false
      })
    }
    fetchData();
  })
}
  return(
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <div className="d-flex justify-content-between">
              <strong className='text-center'>Distributor List</strong>
              {btnLoad ?
                <CButton variant='outline' size="sm" onClick={_handleSync}>Sync</CButton> :
                 <GridLoader color={color} loading={loading} cssOverride={override} size={6} />
                }
          </div>
          </CCardHeader>
        <CCardBody>
        {btnLoad?
         <DataTable
            columns={columns}
            data={results}
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
export default AgencyList;
