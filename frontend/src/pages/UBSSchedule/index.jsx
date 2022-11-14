import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Header from "../../components/header";
import Spinner from '../../components/spinner';
import { api } from '../../service/api'
import TitlePages from '../../components/titlePages';
import MaterialTable from 'material-table';
import { tableIcons } from "../../assets/icons-table/icons";
import { FaFilter } from 'react-icons/fa'

import moment from 'moment-timezone';

import style from './UBSSchedule.module.css'
import ModalStatusUBS from '../../components/modal';
export default function UBSSchedule() {

    const navigate = useNavigate()
    const [vacinas, setVacinas] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [vacina, setVacina] = useState([])

    const [loading, setLoading] = useState([])
    const [filtering, setFiltering] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        setLoading(true)
        let response = await api.get('schedule')
        setVacinas(response.data)
        setLoading(false)
    }

    async function openModal(id) {
        setIsOpen(true)
        let response = await api.get(`schedule/${id}`)
        setVacina(response.data)
    }

    const columns = [
        {
            title: "Paciente",
            field: "row.Users.name",
            render: (rowData) => (<div>{rowData.Users.name}</div>)
        },
        {
            title: "Vacina",
            field: "name",
        },
        {
            title: "Local",
            field: "row.Rooms.Places.name",
            render: (rowData) => (<div>{rowData.Rooms.Places.name}</div>)
        },
        {
            title: "Sala",
            field: "row.Rooms.name",
            render: (rowData) => (<div>{rowData.Rooms.name}</div>)
        },
        {
            title: "Status",
            field: "isVaccinated",
            lookup: { true: 'Vacina aplicada', false: 'Vacina não aplicada' },
            render: (rowData) => (<div>{rowData.isVaccinated == true ? 'Vacina aplicada' : 'Vacina não aplicada'}</div>)
        },
        {
            title: <div onClick={() => { setFiltering(currentFilter => !currentFilter) }}><FaFilter fontSize="medium" /></div>,
            width: "5%",
            align: "right",
        }
    ]

    console.log(vacinas)
    return (
        <>
            {loading == true ? (
                <div className="spinner">
                    <Spinner animation="border" />
                </div>
            ) : (<div></div>)}
            <Header funcao={() => navigate('/')} />
            <div>
                <TitlePages name='Agendamentos UBS' />
                <div className={style.containerPadrao}>
                    <div className={style.container}>
                        <MaterialTable
                            columns={columns}
                            data={vacinas}
                            icons={tableIcons}
                            title=''
                            onRowClick={(event, rowData) => { openModal(rowData.id) }}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: "Nenhum produto disponível",
                                },
                                toolbar: {
                                    searchPlaceholder: "Buscar",
                                    exportTitle: '',
                                },

                            }}
                            options={{
                                exportButton: true,
                                filtering: filtering,
                                search: true,
                                maxBodyHeight: '50vh',
                                minBodyHeight: '50vh',
                                rowStyle: {
                                    fontSize: '0.9rem',

                                }, headerStyle: {
                                    backgroundColor: '#5A58A8',
                                    color: '#FFF',

                                }, headerStyleHover: {
                                    backgroundColor: 'var(--dark-blue)',
                                    color: '#FFF',
                                },
                                paging: false
                            }}
                        />
                    </div>
                </div>
                <ModalStatusUBS
                    vacina={vacina}
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen} />
            </div>
        </>
    )
}