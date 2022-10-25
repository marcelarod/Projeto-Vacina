import { useNavigate } from "react-router-dom";

import Calendar from "../../components/calendar"
import Header from "../../components/header"
import style from "./calendar.module.css"

export default function CalendarVaccination() {
  const navigate = useNavigate()

  return (
    <div className={style.main}>
      <Header funcao={() => navigate('/')} />
      <h1>Meu calendário de vacina</h1>
      <div className={style.calendar}>
        <Calendar />
      </div>
    </div>
  )
}