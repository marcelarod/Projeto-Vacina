import { useState, useEffect } from 'react';

// import moment from "moment";
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import {api} from '../../service/api'

import style from "./calendar.module.css"

export default function Calendar() {

  moment.locale('pt-br')

  const [calendar, setCalendar] = useState([])
  const [vacinas, setVacinas] = useState([])
  const [value, setValue] = useState(moment())

  const startDay = value.clone().startOf("month").startOf("week")
  const endDay = value.clone().endOf("month").endOf("week")

  const startOfMonth = value.clone().startOf('month')
  const endOfMonth = value.clone().endOf('month');

  useEffect(() => {
    const day = startDay.clone().subtract(1, "day")
    const a = []

    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7).fill(0).map(() => day.add(1, "day").clone())
      )
    }

    setCalendar(a)
  }, [value])

  function currMonthName() {
    return value.format("MMMM")
  }

  function currYear() {
    return value.format("YYYY")
  }

  function prevMonth() {
    return value.clone().subtract(1, "month")
  }

  function nextMonth() {
    return value.clone().add(1, "month")
  }
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
      let response = await api.get('schedule')
      setVacinas(response.data)
  }  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div className={style.currentMonthYear}>
          <div style={{ cursor: 'pointer', display: 'flex' }}>
            <IoChevronBack color="#5A58A8" onClick={() => setValue(prevMonth)} />
          </div>

          <div style={{ display: 'flex', gap: '0.2rem' }}>
            <span>{currMonthName().charAt(0).toUpperCase() + currMonthName().slice(1)},</span>
            <span>{currYear()}</span>
          </div>

          <div style={{ cursor: 'pointer', display: 'flex' }}>
            <IoChevronForward color="#5A58A8" onClick={() => setValue(nextMonth)} />
          </div>
        </div>

      </div>

      <div className={style.calendar}>

        <div className={style.calendarHeader}>
          <div className={style.weekDayCard}>
            <span>Domingo</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Segunda</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Terça</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Quarta</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Quinta</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Sexta</span>
          </div>
          <div className={style.weekDayCard}>
            <span>Sábado</span>
          </div>
        </div>

        {
          calendar.map(week => <div className={style.weekRow}>
            {
              week.map(day => {
                return day.isBefore(startOfMonth) || day.isAfter(endOfMonth) ?
                  <div className={`${style.dayCard} ${style.disabled}`}>
                  </div>
                  : <div className={style.dayCard} >
                      <div>
                          <div className={style.day} >
                            <span>{day.format("D")}</span>
                            
                          </div>

                          {vacinas.filter(x => moment(x.startTime).format('YYYY-MM-DD') == moment(day).format('YYYY-MM-DD')).map(y =>
                            <div>
                              <div className={y.isVaccinated == false ? `${style.events} ${style.eventsBefore}`
                                : `${style.events} ${style.eventsAfter}`}>
                                <span>{y.name}</span>
                                <span>{y.Rooms.Places.name} - {y.Rooms.name}</span>
                                <span>{moment(y.startTime).format('HH:mm')}</span>
                              </div>
                            </div>
                          )}
                      </div> 
                  </div>
              })
            }
          </div>)
        }
      </div>
    </>
  )
}