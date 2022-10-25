import React, { useState } from "react";

import style from '../../administration/adm.module.css'

import Table from 'rc-table';
import { GoPerson } from 'react-icons/go'
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';

import TitlePages from "../../../components/titleConfigs";
import Label from "../../../components/label";
import AddButton from "../../../components/buttonAdd";

export default function Places() {

    const [newAdmin, setNewAdmin] = useState([])

    let UBSLocais = [
        {
            id: 1,
            locais: 'UBS-Granada',
        },
        {
            id: 2,
            locais: 'UBS-Granada2',
        },
        {
            id: 3,
            locais: 'UBS-Granada3',

        },
        {
            id: 4,
            locais: 'UBS-Granada4',
        },
        {
            id: 5,
            locais: 'UBS-Granada5',
        },
    ]


    const columns = [
        {
            title: "Area",
            dataIndex: ["locais"],
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
                <TitlePages icon={<GoPerson color='#5A58A8' size={21} />} title='Locais' />
                <div>
                    <Label>Local</Label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '0.25rem', width: '27vw' }}>
                        <input className={style.inputMain} value={newAdmin}
                            placeholder="Novo local"
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
                        data={UBSLocais}
                        rowKey="id"
                        emptyText="Nenhuma administrador cadastrada!"
                    />
                </div>
            </div>
        </>
    )
}