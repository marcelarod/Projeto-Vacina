import { useState, useEffect } from 'react';

// import moment from "moment";
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

import style from "./calendar.module.css"

export default function Calendar() {

  moment.locale('pt-br')

  const [calendar, setCalendar] = useState([])
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

  let vacinas = [
    {
        id:1,
        title: 'Vacina Covid',
        local: 'USB-Granada',
        date: '2022-10-10',
        time: '09:30'
    },
    {
        id:2,
        title: 'Vacina Febre',
        local: 'USB-Granada',
        date: '2022-10-17',
        time: '10:30'
    },
    {
        id:3,
        title: 'Vacina Poli',
        local: 'USB-Granada',
        date: '2022-10-28',
        time: '15:00'
    },
    {
        id:4,
        title: 'Vacina variola',
        local: 'USB-Granada',
        date: '2022-10-30',
        time: '17:00'
    },
    {
        id:5,
        title: 'Vacina tetano',
        local: 'USB-Granada',
        date: '2022-11-01',
        time: '08:30'
    },
    {
        id:6,
        title: 'Vacina tetano',
        local: 'USB-Granada',
        date: '2022-11-05',
        time: '08:30'
    },
    {
        id:7,
        title: 'Vacina tetano',
        local: 'USB-Granada',
        date: '2022-11-09',
        time: '08:30'
    },
    {
        id:8,
        title: 'Vacina tetano',
        local: 'USB-Granada',
        date: '2022-11-10',
        time: '08:30'
    }
]


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

                          {vacinas.filter(x => x.date == moment(day).format('YYYY-MM-DD')).map(y =>
                            <div>
                              <div className={y.date < moment(new Date()).format('YYYY-MM-DD') ? `${style.events} ${style.eventsBefore}`
                                : `${style.events} ${style.eventsAfter}`}>
                                <span>{y.title}</span>
                                <span>{y.local}</span>
                                <span>{y.time}</span>
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