import Link from 'next/link'

export default function AddCompanyUnid(props) {

    return (
        <div className="pagesContent shadow fadeItem">
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <div className="form mt-1">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 px-1">
                                            <h5 className="h5_title">{props.title}</h5>
                                            <p>{props.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <Link href={props.link}>
                                    <button className='akvo_btn akvo_btn_primary btn-sm'>{props.button}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}