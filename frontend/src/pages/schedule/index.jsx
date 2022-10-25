import { useState } from "react";
import moment from "moment";

import style from './schedule.module.css'

import Header from "../../components/header";

import { RiCheckboxCircleFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { BiPencil } from 'react-icons/bi'
import { IoMdTime } from 'react-icons/io'
import { FcCancel } from 'react-icons/fc'


export default function Schedule() {

    const navigate = useNavigate()

    const [selectedUBS, setSelectedUBS] = useState([])

    const [reservedTimes, setReservedTimes] = useState([])

    const [startedHour, setStartedHour] = useState([])
    const [finishHour, setFinishHour] = useState([])

    let UBS = [
        {
            id: 1,
            name: 'UBS-Granada',
            isActive: true,
            meetingRooms: 1
        },
        {
            id: 2,
            name: 'UBS-Martins',
            isActive: true,
            meetingRooms: 1
        },
    ]

    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div>
                <h1 className={style.containerTitle}>Novo Agendamento</h1>
                <div className={style.containerPadrao}>
                    <div>
                        <span className={style.titleReserva}>Selecione a UBS</span>
                        <div className={style.divCards}>
                            {UBS.map(x => <div className={x.id == selectedUBS ? `${style.cardItens} ${style.cardSelected}` : `${style.cardItens}`}
                                style={x.available == 0 || x.isActive == false ? { pointerEvents: 'none', opacity: '0.7', background: '#DFDFDF', boxShadow: 'unset' } : {}}
                            >
                                <div className={style.infoItem}>
                                    <span><strong>{x.name}</strong></span>
                                    <span>{x.meetingRooms == 0 || x.isActive == false ? 'UBS indisponível' : `${x.meetingRooms} sala(s) disponível(eis)`}</span>
                                </div>
                                {x.id == selectedUBS ? <RiCheckboxCircleFill color="#10CE5C" style={{ marginTop: '-3.5rem', marginLeft: 'auto' }} /> : <></>}
                            </div>)}
                        </div>
                    </div>

                    <div>
                        <span className={style.titleReserva}>Horário</span>
                        <div className={style.divRooms}>
                            <div style={{ width: '80%' }}>
                                <div className={style.horarioForms}>
                                    <BiPencil color='#343256' size={22} />
                                    <div style={{ display: "grid" }}>
                                        <p>Vacina</p>
                                        <input className="inputPadrao" type="text" style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <div className={style.horarioForms2}>
                                    <IoMdTime color='#343256' size={22} />
                                    <div style={{ display: "grid" }}>
                                        <p>Horário</p>
                                        <input className="inputPadrao" type="time" value={startedHour}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={style.allCardsReserve}>

                                <div className={`${style.cardTimeReserve} ${style.cardTimeReserveSelect}`}>
                                    <div>
                                        <strong>{startedHour} - {finishHour}</strong>
                                        <RiCheckboxCircleFill color="#10CE5C" style={{ marginBottom: '0.5rem', marginLeft: '0.5rem' }} />
                                    </div>

                                    {Math.floor(moment.duration(moment(finishHour, "HH:mm:ss").diff(moment(startedHour, "HH:mm:ss"))).asHours()) +
                                        "h" + moment.utc(moment(finishHour, "HH:mm:ss").diff(moment(startedHour, "HH:mm:ss"))).format(" mm") + "m"}
                                </div>

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
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2rem', gap: '0.5rem', marginBottom: "1rem" }}>
                </div>
            </div>
        </>
    )
}