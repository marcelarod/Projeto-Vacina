import { useNavigate } from "react-router-dom";

import Header from "../../components/header";

import style from './mySchedule.module.css'
export default function MySchedule() {

    const navigate = useNavigate()
    let vacinas = [
        {
            id: 1,
            title: 'Vacina Covid',
            local: 'USB-Granada',
            date: '25/10/2022',
            time: '09:30',
            status: 'Vacina aplicada'
        },
        {
            id: 2,
            title: 'Vacina Febre',
            local: 'USB-Granada',
            date: '30/10/2022',
            time: '10:30',
            status: 'Vacina aplicada'
        },
        {
            id: 3,
            title: 'Vacina Poli',
            local: 'USB-Granada',
            date: '05/11/2022',
            time: '15:00',
            status: 'Ainda não aplicada'
        },
        {
            id: 4,
            title: 'Vacina variola',
            local: 'USB-Granada',
            date: '08/11/2022',
            time: '17:00',
            status: 'Ainda não aplicada'
        },
        {
            id: 5,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 6,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 7,
            title: 'Vacina tetano',
            local: 'USB-Granada',
            date: '10/11/2022',
            time: '08:30',
            status: 'Ainda não aplicada'
        },
        {
            id: 8,
            title: 'Vacina tetano',
            local: 'USB-Granada',
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
                <div className={style.containerPadrao}>
                    <div className={style.container}>
                        {vacinas.map(vacina => {
                            return (
                                <div key={vacina.id} className={style.mainVacinas}>
                                    <h3>Vacina: {vacina.title}</h3>
                                    <p>Local: {vacina.local}</p>
                                    <p>Data: {vacina.date}</p>
                                    <p>Horário: {vacina.time}</p>
                                    <p className={vacina.status == 'Ainda não aplicada' ? `${style.notApplicated}` : `${style.applicated}`}>Status: {vacina.status}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}