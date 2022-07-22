import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Overlay from 'react-bootstrap/Overlay';
import { faComment } from "@fortawesome/free-solid-svg-icons";

function Comentarios(props) {
  // Handle Popover
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };


  return (
    <div ref={ref}>
      <span type="button" onClick={handleClick} className="position-relative">
        <FontAwesomeIcon icon={faComment} />
        <span
          className="notificationSign fadeItem"
          style={{ pointerEvents: "none" }}
        >
          <span className="visually-hidden">New alerts</span>
        </span>
      </span>
      <Overlay
        show={show}
        target={target}
        placement="left"
        container={ref}
        containerPadding={20}
        rootClose
        onHide={() => setShow(false)}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Comentário:</Popover.Header>
          <Popover.Body>{props.comentario}</Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default Comentarios;
