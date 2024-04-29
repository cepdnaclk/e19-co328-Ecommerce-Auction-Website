import { useCallback, useEffect, useState } from 'react'
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import UseAuth from '../hooks/UseAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../themes/Header';
import { blue } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Dropzone from './Dropzone';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import axios from 'axios';


//for popup alerts





const AddItem = () => {
    const { auth, setAuth } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //for popup alerts
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  const colorblue = blue[900];

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //to drag and drop files
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])


  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg:'only images up to 1mb are accepted',
    sev: 'error'
  });
  const { vertical, horizontal, open, msg, sev } = state;

  //to popup alerts
  const handleClose = () => {
    setState({ ...state, open: false });
  };


  //for drag and drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if(acceptedFiles.length>4){
        setState({...state, open: true, msg: "only 4 image files of each 1MB are accepted", sev:'error'})
    }

    else if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
    
    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
      setState({...state, open: true, msg: "only 4 image files of each 1MB are accepted", sev:'error'})
    }
  }, [state])

  //remove submited files
  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  //remove submitted by clicking
  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  


  const handleFormSubmit = async (values, {resetForm}) => {
    

    const formattedDate = dayjs(values.startDate).format('MM/DD/YYYY');
    const formattedDEnd = dayjs(values.endDate).format('MM/DD/YYYY');
    try{
    const form = new FormData();
    files.forEach(file => form.append('file', file));
    form.append("userName","seller1" )
    form.append("title", values.title);
    form.append("category", values.category);
    form.append("description", values.description);
    form.append("startDate", formattedDate);
    form.append("endDate", formattedDEnd);
    form.append("startPrice", values.startPrice);
    form.append("incrementPrice", values.incrementPrice)
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.accessToken );
    
    
    const response = await axios.post('http://localhost:9081/seller/addItem', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': user.accessToken  
        }
      });
      console.log(response.data)
    }catch(e){
        console.log(e);
        localStorage.removeItem("user");
        navigate("/seller/dashboard");

    }
    console.log("hi");

   
    
    // const data = {
   
    //     title: values.title,
    //     category: values.category,
    //     description: values.description,
    //     startDate: formattedDate,
    //     endDate: values.endDate,
    //     startPrice: values.startPrice,
    //     endPrice: values.incrementPrice
        
    // };
   
    // console.log(data);
    resetForm();
    setFiles([]);
  };

  

  
  return (
    <Box m="10px">
      <Header title="" subtitle="CREATE LISTING" />
      
        {errorMessage && (
        <Box mt="50px">
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}

    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key='topcenter'
      ><Alert severity={sev}>{msg}</Alert>
      </Snackbar>
    </Box>


      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"

              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={touched.title && errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
             
             <FormControl variant='filled'
            fullWidth
            sx={{ gridColumn: "span 2" }}
            > 
                <InputLabel>category</InputLabel>
            <Select
                label="Category"
                variant='filled'
                onChange={handleChange}
                sx={{ gridColumn: "span 4" }}
                error={touched.category && errors.category}
                helperText={touched.category && errors.category}
                fullWidth
                name = "category"
                value={values.category}
                
            >
                
                <MenuItem value={"Fine Arts"}>Fine arts</MenuItem>
                <MenuItem value={"Decorative Arts"}>Decorative arts</MenuItem>
                <MenuItem value={"Jewellery"}>Jewellery</MenuItem>
                <MenuItem value={"Watches"}>Watches</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
        </FormControl>



              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
                multiline
                sx={{ gridColumn: "span 4" }}
              />

            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="startPrice"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startPrice}
                name="startPrice"
                error={touched.startPrice && errors.startPrice}
                helperText={touched.startPrice && errors.startPrice}
                multiline
                sx={{ gridColumn: "span 2" }}
              />

            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="increment Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.incrementPrice}
                name="incrementPrice"
                error={touched.incrementPrice && errors.incrementPrice}
                helperText={touched.incrementPrice && errors.incrementPrice}
                multiline
                sx={{ gridColumn: "span 2" }}
                
              />

           <LocalizationProvider dateAdapter={AdapterDayjs} variant="filled">
           
            <DateField label="Auction Start Date"            
            name="startDate"
            onBlur={handleBlur}
            variant="filled"
            sx={{ gridColumn: "span 2" }}
            onChange={(date) => setFieldValue('startDate', date)}
            error={touched.startDate && errors.startDate}
            helperText={touched.startDate && errors.startDate}
            value={values.startDate}
            />
            <DateField label="Auction End Date"            
            name="endDate"
            onBlur={handleBlur}
            variant="filled"
            sx={{ gridColumn: "span 2" }}
            onChange={(date) => setFieldValue('endDate', date)}
            error={touched.endDate && errors.endDate}
            helperText={touched.endDate && errors.endDate}
            value={values.endDate}
            />
            
            </LocalizationProvider>

            <Dropzone onDrop={onDrop} files={files} rejected={rejected} removeRejected={removeRejected} removeFile={removeFile}/>
                    
              
              
              
              
            </Box><br/>
            <Box display="grid" color="primary" variant="contained">
              <Button type="submit" color='secondary' variant='contained' >
            
                CREATE LISTING
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      
    </Box>
  );
};

//for yup validation
const checkoutSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.string().required("category is required"),
    description: yup.string().required("description is required"),
    startDate: yup
    .date()
    .required("Start date is required")
    .min(dayjs().toDate(), "Start date cannot be in the past"),
    endDate: yup
    .date()
    .required("End date is required")
    .min(dayjs().toDate(), "End date cannot be in the past"),
    startPrice: yup
    .number()
    .required("Start price is required")
    .integer("Start price must be an integer")
    .positive("Start price must be a positive number"), 

    incrementPrice: yup
    .number()
    .required("Increment price is required")
    .integer("Increment price must be an integer")
    .positive("Increment price must be a positive number"), 
    
  
});
const initialValues = {
   
    title: "",
    category: "",
    description: "",
    startDate: null,
    endDate: null,
    startPrice: "",
    endPrice: ""
    
};


export default AddItem