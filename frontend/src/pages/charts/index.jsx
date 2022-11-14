import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../service/api";

import Header from "../../components/header";
import TitlePages from '../../components/titlePages'
import Spinner from '../../components/spinner';

import { AiOutlineSearch } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'

import { CheckPicker } from 'rsuite'
import { InputPicker } from 'rsuite';
import { DateRangePicker } from 'rsuite';

import style from './reports.module.css'
import moment from "moment";
import ChartProductBymonth from './charts/chartScheduleByMonth';
import ChartProductByStatus from './charts/chartScheduleByStatus';
import ChartProductByPlaces from './charts/chatScheduleByPlaces';
import ChartScheduleByRooms from './charts/chatScheduleByRooms';

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default function Reports() {
    const navigate = useNavigate()

    const [schedule, setSchedule] = useState([])

    const [dateReports, setDateReports] = useState('')
    const [loading, setLoading] = useState([])


    useEffect(() => {
        getSchedules()
    }, []);

    async function getSchedules() {
        setLoading(true)
        let response = await api.get('/schedule')
        setSchedule(response.data)
        setLoading(false)
    }

    async function clearFilterReports() {
        setLoading(true)
        getSchedules()
        setDateReports('')
        setLoading(false)
    }

    async function handleFilterReports() {
        setLoading(true)
        let response = await api.get('/schedule')

        let result = response.data.filter(e=>{
            return(
                moment( e.startTime).format('YYYY-MM-DD') >= moment(dateReports[0]).format('YYYY-MM-DD') &&
                moment( e.startTime).format('YYYY-MM-DD') <= moment(dateReports[1]).format('YYYY-MM-DD')
            )
        })
        console.log(result)
        setSchedule(result)
        setLoading(false)
    }
    console.log(dateReports)
    console.log(schedule)

    return (
        <div className={style.main}>
            <Header funcao={() => navigate('/')} />
            <div className={style.container}>
                {loading == true ? (
                    <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div></div>
                )}
                <TitlePages name='Estatísticas de agendamentos' />
                <div className={style.containerReport}>
                    <div className={style.selectData}>

                        <div className={style.select}>
                            <span><strong>Escolher período:</strong></span>
                            <DateRangePicker ranges={[]} value={dateReports} onChange={setDateReports} placeholder="Selecione as datas" style={{ width: 224 }} />
                        </div>

                        <div style={{display: 'flex', alignItems: 'end'}} >
                            <button style={{ background: '#fff', color: '#5A58A8' }} type="button" className={style.buttonsCalendar} onClick={() => clearFilterReports()}><RiCloseFill size={20} /></button>
                            <button type="button" className={style.buttonsCalendar} onClick={() => handleFilterReports()}><AiOutlineSearch size={18} /></button>
                        </div>
                    </div>

                    <div className={style.charts}>
                        <ChartProductBymonth schedule={schedule} dateReports={dateReports} />
                        <ChartProductByStatus schedule={schedule} />
                        <ChartProductByPlaces schedule={schedule}/>
                        <ChartScheduleByRooms schedule={schedule}/>
                    </div>
                </div>
            </div>
        </div>
    )
}