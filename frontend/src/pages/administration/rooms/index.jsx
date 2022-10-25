import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from '../../administration/adm.module.css'

import Table from 'rc-table';

import { HiUsers } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri'

import TitlePages from "../../../components/titleConfigs";
import Label from "../../../components/label";
import AddButton from "../../../components/buttonAdd";

export default function Rooms() {

    const navigate = useNavigate()
    const [selectedPlaces, setSelectedPlaces] = useState('')

    let UBS = [
        {
            id: 1,
            locais: 'UBS-Granada',
            sala: 'Sala 01',
            isActive: true,
        },
        {
            id: 2,
            locais: 'UBS-Granada2',
            sala: 'Sala 02',
            isActive: true,
        },
        {
            id: 3,
            locais: 'UBS-Granada3',
            sala: 'Sala 03',
            isActive: true,
        },
        {
            id: 4,
            locais: 'UBS-Granada4',
            sala: 'Sala 04',
            isActive: true,
        },
        {
            id: 5,
            locais: 'UBS-Granada',
            sala: 'Sala 05',
            isActive: true,
        },
    ]


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
            title: "Locais",
            dataIndex: ["locais"],
            key: "name",
            align: "left",
            width: '47%',

        },
        {
            title: "Sala",
            dataIndex: ["sala"],
            key: "name",
            align: "left",
            width: '32%',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            align: "right",
            with: '10%',
            render: (value, row, index) => (<div style={{ display: 'flex', height: ' 1.2rem', fontSize: '0.8rem', alignItems: 'center' }}>
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><RiPencilFill color='#5A5A5A' size={14} /></div>&nbsp;&nbsp;
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><FaTrash color='#5A5A5A' size={14} /></div></div>
            )
        },
    ];


    return (
        <>
            <div className={style.admContainer}>
                <TitlePages icon={<HiUsers color='#5A58A8' size={21} />} title='Salas' funcao={() => navigate('/')} />
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%' }} >
                        <Label>Local</Label>
                        <div>
                            <div>
                                <select className="selectPadrao" value={selectedPlaces} multiple={false} onChange={(e) => { setSelectedPlaces(e.target.value) }}>
                                    <option value="">Todos</option>
                                    {UBSLocais?.map(x => <option key={x.id} value={x.id}>{x.locais}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    {selectedPlaces.length > 0 ?
                        <div style={{ width: '100%' }}>
                            <Label>Sala</Label>
                            <div>
                                <div>
                                    <input className={style.inputPlaces} type="text" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div> : <></>}
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '10px' }}>
                        <AddButton />
                    </div>
                </div>
                {UBS.length > 0 ?
                    <div style={{ width: '100%', height: '52vh', overflow: 'auto', padding: '0.1rem', marginTop: '0.5rem' }}>
                        <Table
                            sticky={true}
                            columns={columns}
                            showHeader={true}
                            data={UBS}
                            rowKey="id"
                            emptyText="Nenhuma sala cadastrado!"
                        />
                    </div> : <div className="emptyArray">Nenhuma sala cadastrada para a UBS!</div>}
            </div>
        </>
    )
}