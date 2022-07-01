import { useEffect } from "react";
import $ from "jquery";
import Title from "../src/components/title/Title"
import { StickyContainer, Sticky } from "react-sticky";


export default function ManualAkvo() {



    return (
        <div>
            <Title title={'Manual Akvo'} />

            <div className="pagesContent shadow fadeItem">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-4">
                                <div className="col-2 text-start">
                                    <div className="manualIndexPosition">


                                        <nav id="navbar-example3" className="navbar navbar-light bg-light flex-column align-items-stretch p-3">
                                            <a className="navbar-brand" href="#">Sumário</a>
                                            <nav className="nav nav-pills flex-column">
                                                <a className="nav-link" href="#item-1">Item 1</a>
                                                <nav className="nav nav-pills flex-column">
                                                    <a className="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                                                    <a className="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                                                </nav>
                                                <a className="nav-link" href="#item-2">Item 2</a>
                                                <a className="nav-link" href="#item-3">Item 3</a>
                                                <nav className="nav nav-pills flex-column">
                                                    <a className="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
                                                    <a className="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
                                                </nav>
                                            </nav>
                                        </nav>
                                    </div>
                                </div>



                                <div className="col-10 text-start">

                                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabIndex="0">
                                        <h4 id="item-1">Item 1</h4>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <h5 id="item-1-1">Item 1-1</h5>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>

                                        <h5 id="item-1-2">Item 1-2</h5>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>

                                        <h4 id="item-2">Item 2</h4>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>

                                        <h4 id="item-3">Item 3</h4>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>

                                        <h5 id="item-3-1">Item 3-1</h5>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>

                                        <h5 id="item-3-2">Item 3-2</h5>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>
                                        <p>Consectetur voluptate tempor voluptate veniam amet adipisicing. Dolore dolore ad dolor esse anim tempor irure exercitation laborum ea. Ad ullamco consectetur aliqua minim consectetur exercitation laborum.</p>





                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}