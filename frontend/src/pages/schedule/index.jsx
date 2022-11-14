import { useState, useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";

import style from './schedule.module.css'

import Header from "../../components/header";
import TitlePages from '../../components/titlePages';

import { RiCheckboxCircleFill, RiSearchLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { BiPencil } from 'react-icons/bi'
import { IoMdTime } from 'react-icons/io'
import { FcCancel } from 'react-icons/fc'

import { api } from "../../service/api";

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    width: "25rem",
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default function Schedule() {

    const navigate = useNavigate()
    const [UBS, setUBS] = useState([])
    const [UBSPlaces, setUBSPlaces] = useState([])

    const [loading, setLoading] = useState([])

    const [selectedUBS, setSelectedUBS] = useState([])
    const [selectedUBSPlaces, setSelectedUBSPlaces] = useState([])
    const [selectedDate, setSelectedDate] = useState([])

    const [reservedTimes, setReservedTimes] = useState([])
    const [name, setName] = useState([])


    useEffect(() => {
            async function getDataPlaces() {
                setLoading(true)
                let responsePlaces = await api.get(`/place/rooms/${selectedUBS}`)
                console.log(responsePlaces)
                setUBSPlaces(responsePlaces.data)
                setLoading(false)
            }
            getDataPlaces()
        
    }, [selectedUBS, selectedDate])

    useEffect(() => {
        if(selectedDate.length > 0 ){
            async function getDataPlaces() {
                let response = await api.get(`places/date/${moment(selectedDate).format('YYYY-MM-DD')}`)
                let responseUbs = await api.get(`places`)
                setReservedTimes(response.data)
                setUBS(responseUbs.data)
            }
            getDataPlaces()
         }
    }, [selectedDate])

    async function handleSubmit() {
        let responseSchedule = await api.post(`schedule`, {
            name: name,
            roomId: selectedUBSPlaces,
            startTime: selectedDate,
            endTime: moment(selectedDate).add(1, 'hours'),
            createdBy: 1
        })

        if (responseSchedule.status == 200) {
            Swal.fire({
                title: "Sucesso",
                text: "A reserva foi incluída.",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#4EBDEF",
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/')
                }
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Erro inesperado, tente novamente!'
            })
        }
    }

    console.log(selectedDate)

    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div>
                <TitlePages name='Novo Agendamento' />
                <div className={style.containerPadrao}>
                    <div>
                        <span className={style.titleReserva}>Horário</span>
                        <div className={style.divRooms}>
                            <div style={{ width: '80%' }}>
                                <div className={style.horarioForms}>
                                    <BiPencil color='#343256' size={22} />
                                    <div style={{ display: "grid" }}>
                                        <p>Vacina:</p>
                                        <input className="inputPadrao" onChange={(e) => setName(e.target.value)} type="text" style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <div className={style.horarioForms2}>
                                    <IoMdTime color='#343256' size={22} />
                                    <div style={{ display: "grid" }}>
                                        <p>Dia</p>
                                        <input className="inputPadrao" type="datetime-local" style={{ width: '100%' }} onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={style.allCardsReserve}>
                                {selectedDate.length != 0 ?
                                    <div className={`${style.cardTimeReserve} ${style.cardTimeReserveSelect}`}>
                                        <div>
                                            <strong>{moment(selectedDate).format('HH:mm')}</strong>
                                            <RiCheckboxCircleFill color="#10CE5C" style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }} />
                                        </div>

                                        {Math.floor(moment.duration(moment(selectedDate, "HH:mm:ss").add(1, 'hours').diff(moment(selectedDate, "HH:mm:ss"))).asHours()) +
                                            "h" + moment.utc(moment(selectedDate, "HH:mm:ss").add(1, 'hours').diff(moment(selectedDate, "HH:mm:ss"))).format(" mm") + "m"}
                                    </div> : null}

                                <div className={style.allCardsReserve2}>
                                    {reservedTimes.map(x =>
                                        <div className={style.cardTimeReserve} style={{ background: '#DFDFDF' }}>
                                            <div>
                                                <strong>{moment(x.startTime).format('HH:mm')} - {moment(x.endTime).format('HH:mm')}</strong>
                                                <FcCancel style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }} />
                                            </div>

                                            {Math.floor(moment.duration(moment(moment(x.endTime).format('HH:mm'), "HH:mm:ss").diff(moment(moment(x.startTime).format('HH:mm'), "HH:mm:ss"))).asHours()) +
                                                "h" + moment.utc(moment(moment(x.endTime).format('HH:mm'), "HH:mm:ss").diff(moment(moment(x.startTime).format('HH:mm'), "HH:mm:ss"))).format(" mm") + "m"}
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {selectedDate.length != 0 ?
                        <div>
                            <span className={style.titleReserva}>Selecione a UBS</span>
                            <div className={style.divCards}>
                                {UBS.map(x => <div key={x.id} className={x.id == selectedUBS ? `${style.cardItens} ${style.cardSelected}` : `${style.cardItens}`}
                                    style={x.available == 0 ? { pointerEvents: 'none', opacity: '0.7', background: '#DFDFDF', boxShadow: 'unset' } : {}}
                                    onClick={() => { setSelectedUBS(x.id) }}
                                >
                                    <div className={style.infoItem}>
                                        <span><strong>{x.name}</strong></span>
                                    </div>
                                    {x.id == selectedUBS ? <RiCheckboxCircleFill color="#10CE5C" style={{ marginTop: '-2.8rem', marginLeft: 'auto' }} /> : <></>}
                                </div>)}
                            </div>
                        </div> : <div></div>}
                    {selectedUBS.length != 0 ? <div>
                        <span className={style.titleReserva}>Sala</span>
                        {UBSPlaces.length > 0 ? <div className={style.divCards}>
                            {UBSPlaces.map(x => <div  key={x.id}  className={x.id == selectedUBSPlaces ? `${style.cardItens} ${style.cardSelected}` : `${style.cardItens}`}
                                style={x.isActive == false ? { pointerEvents: 'none', opacity: '0.7', background: '#DFDFDF', boxShadow: 'unset' } : {}}
                                onClick={() => { setSelectedUBSPlaces(x.id) }}>
                                <div className={style.infoItem}>
                                    <span><strong>{x.name}</strong></span>
                                </div>
                                {x.id == selectedUBSPlaces ? <RiCheckboxCircleFill color="#10CE5C" style={{ marginTop: '-2.8rem', marginLeft: 'auto' }} /> : <></>}
                            </div>)}
                        </div> : <div className={style.infoEmpty}>Não há salas cadastradas para a UBS selecionada.</div>}
                    </div> : <div></div>}

                </div>
                {selectedUBSPlaces.length != 0 ?
                    <div className={style.buttonSubmit} >
                        <button onClick={() => handleSubmit()}>Submeter</button>
                    </div> : <div></div>}
            </div>
        </>
    )
}