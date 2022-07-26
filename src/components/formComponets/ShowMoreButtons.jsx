import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEraser,
  faCheck,
  faComment,
  faEdit,
  faMinus,
  faPlus,
  faSave,
  faSearch,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

function ShowMoreButtons(props) {
  return (
    <>
      <h6 className="h5_title">
        Últimos dados cadastrados na unidade {props.unidName} /{" "}
        {props.anoInventario}
      </h6>
      <div className="row mb-2 me-2">
        <div className="d-flex justify-content-end">
          <span
            className="badge rounded-pill bg-primary "
            type="button"
            onClick={() => {
              props.handleClick();
            }}
          >
            {props.showMoreInfo ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default ShowMoreButtons;
