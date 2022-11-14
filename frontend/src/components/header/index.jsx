import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { CgProfile } from 'react-icons/cg'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineHome } from 'react-icons/ai'

import style from "./header.module.css"

export default function Header(props) {
    const [isAdmin, setIsAdmin] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        async function getIdentify() {
            const admin = sessionStorage.getItem('isAdmin');
            const isName = sessionStorage.getItem('name');
            setName(isName)
            setIsAdmin(admin)
        }
        getIdentify();
    });

    return (
        <div className={style.containerHeader}>
            <div className={style.logo}>
                <IoIosArrowBack onClick={props.funcao} color='#5A58A8' size={25} />
            </div>
            <div className={style.infoUser}>
                <div className={style.infos}>
                    <Link to='/'>< AiOutlineHome color='#5A58A8' size={35} /></Link>
                </div>
                <CgProfile color='#5A58A8' size={35} />
                <div className={style.nameFunction}>
                    <span><strong>{name}</strong></span>
                    <span>
                        {isAdmin == 'true' ? 'Administrador' : ' Usuário padrão'}
                    </span>
                </div>
            </div>
        </div>
    )
}