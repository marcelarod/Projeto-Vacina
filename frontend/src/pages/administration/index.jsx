import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoPerson } from 'react-icons/go'
import { MdPlace } from 'react-icons/md'
import { AiFillSetting } from 'react-icons/ai';
import { MdOutlineAddLocationAlt } from 'react-icons/md';

import Header from "../../components/header";

import Adms from "./adm/index";
import Places from "./places";
import Rooms from "./rooms";

import style from './adm.module.css'
export default function HomeAdm() {

    const [selectedItem, setSelectedItem] = useState('administradores')
    const navigate = useNavigate()

    return (
        <>
            <Header funcao={() => navigate('/')} />
            <div className={style.main}>
                <div className={style.rightMenu}>
                    <div className={style.titleMenu}>
                        <AiFillSetting color="#5A58A8" size={25} />  <p>Painel Administrativo</p>
                    </div>
                    <div onClick={() => setSelectedItem('administradores')} className={selectedItem == 'administradores' ?
                        `${style.itemMenu} ${style.selectedItemMenu}` : `${style.itemMenu}`}> <GoPerson size={18} /> Administradores</div>
                    <div onClick={() => setSelectedItem('places')} className={selectedItem == 'places' ?
                        `${style.itemMenu} ${style.selectedItemMenu}` : `${style.itemMenu}`}> <MdPlace size={18} /> Locais</div>
                    <div onClick={() => setSelectedItem('room')} className={selectedItem == 'room' ?
                        `${style.itemMenu} ${style.selectedItemMenu}` : `${style.itemMenu}`}> <MdOutlineAddLocationAlt size={18} /> Salas</div>
                </div>

                <div>
                    {selectedItem == 'administradores' ?
                        <Adms />
                        : selectedItem == 'places' ?
                            <Places />
                            : selectedItem == 'room' ?
                                <Rooms />
                                : null
                    }
                </div>
            </div>
        </>
    )
}