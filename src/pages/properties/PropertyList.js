import {
  Box,
  LinearProgress,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Button,
  TableHead,
  TableBody,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Badge,
  useMediaQuery, styled,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from 'react-router-dom'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useProperties from "../../hooks/api/properties/useProperties";
import PropertiesListRow from "../../components/properties/PropertiesListRow";
import PropertiesFiltersDrawer from "../../components/properties/PropertiesFiltersDrawer";
import useGetOwners from "../../hooks/api/owners/useGetOwners";

const TableHeaderItem = styled(TableCell)(({theme}) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));

export default function PropertyList() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const {getProperties, properties, loading} = useProperties()
  const {getOwners, owners } = useGetOwners()
  const [filtersData, setFiltersData] = useState({
    filters: [],
    pageNumber: 1,
    pageSize: 5
  })
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();
  const [filtersDrawer, setFiltersDrawer] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectFilter = (code, value) => {
    const filters = [...filtersData.filters];
    if (value === null) {
      if (filters.length === 1) {
        filters.pop();
      }
      const removed = filters.findIndex(x => x.parameter === code);
      filters.splice(removed, 1);
    } else if (filters.filter(x => x.parameter === code)[0]) {
      const index = filters.findIndex(x => x.parameter === code);
      filters.splice(index, 1);
      filters.push(value);
    } else {
      filters.push(value);
    }
    setFiltersData(prevState => ({
      ...prevState,
      filters,
    }))
  }

  const applyFilters = () => {
    setFiltersDrawer(false);
    getProperties(filtersData)
  }


  useEffect(() => {
    getProperties(filtersData);
    getOwners()
  }, [])



  return (
    <Paper elevation={4} sx={{width: '100%', p: 2}}>
      <Box p={2}>
        <Box display='flex' flexWrap='wrap' alignItems='center' mb={2}>
          <Typography variant='h2'>Propiedades</Typography>
          <Typography sx={{mx: 2}} color='gray'>{!loading && properties.total && properties.total} propiedades registradas</Typography>
        </Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{width: '100%'}}
              id="search-textfield"
              placeholder="Buscar por codigo de inmueble"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button fullWidth={!largeScreen} variant='contained' color='primary'
                    sx={{display: 'flex', mt: !largeScreen && 2}} onClick={() => navigate('crear')}>
              <AddIcon/>
              propiedad
            </Button>
          </Grid>
        </Grid>
        <Badge badgeContent={filtersData.filters.length} color="primary">
          <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)}
                  sx={{display: 'flex'}}>
            <FilterAltIcon/>
            Filtros
          </Button>
        </Badge>

      </Box>
      <Box sx={{width: '100%'}}>
        {loading && <LinearProgress/>}
      </Box>
      <TableContainer >
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem >Código</TableHeaderItem>
              <TableHeaderItem >Fecha de registro</TableHeaderItem>
              <TableHeaderItem >Imagen</TableHeaderItem>
              <TableHeaderItem >Inmueble</TableHeaderItem>
              <TableHeaderItem >Nomenclatura</TableHeaderItem>
              <TableHeaderItem >Ubicación</TableHeaderItem>
              <TableHeaderItem >Precio</TableHeaderItem>
              <TableHeaderItem >Negociación </TableHeaderItem>
              <TableHeaderItem >Propietario</TableHeaderItem>
              <TableHeaderItem >Tipo de operación</TableHeaderItem>
              <TableHeaderItem >Aliado</TableHeaderItem>
              <TableHeaderItem >Asesor</TableHeaderItem>
              <TableHeaderItem >Capacitador externo</TableHeaderItem>
              <TableHeaderItem >Motivo de operación</TableHeaderItem>
              <TableHeaderItem >Estatus</TableHeaderItem>
              <TableHeaderItem >Estatus documento</TableHeaderItem>
              <TableHeaderItem >Nomenclatura</TableHeaderItem>
              <TableHeaderItem >M2 Terreno </TableHeaderItem>
              <TableHeaderItem >M2 Construcción </TableHeaderItem>
              <TableHeaderItem >Tipo de piso </TableHeaderItem>
              <TableHeaderItem >Comentarios Distribución </TableHeaderItem>
              <TableHeaderItem  align='center'>Acciones</TableHeaderItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && properties.data && properties.data.length > 0 && properties.data.map((row, index) => (
              <PropertiesListRow key={row.id} row={row} index={index + 1} owners={owners}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*{loading && <Box sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}><LoadingScreen /></Box>}*/}
      {
        (!properties.data || properties.data.length) < 1 &&
        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Typography>No se encontradon propiedades...</Typography>
        </Box>
      }
      <Box sx={{display: 'flex', justifyContent: 'end', pt: 5}}>
        <Pagination
          boundaryCount={1}
          count={Math.round(10 / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>
      <PropertiesFiltersDrawer
        open={filtersDrawer}
        filters={filtersData.filters}
        applyFilters={() => applyFilters()}
        closeAction={() => setFiltersDrawer(false)}
        selectFilter={handleSelectFilter}
        largeScreen={largeScreen}
      />
    </Paper>
  )
}
