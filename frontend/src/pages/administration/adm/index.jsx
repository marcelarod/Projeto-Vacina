import React, { useState } from "react";

import style from '../../administration/adm.module.css'

import Table from 'rc-table';
import Swal from 'sweetalert2';
import { GoPerson } from 'react-icons/go'
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';

import TitlePages from "../../../components/titleConfigs";
import Label from "../../../components/label";
import AddButton from "../../../components/buttonAdd";

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    width: "22rem",
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default function Administradores() {

    const [loading, setLoading] = useState([])
    const [newAdmin, setNewAdmin] = useState([])

    let adm = [
        {
            id: 1,
            name: 'Marcela Andrade1',
        },
        {
            id: 2,
            name: 'Marcela Andrade2',
        },
        {
            id: 3,
            name: 'Marcela Andrade3',
        },
        {
            id: 4,
            name: 'Marcela Andrade4',
        },
    ]



    const columns = [
        {
            title: "Area",
            dataIndex: ["name"],
            key: "name",
            align: "left",
            width: '95%',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            align: "right",
            with: '10%',
            render: (value, row, index) => (<div style={{ display: 'flex', height: ' 1.2rem', fontSize: '0.8rem', alignItems: 'center' }}>
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><RiPencilFill color='#5A5A5A' size={14} /></div>&nbsp;&nbsp;
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><FaTrash color='#5A5A5A' size={14} /></div></div>)

        },
    ];

    return (
        <>
            <div className={style.admContainer}>
                <TitlePages icon={<GoPerson color='#5A58A8' size={21} />} title='Administradores' />
                <div>
                    <Label>Administrador</Label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '0.25rem', width: '27vw' }}>
                        <input className={style.inputMain} value={newAdmin}
                            placeholder="Novo Administrador"
                            onChange={(e) => {
                                setNewAdmin(e.target.value)
                            }}
                        />
                        <AddButton />
                    </div>
                </div>

                <div style={{ width: '27vw', overflow: 'auto', padding: '0.1rem' }}>
                    <Table
                        sticky={true}
                        columns={columns}
                        showHeader={false}
                        data={adm}
                        rowKey="id"
                        emptyText="Nenhuma administrador cadastrada!"
                    />
                </div>
            </div>
        </>
    )
}