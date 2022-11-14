import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { api } from '../../service/api'
import Header from "../../components/header";

import moment from 'moment-timezone';

import style from './mySchedule.module.css'
import TitlePages from '../../components/titlePages';
export default function MySchedule() {

    const navigate = useNavigate()
    const [vacinas, setVacinas] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let response = await api.get('schedule')
        setVacinas(response.data)
    }

    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div>
                <TitlePages name='Meus Agendamentos' />
                <div className={style.containerPadrao}>
                    <div className={style.container}>
                        {vacinas.map(vacina => {
                            return (
                                <div key={vacina.id} className={style.mainVacinas}>
                                    <h3>Vacina:{vacina.name}</h3>
                                    <p>Local: {vacina.Rooms.Places.name}</p>
                                    <p>Data: {moment(vacina.startTime).format('DD/MM/YYYY')}</p>
                                    <p>Horário: {moment(vacina.startTime).format('HH:mm')}</p>
                                    <p className={vacina.isVaccinated == false ? `${style.notApplicated}` : `${style.applicated}`}>Status: {vacina.isVaccinated == false ? 'Ainda não aplicada' : 'Vacina aplicada'}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}