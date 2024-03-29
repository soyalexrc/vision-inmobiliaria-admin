import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Collapse, Divider, IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import noImage from "../../assets/vision-icon.png";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteButton from "../shared/DeleteButton";
import SearchIcon from '@mui/icons-material/Search'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {formatPrice} from "../../utils/format";
import useProperties from "../../hooks/api/properties/useProperties";
import useRegisterProperty from "../../hooks/api/properties/useRegisterProperty";
import PreviewModal from "./PreviewModal";
import ChangeStatusModal from "./ChangeStatusModal";
import HistoryModal from "./HistoryModal";
import ComissionModal from "./ComissionModal";

export default function PropertiesListRow({row, index, owners}) {
  console.log(row);
  const [open, setOpen] = useState(false);
  const {getPropertyById, loading, deleteProperty, getPropertyHistory, history: historyData} = useProperties();
  const {data} = useRegisterProperty();
  const [previewModal, setPreviewModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [comissionModal, setComissionModal] = useState(false);
  const userType = JSON.parse(localStorage.getItem("vi-currentUser")).user_type;

  const navigate = useNavigate();

  const openPreview = async (row) => {
    setPreviewModal(true);
    await getPropertyById(row.id);
  }

  const openHistoryModal = async (id) => {
    setHistoryModal(true);
    await getPropertyHistory(id);
  }

  function handleComissionModal() {
    setStatusModal(false)
    setComissionModal(true)
  }

  return (
    <>
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': {border: 0},
          transition: "background .2s",
          backgroundColor: open && 'rgba(0,0,0, 0.05)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0, 0.05)'
          }
        }}
      >
        <TableCell sx={{ px: 5 }}>{index}</TableCell>
        <TableCell sx={{ px: 5 }}>{row.code}</TableCell>
        <TableCell>
          <Typography>20/02/2022</Typography>
        </TableCell>
        <TableCell>
          <Box
            onError={({currentTarget}) => {
              currentTarget.onerror = null;
              currentTarget.src = noImage
            }}
            component='img'
            src={row.image ? row.image : noImage}
            width={50}
            height={50}
            sx={{borderRadius: 100}}
          />
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 180 }}>{row.attributes[0]?.property_type}</Typography>
        </TableCell>
        <TableCell>
          <Typography>Nomenclatura</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 250 }}>
            {row.location.country} - {row.location.city} - {row.location.state} - {row.location.municipality}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 130 }}>{formatPrice(row.price)}</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 130 }}>{formatPrice(row.price)}</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 200 }}>{owners && owners.length > 0 && `${owners[0].first_name} ${owners[0].last_name}` }</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 200 }}>{row.operationType}</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 130 }}>Aliado</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 130 }}>Asesor</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 200 }}>External capacitor</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 200 }}>Motivo de operacion</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 200 }}>{row.property_status}</Typography>
        </TableCell>
        <TableCell>
          <Typography  sx={{ width: 200 }}>Estatus documento</Typography>
        </TableCell>
        <TableCell>
          <Typography>Nomenclatura 1</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 200 }}>Metraje de terreno cuadrado</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 200 }}>Metraje de terreno construccion</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 200 }}>Material de piso </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ width: 200 }}>Comentarios de distribucion</Typography>
        </TableCell>
        <TableCell align='center'>
          <Box>
            <Box display='flex' alignItems='center'>
              {
                userType === 'Administrador' &&
                <>
                  <Tooltip title='Editar propiedad'>
                    <IconButton onClick={() => navigate(`editar/${row.id}`)}>
                      <EditIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Cambiar estatus'>
                    <IconButton onClick={() => setStatusModal(true)}>
                      <AutorenewIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Vista preeliminar '>
                    <IconButton onClick={() => openPreview(row)}>
                      <OpenInNewIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Eliminar propiedad'>
                    <DeleteButton item={`Propiedad: ${row.propertyType} ${row.operationType}`}
                                  onClick={() => deleteProperty(row.id)}/>
                  </Tooltip>
                </>
              }
              {
                userType === 'Asesor inmobiliario Vision' &&
                <Tooltip title='Vista preeliminar '>
                  <IconButton onClick={() => openPreview(row)}>
                    <OpenInNewIcon/>
                  </IconButton>
                </Tooltip>
              }
            </Box>
            <Button variant='text' fullWidth size='small' onClick={() => openHistoryModal(row.id)}>Ver historial</Button>
          </Box>
        </TableCell>
      </TableRow>
      <PreviewModal open={previewModal} setOpen={setPreviewModal} data={data} loading={loading}/>
      <HistoryModal open={historyModal} setOpen={setHistoryModal} data={historyData} loading={loading}/>
      <ChangeStatusModal data={row} open={statusModal} setOpen={setStatusModal} trigger={() => setComissionModal(true)} />
      <ComissionModal data={row} open={comissionModal} setOpen={setComissionModal} trigger={() => setComissionModal(true)} />
    </>
  )
}
