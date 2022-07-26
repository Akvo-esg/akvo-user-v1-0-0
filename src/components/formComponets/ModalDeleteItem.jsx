import React from "react";

function ModalDeleteItem(props) {
  return (
    <div
      className="modal fade"
      id="deleteModalBD"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="h5_title" id="exampleModalLabel">
              Excluir registro
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Tem certeza que deseja excluir o registro {props.deleteElemCodeDB}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="buttom"
              className="btn btn-danger btn-sm"
              data-bs-dismiss="modal"
              onClick={() => props.handleClick()}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteItem;
