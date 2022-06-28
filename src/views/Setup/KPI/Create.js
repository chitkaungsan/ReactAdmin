import React,{useState,useEffect,useRef} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { format } from 'date-fns'
import Select from 'react-select';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
const KpiCreate = () => {
const [products, setProducts] = useState([]);
const [startDate, setStartDate] = useState(new Date());
const [kpiDetail, setKpiDetail] = useState([]);
const [productId, setProductId] = useState('');
const [sku_id,setSkuId] = useState('');
const [position,setPosition] = useState('');
const [kpi_amount,setKpiAmount] = useState('');
const [start_date,setstartDate] = useState(new Date());
const token = localStorage.getItem('leaf_access_token');
const navigate = useNavigate();
let btn;
let act;

const config = {
  headers: {Authorization: `Bearer ${token}`}
}
useEffect(() => {
  fetchData()
}, [])



const fetchData =async () =>{
  axios.get(`${process.env.REACT_APP_API_URL}/api/get/products`,config)
  .then(({data})=>{
 if(data.status===505){
        navigate('/login')
      }else{
        setProducts(data.products)
      }
  })
}


const _getProductKpi = (e,c) =>{
  let product_id=e.value;
  setProductId(e);
  setSkuId(e.value);
 const staff_id=c;
  setPosition(staff_id);
  if(product_id===undefined){
    product_id=e
  }
 const url=`${process.env.REACT_APP_API_URL}/api/get/products/kpi?product_id=${product_id}&staff_id=${staff_id}`;
 console.log(url);
 axios.get(url,config)
  .then(({data})=>{
     if(data.status===505){
        navigate('/login')
      }else{
        setKpiDetail(data.kpiDetail)
        console.log(data)
        setKpiAmount(data.kpiDetail[0]['kpi_amount'])
      }
  })
}

const _getStaffKpi = (c) =>{
  setPosition(c.target.value);
  _getProductKpi(productId,c.target.value);
}
if(kpiDetail.length===0){
   act = 1;
   btn = <CButton color='success' type='submit' name='submit'>Create</CButton>
} else{
   act = 2;
   btn = <CButton color='success' type='submit' name='submit'>Update</CButton>
}

const formData = new FormData();
formData.append('sku_id',sku_id);
formData.append('position',position);
formData.append('kpi_amount',kpi_amount);
formData.append('start_date',moment(start_date).format('YYYY-MM-DD'));
formData.append('submit',act);
formData.append('_method','POST');


const onSubmit = async (e) =>{
  e.preventDefault();
  await axios.post(`${process.env.REACT_APP_API_URL}/api/kpi/store`,formData,config)
  .then(({data})=>{
    if(data.status===200){
    Swal.fire({
      icon: "success",
      text: data.message
    }).then((result)=>{

    _getProductKpi(data.sku_id,data.position);
    onReset();
    navigate('/index/kpiList')
    })

  }else if(data.status===400){
    Swal.fire({
    icon: "error",
    text: data.message
    })

    };
  })
}
const formRef = useRef();
const onReset = () =>{
  formRef.current.reset();
  fetchData();
}

 const columns = [
    {
      name: 'Number',
      selector: row => row.no,
      center: true,
    },
    {
        name: 'KPI Amount',
        selector: row => row.kpi_amount,
        sortable: true,
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
  ];
  return (
    <CRow>
      <CCol xs lg md={6}>
      <CForm onSubmit={onSubmit} ref={formRef}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create / Update KPI</strong>
          </CCardHeader>
          <CCardBody>
              <CRow className="mb-4">
                <CFormLabel htmlFor="selectProducts" className="col-sm-2 col-form-label">
              <small>    Products</small>
                </CFormLabel>
                <div className="col-sm-9">
                   <Select size="sm"
                   onChange={_getProductKpi}
                    options={products}
                    require={true}
                />
                </div>
              </CRow>
              <CRow className="mb-4">
                <CFormLabel htmlFor="inputStaffPosition" className="col-sm-2 col-form-label">
                <small>  Staff</small>
                </CFormLabel>
                <div className="col-sm-9">
              <CFormSelect aria-label="Default select example" size="sm" onChange={_getStaffKpi} >
                <option>Open this select menu</option>
                <option value="1">PG</option>
                <option value="2">Sale</option>
                <option value="3">Leader</option>
              </CFormSelect>
                </div>
              </CRow>

              <CRow className="mb-4">
                <CFormLabel htmlFor="inputKPIAmount" className="col-sm-2 col-form-label">
                 <small>KPI</small>
                </CFormLabel>
                <div className="col-sm-6">
                 <CFormInput className='col-sm-6 col-lg-6 col-md-6' size="sm"
                 type='number'
                 value={kpi_amount}
                 onChange={(event)=>{setKpiAmount(event.target.value)}}
                  />
                </div>
              </CRow>
              <CRow className="mb-4">
                <CFormLabel htmlFor="inputKPIAmount" className="col-sm-2 col-form-label">
                  <small>Start Date</small>
                </CFormLabel>
                <div className="col-sm-6">
                <DatePicker
                  selected={start_date}
                  onChange={(date) => setstartDate(date)}
                  isClearable
                  placeholderText="I have been cleared!"
                />
                </div>
              </CRow>
              <CRow>
              <div className='col-sm-2'>

              </div>

                <CCol xs={2}>
                      {btn}

                </CCol>
                <CCol xs={2}>
                  <CButton color='light' type='submit' >Reset</CButton>
                </CCol>
                <CCol xs={2}>
                  <CButton color='info'>Return</CButton>
                </CCol>
              </CRow>
          </CCardBody>
        </CCard>
        </CForm>
      </CCol>
      {/* Table */}
      <CCol xs lg md={6}>
        <CCard>
          <CCardHeader>KPI List</CCardHeader>
          <CCardBody>
           <DataTable
            columns={columns}
            pagination
            defaultSortFieldId={1}
            data={kpiDetail}
            noDataComponent={<div>There is no KPI for this product. Please  create new KPI.</div>}

        />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default KpiCreate;
