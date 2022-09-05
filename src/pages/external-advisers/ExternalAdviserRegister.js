import {
  Box,
  Button,
  Divider,
  Typography,
  Container,
  Grid,
  TextField,

  MenuItem,
  InputLabel,
  Select,
  FormControl,
  useMediaQuery
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import PhoneInput from 'react-phone-input-2'
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Page from "../../components/Page";
import useGetOwners from "../../hooks/api/owners/useGetOwners";
import useUpdateOwner from "../../hooks/api/owners/useUpdateOwner";
import useCreateOwner from "../../hooks/api/owners/useCreateOwner";
import useCreateAdviser from "../../hooks/api/externalAdvisers/useCreateAdviser";

export default function OwnerEdit() {
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const { loading, createAdviser} = useCreateAdviser()
  const [adviserData, setAdviserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isInvestor: '',
    birthday: '',
    id: null,
    type: "Asesores Externos"
  })

  function changeOwnerData(type, value) {
    console.log(value);
    setAdviserData(prevState => ({
      ...prevState,
      [type]: value
    }))
  }

  return (
    <Page title='Registro de propietario | Vision Inmobiliaria'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Container maxWidth='md' sx={{py: 5}}>
            <Typography variant='h5' align='center' color='secondary.light'>Datos de propietario</Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  sx={{mt: 2}}
                  id="user-name-textfield"
                  placeholder='Email'
                  value={adviserData.email}
                  onChange={(e) => changeOwnerData('email', e.target.value)}
                  label='Email'
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  sx={{mt: 2}}
                  id="user-name-textfield"
                  placeholder='Nombres'
                  value={adviserData.firstName}
                  onChange={(e) => changeOwnerData('firstName', e.target.value)}
                  label='Nombres'
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  sx={{mt: 2}}
                  id="user-name-textfield"
                  placeholder='Apellidos'
                  value={adviserData.lastName}
                  onChange={(e) => changeOwnerData('lastName', e.target.value)}
                  label='Apellidos'
                  variant="outlined"
                />
              </Grid>


              <Grid item xs={12} md={6}>
                <Box mt={2}>
                  <PhoneInput
                    inputStyle={{
                      width: '100%',
                    }}
                    specialLabel='Telefono'
                    country='ve'
                    value={adviserData.phone}
                    preferredCountries={['us', 've']}
                    onChange={(phone) => changeOwnerData('phone', phone)}
                  />
                </Box>
              </Grid>

            </Grid>
          </Container>
          <Divider sx={{borderWidth: '2px', my: 3}}/>
          <Container maxWidth='md' sx={{py: 5}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={adviserData.birthday}
                    onChange={e => changeOwnerData('birthday', e)}
                    renderInput={(params) => <TextField fullWidth  {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              {/*<Grid item xs={12} md={6}>*/}
              {/*  <FormControl fullWidth >*/}
              {/*    <InputLabel id="demo-simple-select-label">Es inversor?</InputLabel>*/}
              {/*    <Select*/}
              {/*      labelId="demo-simple-select-label"*/}
              {/*      id="demo-simple-select"*/}
              {/*      value={adviserData.isInvestor}*/}
              {/*      label="Es inversor?"*/}
              {/*      onChange={(e) => changeOwnerData('isInvestor', e.target.value)}*/}
              {/*    >*/}
              {/*      <MenuItem value='Si'>Si</MenuItem>*/}
              {/*      <MenuItem value='No'>No</MenuItem>*/}
              {/*    </Select>*/}
              {/*  </FormControl>*/}
              {/*</Grid>*/}

            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
          <Button fullWidth={!largeScreen} disabled={loading} onClick={() => createAdviser(adviserData)} variant='contained'>Registrar propietario</Button>
        </Grid>
      </Grid>

    </Page>

  )
}




