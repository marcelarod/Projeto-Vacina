import ButtonHome from "../../components/buttonHome";
import style from './home.module.css'
import { useNavigate } from "react-router-dom";

import { BsCalendarDate, BsCalendarPlus, BsCalendarCheck } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

import TitleHome from '../../components/titleHome';

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className={style.main}>
            <div className={style.containerHome}>
                <div className={style.settings}>
                    <IoMdSettings onClick={() => navigate('/administration')} color="#5A58A8" size={40} />
                    <div className={style.nameFunction}>
                        <span><strong>Marcela Rodrigues</strong></span>
                        <span>
                            Usuário padrão
                        </span>
                    </div>
                </div>
                <div className={style.containerButtons}>
                    <div className={style.title}>
                        <TitleHome />
                    </div>

                    <div className={style.buttonsHome}>
                        <ButtonHome icon={<BsCalendarDate color="#5A58A8" size={25} />} active={true} label='Meu calendário de vacinas' route='/calendar' />
                        <ButtonHome icon={<BsCalendarCheck color="#5A58A8" size={25} />} active={true} label='Meus agendamentos' route='/my-schedule' />
                        <ButtonHome icon={<BsCalendarPlus color="#5A58A8" size={25} />} active={true} label='Novo agendamento' route='/schedule' />
                    </div>

                </div>
            </div>
        </div>
    )
}