import { useNavigate } from "react-router-dom";

import Header from "../../components/header";
import Label from "../../components/label";

import { GoSearch } from 'react-icons/go'

import style from './UBSSchedule.module.css'
export default function UBSSchedule() {

    const navigate = useNavigate()
    let vacinas = [
        {
            id: 1,
            title: 'Vacina Covid',
            local: 'USB-Granada',
            createdBy: 'Marcela Rodrigues',
            date: '25/10/2022',
            time: '09:30',
            status: 'Vacina aplicada'
        },
        {
            id: 2,
            title: 'Vacina Febre',
            local: 'USB-Granada',
            createdBy: 'Marcela Rodrigues',
            date: '30/10/2022',
            time: '10:30',
            status: 'Vacina aplicada'
        },
        {
            id: 3,
            title: 'Vacina Poli',
            local: 'USB-Granada',
            createdBy: 'Atilio Rodrigues',
            date: '05/11/2022',
            time: '15:00',
            status: 'Ainda não aplicada'
        },
        {
            id: 4,
            title: 'Vacina variola',
            local: 'USB-Granada',
            createdBy: 'Atilio Rodrigues',
            date: '08/11/2022',
            time: '17:00',
            status: 'Ainda não aplicada'
        },
        {
            id: 5,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            createdBy: 'Atilio Roberto',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 6,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            createdBy: 'Atilio Roberto',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 7,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            createdBy: 'Atilio Roberto',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 8,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            createdBy: 'Atilio Roberto',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        }
    ]


    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div>
                <h1 className={style.containerTitle}>Meus Agendamentos</h1>
                <div className={style.containerSearch}>
                    <div style={{ width: '31%' }}>
                        <Label>Selecione a UBS</Label>
                        <select className="selectPadrao" >
                            <option value="">Todos</option>
                            <option value="">UBS-Granada2</option>
                            <option value="">UBS-Granada3</option>
                            <option value="">UBS-Granada4</option>
                            <option value="">UBS-Granada5</option>
                        </select>
                    </div>
                    <div style={{ width: '31%' }}>
                        <Label>Selecione a data</Label>
                        <input type='date' style={{ margin: '0px' }} className="inputPadrao" />
                    </div>
                    <div style={{ width: '31%' }}>
                        <Label>Escreve o nome</Label>
                        <input style={{ margin: '0px' }} className="inputPadrao" />
                    </div>
                    <div className={style.iconSearch}>
                        <div className={style.iconsSearch}>
                            <GoSearch size={30} color="#5A58A8" />
                        </div>
                    </div>
                </div>
                <div className={style.containerPadrao}>
                    <div className={style.container}>
                        {vacinas.map(vacina => {
                            return (
                                <div onClick={() => navigate(`/details/schedule/${vacina.id}`)} key={vacina.id} className={style.mainVacinas}>
                                    <h3>Vacina: {vacina.title}</h3>
                                    <h4>Nome: {vacina.createdBy}</h4>
                                    <p>Local: {vacina.local}</p>
                                    <p>Data: {vacina.date}</p>
                                    <p>Horário: {vacina.time}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}