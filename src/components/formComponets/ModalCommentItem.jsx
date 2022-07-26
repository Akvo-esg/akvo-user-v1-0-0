import React from 'react'
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

function ModalCommentItem(props) {
  return (
    <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" id="commentModalDB" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="h5_title" id="exampleModalLabel">Editar o comentario do registro {props.editCodeDB} </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setEditComentarioDB(props.elemComentario)}></button>
            </div>
            <div className="modal-body">
                <textarea rows="3" type="text" className="form-control"
                    value={props.editComentarioDB}
                    onChange={e => props.handleChange(e)} />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-warning" onClick={() => props.setEditComentarioDB('')}><FontAwesomeIcon icon={faEraser} /></button>
                <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal"><FontAwesomeIcon icon={faSave} /></button>
                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => props.setEditComentarioDB(props.elemComentario)}> <FontAwesomeIcon icon={faTimes} /> </button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ModalCommentItem