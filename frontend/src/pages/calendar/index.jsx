import { useNavigate } from "react-router-dom";

import Calendar from "../../components/calendar"
import Header from "../../components/header"
import style from "./calendar.module.css"
import TitlePages from '../../components/titlePages';

export default function CalendarVaccination() {
  const navigate = useNavigate()

  return (
    <div className={style.main}>
      <Header funcao={() => navigate('/')} />
      <TitlePages name='Meu calendário de vacina<' />
      <div className={style.calendar}>
        <Calendar />
      </div>
    </div>
  )
}