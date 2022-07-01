

export default function InventoryCards(props) {

    return (

        <div className="inventoryCards shadow fadeItem mt-4">
            <div className="form">
                <div className="row">
                    <div className="col-12">
                        <div className="row mb-4">
                            <div className="col-12">

                                {props.children}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}