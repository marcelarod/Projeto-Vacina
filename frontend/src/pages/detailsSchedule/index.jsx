import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from './detailsSchedule.module.css'

import Header from "../../components/header";
import { RiPencilFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs';

export default function DetailsSchedule() {
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState('')

    const vacinas =
    {
        id: 1,
        title: 'Vacina Covid',
        local: 'USB-Granada',
        createdBy: 'Marcela Rodrigues',
        date: '25/10/2022',
        time: '09:30',
        status: 'Vacina aplicada'
    }


    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div>
                <h1 className={style.containerTitle}>{vacinas.title}</h1>
                <div className={style.containerPadrao}>
                    <div className={style.editContainer}>
                        <h2 onClick={() => setSelectedStatus(c => !c)}>Editar <RiPencilFill color='#5A58A8' size={14} /></h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <h1>Nome:{vacinas.createdBy}</h1>
                            <p>Local:{vacinas.local}</p>
                            <p>Data: {vacinas.date}</p>
                            <p>Hora:{vacinas.time}</p>
                        </div>
                        {selectedStatus == true ?
                            <div className={style.containerEdit}>
                                <h2>Lançar vacina</h2>
                                <p>Paciente compareceu:</p>
                                <select className="selectPadrao" value={selectedStatus} multiple={false} onChange={(e) => { setSelectedStatus(e.target.value) }}>
                                    <option value="Compareceu">Compareceu</option>
                                    <option value="Naocompareceu">Não compareceu</option>
                                </select>
                                <p>Lote da vacina:</p>
                                <input className={style.inputPlaces} type="text" />
                                <buton className={style.buttonSalva}>  Salvar <BsCheck color='#5A58A8' size={20} /></buton>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}