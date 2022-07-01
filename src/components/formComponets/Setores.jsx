import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleArrowDown
} from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'


export default function Setores(props) {
    const [setorPrimario, setSetorPrimario] = useState(props.setorPrimario)
    const [setorSecundario, setSetorSecundario] = useState('')
    const [outroSetorSec, setOutroSetorSec] = useState('')

    useEffect(() => {
        props.onChange(setorPrimario, setorSecundario, outroSetorSec)
    }, [setorPrimario, setorSecundario, outroSetorSec])

    useEffect(() => {

        $(document).ready(() => {
            $("#setorPrimarioSelect").val(props.setorPrimario);
            setSetorPrimario(props.setorPrimario)
        });


        $(document).ready(() => {
            $("#setorSecundarioSelect").val(props.setorSecundario);
            setSetorSecundario(props.setorSecundario)
        });

        if (props.outroSetorSec) {
            $(document).ready(() => {
                $("#outroSetorSecSelect").val(props.outroSetorSecSelect);
                setOutroSetorSec(props.outroSetorSecSelect)
            });

        }




    }, [])

    const handleSetorPrimario = (value) => {
        setSetorPrimario(value)
        setSetorSecundario('')
        setOutroSetorSec('')
    }

    const handleSetorSecundario = (value) => {
        if (value === 'Outro') {
            setSetorSecundario(value)
        } else {
            setOutroSetorSec('')
            setSetorSecundario(value)
        }
    }

    return (

        <div className="form-group">
            <div className="form-group col-12 d-inline-flex align-items-center">
                <select className="form-select akvo_form_control_sm" id="setorPrimarioSelect"
                    onChange={e => handleSetorPrimario(e.target.value)}>
                    <option selected value='' >Escolha...</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Construção">Construção</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Eletricidade e Gás">Eletricidade e Gás</option>
                    <option value="Comércio">Comércio</option>
                    <option value="Agropecuária">Agropecuária</option>
                    {/* <option value="Produção florestal">Produção florestal</option> */}
                </select>
                {setorPrimario &&
                    (setorPrimario === "Indústria" || setorPrimario === "Serviços" || setorPrimario === "Comércio" || setorPrimario === "Agropecuária") && (
                        <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />
                    )}
            </div>
            {setorPrimario && setorPrimario === 'Indústria' && (
                <div className="form-group col-12 d-inline-flex align-items-center fadeItem mt-2">
                    <select className="form-select akvo_form_control_sm" id="setorSecundarioSelect"
                        onChange={e => handleSetorSecundario(e.target.value)}>
                        <option selected value=''>Escolha...</option>
                        <option value="Fabricação de produtos alimentícios">Fabricação de produtos alimentícios</option>
                        <option value="Fabricação de bebidas">Fabricação de bebidas</option>
                        <option value="Fabricação de produtos do fumo">Fabricação de produtos do fumo</option>
                        <option value="Fabricação de produtos têxteis">Fabricação de produtos têxteis</option>
                        <option value="Confecção de artigos do vestuário e acessórios">Confecção de artigos do vestuário e acessórios</option>
                        <option value="Preparação de couros e fabricação de artefatos de couro, artigos">Preparação de couros e fabricação de artefatos de couro, artigos</option>
                        <option value="Fabricação de produtos de madeira">Fabricação de produtos de madeira</option>
                        <option value="Fabricação de celulose, papel e produtos de papel">Fabricação de celulose, papel e produtos de papel</option>
                        <option value="Impressão e reprodução de gravações">Impressão e reprodução de gravações</option>
                        <option value="Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis">Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis</option>
                        <option value="Fabricação de produtos químicos">Fabricação de produtos químicos</option>
                        <option value="Fabricação de produtos farmoquímicos e farmacêuticos">Fabricação de produtos farmoquímicos e farmacêuticos</option>
                        <option value="Fabricação de produtos de borracha e de material plástico">Fabricação de produtos de borracha e de material plástico</option>
                        <option value="Fabricação de produtos de minerais não-metálicos">Fabricação de produtos de minerais não-metálicos</option>
                        <option value="Metalurgia">Metalurgia</option>
                        <option value="Fabricação de equipamentos de informática, produtos eletrônicos">Fabricação de equipamentos de informática, produtos eletrônicos</option>
                        <option value="Fabricação de máquinas, aparelhos e materiais elétricos">Fabricação de máquinas, aparelhos e materiais elétricos</option>
                        <option value="Fabricação de máquinas e equipamentos">Fabricação de máquinas e equipamentos</option>
                        <option value="Fabricação de veículos automotores, reboques e carrocerias">Fabricação de veículos automotores, reboques e carrocerias</option>
                        <option value="Fabricação de outros equipamentos de transporte, exceto veículos">Fabricação de outros equipamentos de transporte, exceto veículos</option>
                        <option value="Fabricação de móveis">Fabricação de móveis</option>
                        <option value="Fabricação de produtos diversos">Fabricação de produtos diversos</option>
                        <option value="Manutenção, reparação e instalação de máquinas e equipamentos">Manutenção, reparação e instalação de máquinas e equipamentos</option>
                        <option value="Extração de carvão mineral">Extração de carvão mineral</option>
                        <option value="Extração de petróleo e gás natural">Extração de petróleo e gás natural</option>
                        <option value="Extração de minerais metálicos">Extração de minerais metálicos</option>
                        <option value="Extração de minerais não-metálicos">Extração de minerais não-metálicos</option>
                        <option value="Atividades de apoio à extração de minerais">Atividades de apoio à extração de minerais</option>
                        <option value="Outro">Outro</option>
                    </select>
                    {setorSecundario === "Outro" && (
                        <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />

                    )}
                </div>
            )}
            {setorPrimario && setorPrimario === 'Serviços' && (

                <div className="form-group col-12 d-inline-flex align-items-center mt-2 fadeItem">
                    <select className="form-select akvo_form_control_sm" id="setorSecundarioSelect"
                        onChange={e => handleSetorSecundario(e.target.value)}>
                        <option selected value=''>Escolha...</option>
                        <option value="Transporte, armazenagem e correio">Transporte, armazenagem e correio</option>
                        <option value="Alojamento e alimentação">Alojamento e alimentação</option>
                        <option value="Informação e comunicação">Informação e comunicação</option>
                        <option value="Atividades financeiras, de seguros e serviços relacionados">Atividades financeiras, de seguros e serviços relacionados</option>
                        <option value="Atividades imobiliárias">Atividades imobiliárias</option>
                        <option value="Atividades profissionais, científicas e técnicas">Atividades profissionais, científicas e técnicas</option>
                        <option value="Atividades administrativas e serviços complementares">Atividades administrativas e serviços complementares</option>
                        <option value="Administração pública, defesa e seguridade social">Administração pública, defesa e seguridade social</option>
                        <option value="Educação">Educação</option>
                        <option value="Artes, cultura, esporte e recreação">Artes, cultura, esporte e recreação</option>
                        <option value="Organismos internacionais e outras instituições extraterritoriais">Organismos internacionais e outras instituições extraterritoriais</option>
                        <option value="Água, esgoto, atividades de gestão de resíduos e descontaminação">Água, esgoto, atividades de gestão de resíduos e descontaminação</option>
                        <option value="Outro">Outro</option>
                    </select>
                    {setorSecundario === "Outro" && (
                        <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />

                    )}
                </div>
            )}

            {setorPrimario && setorPrimario === 'Comércio' && (
                <div className="form-group col-12 d-inline-flex align-items-center mt-2 fadeItem">
                    <select className="form-select akvo_form_control_sm" id="setorSecundarioSelect"
                        onChange={e => handleSetorSecundario(e.target.value)}>
                        <option selected value=''>Escolha...</option>
                        <option value="Comércio varejista">Comércio varejista</option>
                        <option value="Comércio por atacado">Comércio por atacado</option>
                        <option value="Reparação de veículos automotores e motocicletas">Reparação de veículos automotores e motocicletas</option>
                        <option value="Outro">Outro</option>
                    </select>
                    {setorSecundario === "Outro" && (
                        <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />

                    )}
                </div>
            )}

            {setorPrimario && setorPrimario === 'Agropecuária' && (
                <div className="form-group col-12 d-inline-flex align-items-center mt-2 fadeItem">
                    <select className="form-select akvo_form_control_sm" id="setorSecundarioSelect"
                        onChange={e => handleSetorSecundario(e.target.value)}>
                        <option selected value=''>Escolha...</option>
                        <option value="Agricultura">Agricultura</option>
                        <option value="Pecuária">Pecuária</option>
                        <option value="Pesca e aqüicultura">Pesca e aqüicultura</option>
                        <option value="Outro">Outro</option>
                    </select>
                    {setorSecundario === "Outro" && (
                        <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />
                    )}
                </div>
            )}

            {setorPrimario && setorSecundario && setorSecundario === 'Outro' && (
                <div className="form-group col-12 d-inline-flex align-items-center mt-2 fadeItem">
                    <input type="text"
                        className="form-control akvo_form_control_sm"
                        placeholder="informe o setor"
                        value={outroSetorSec}
                        onChange={(e) => setOutroSetorSec(e.target.value)} />
                </div>
            )}
        </div >



    )
}