import UnitysPermissionTable from "../tables/UnitysPermissionTable"
import { unitsPermissions } from "../../../utils/permission";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";



export default function EditUserModal(props) {

    const [unidades, setUnidades] = useState([])




    useEffect(() => {
        dataFunction(props.company_id, props.user_id, props.permissions)
    }, [])


    const dataFunction = async (company_id, user_id, permissions) => {

        // console.log('company_id', company_id)
        // console.log('user_id', user_id)
        // console.log('permissions', permissions)


        await axios.get(`${baseUrl()}/api/userEdit`, {
            params: {
                user_id: user_id
            }
        }).then(res => {
            setUnidades(res.data.unitsPermited)
        })

    }







    return (
        <div className="modal-content">
            <div className="modal-header text-start">
                <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                    {/* {disableItem[2] ? "Reativar" : "Desativar"}  */}
                    unidade
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSaveLoading(false)}></button>
            </div>
            <div className="modal-body">
                <div className="text-start">
                    <p className={`p text-dark`}>
                        Tem certeza que deseja
                        {/* {disableItem[2] ? "reativar" : "desativar"} a unidade &quot;{disableItem[0]}&quot;? */}
                    </p>
                    {/* {!disableItem[2] && ( */}
                    <p className={`p text-dark`}>
                        <UnitysPermissionTable unidades={unitsPermissions(unidades, false, props.userConfig, props.userStatus)} permissions={props.permissions} onChange={value => { setPermissions(value); setForceUpdate(forceUpdate + 1) }} />

                    </p>
                    {/* )} */}
                </div>
            </div>
            <div className="modal-footer">
                <button
                    type="button" data-bs-dismiss="modal"
                    className="akvo_btn akvo_btn_secondary btn-sm"
                >
                    Cancelar
                </button>
                <button type="button" data-bs-dismiss="modal"
                    className="akvo_btn akvo_btn_primary btn-sm ms-2"
                // onClick={() => handleActive()}
                >
                    Continuar
                </button>
            </div>
        </div>
    )
}