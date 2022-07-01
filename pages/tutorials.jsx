import Title from "../src/components/title/Title"

export default function Tutorials() {


    return (
        <div>
            <Title title={'Tutoriais'} />

            <div className="pagesContent shadow fadeItem">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-4">
                                <div className="col-12 text-start">
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingOne">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    Gerenciamento de unidades
                                                </button>
                                            </h2>
                                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <p>
                                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first items accordion body.
                                                    </p>  <br />
                                                    <iframe width="707" height="400" src="https://www.youtube.com/embed/cyGtKkECnSY" title="Tutorial - Gerenciamento de unidades" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                    Gerenciamento de usuários
                                                </button>
                                            </h2>
                                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <p>
                                                        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second items accordion body. Lets imagine this being filled with some actual content.
                                                    </p> <br />
                                                    <iframe width="707" height="400" src="https://www.youtube.com/embed/mtU7huYm2P0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                    Inventário
                                                </button>
                                            </h2>
                                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third items accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                                    Gestão de Emissões
                                                </button>
                                            </h2>
                                            <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third items accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>

                                                


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}