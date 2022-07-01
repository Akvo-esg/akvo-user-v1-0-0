import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

export default function FormCheckCard(props) {



    return (
        <div className="card cardAnimation border-secondary shadow"
            id="userConfigbasico" type="button" onClick={() => setUserConfig('basico')}>
            <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                {userConfig === "basico" && (
                    <div className="akvo-cardCheck fadeItem">
                        <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                    </div>
                )}
                <FontAwesomeIcon icon={faUserGroup} className="text-light h-75" />
            </div>
            <div className="card-body">
                <h5 className="h5_title">Básico</h5>
                <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </div>
        </div>
    )
}