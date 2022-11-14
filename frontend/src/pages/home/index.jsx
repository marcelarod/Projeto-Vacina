import { useState, useEffect } from 'react'

import ButtonHome from "../../components/buttonHome";
import Spinner from '../../components/spinner';
import TitleHome from '../../components/titleHome';

import { useNavigate } from "react-router-dom";

import { BsCalendarDate, BsCalendarPlus, BsCalendarCheck } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineBarChart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg'

import { api } from "../../service/api";

import style from './home.module.css'

export default function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState([])

    const [isAdmin, setIsAdmin] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        async function getIdentify() {
            setLoading(true)
            let response = await api.get('identify')
            setName(response.data.name)
            setIsAdmin(response.data.isAdmin)
            sessionStorage.setItem('name', response.data.name);
            sessionStorage.setItem('isAdmin', response.data.isAdmin);
            sessionStorage.setItem('userId', response.data.userId);
            setLoading(false)
        }
        getIdentify();
    }, []);
    return (
        <>
            {loading == true ? (
                <div className="spinner">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div></div>)}
            <div className={style.main}>
                <div className={style.containerHome}>
                    <div className={style.settings}>
                        {isAdmin == true ?
                            <IoMdSettings onClick={() => navigate('/administration')} color="#5A58A8" size={35} /> : null}
                        <div className={style.nameFunction}>
                            <CgProfile color='#5A58A8' size={35} />
                            <div className={style.infos}>
                                <span><strong>{name}</strong></span>
                                <span>
                                    {isAdmin == true ? 'Administrador' : ' Usuário padrão'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.containerButtons}>
                        <div className={style.title}>
                            <TitleHome />
                        </div>

                        <div className={style.buttonsHome}>
                            {isAdmin == true ?
                                <>
                                    <ButtonHome icon={<BsCalendarDate color="#5A58A8" size={25} />} active={true} label='Agendamentos UBS' route='/ubs-schedule' />
                                    <ButtonHome icon={<AiOutlineBarChart color="#5A58A8" size={25} />} active={true} label='Estatísticas' route='/reports' />

                                </> : <>
                                    <ButtonHome icon={<BsCalendarDate color="#5A58A8" size={25} />} active={true} label='Meu calendário de vacinas' route='/calendar' />
                                    <ButtonHome icon={<BsCalendarCheck color="#5A58A8" size={25} />} active={true} label='Meus agendamentos' route='/my-schedule' />
                                    <ButtonHome icon={<BsCalendarPlus color="#5A58A8" size={25} />} active={true} label='Novo agendamento' route='/schedule' />
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}