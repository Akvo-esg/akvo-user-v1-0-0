import React, { useRef, useState } from "react";
import styles from '../../../styles/Comentario.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { faComment } from "@fortawesome/free-solid-svg-icons";

function Comentarios(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div>
      <span aria-describedby={id} variant="contained" type="button" onClick={handleClick} className="position-relative">
         <FontAwesomeIcon icon={faComment} />
         <span
           className="notificationSign fadeItem"
           style={{ pointerEvents: "none" }}
         >
           <span className="visually-hidden">New alerts</span>
         </span>
       </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={ styles['comentario-header'] }>Comentário:</div>
        <Typography sx={{ p: 1.5 }}>{props.comentario}</Typography>
      </Popover>
    </div>
  );
}

export default Comentarios;
