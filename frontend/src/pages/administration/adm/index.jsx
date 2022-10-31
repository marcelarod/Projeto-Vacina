import { useState, useEffect } from 'react'

import style from '../../administration/adm.module.css'

import Table from 'rc-table';
import Swal from 'sweetalert2';
import { GoPerson } from 'react-icons/go'
import { FaTrash } from 'react-icons/fa';
import { AutoComplete } from 'rsuite'

import TitlePages from "../../../components/titleConfigs";
import Label from "../../../components/label";
import AddButton from "../../../components/buttonAdd";
import {api} from "../../../service/api";

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
    const [selectedAdminName, setSelectedAdminName] = useState('')
    const [adminId, setAdminId] = useState('')

    const [adminError, setAdminError] = useState('')

    const [admins, setAdmins] = useState('')

    const [users, setUsers] = useState([])
    const [usersData, setUsersData] = useState([])
    
    const [loading, setLoading] = useState([])

    
    useEffect(() => {

        async function getData() {
            setLoading(true)
            let responseUsers = await api.get('users')
            let usersArray = []
            responseUsers.data.map(x => {
                usersArray.push({ label: x.name, value: x.name })
            })

            setUsers(usersArray)
            setUsersData(responseUsers.data)

            await getAdmins()
            setLoading(false)
        }
     getData() 
    }, [])

    async function getAdmins() {
        setLoading(true)

        let adminsArray = []
        let responseAdmins = await api.get('admins')

        responseAdmins.data.map(x => {
            adminsArray.push({ name: x.name, id: x.id })
        })

        setAdmins(adminsArray)
        setLoading(false)
    }

    const columns = [
         {
            title: "",
            dataIndex: "name",
            key: "file",
            align: "left",
            width: 1000,
        },
        {
            title: "",
            dataIndex: "",
            key: "file",
            align: "left",
            width: 50,
            render: (value, row, id) => {
                return (<div onClick={() => handleRemoveAdmin(row.id)} style={{ display: 'flex', cursor: 'pointer' }}><FaTrash /></div>)
            }
        },
    ];

    function handleRemoveAdmin(id) {
        Swal.fire({
            title: 'Deletar Administrador?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#343256",
            cancelButtonColor: "#636e72",
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.put(`/users/${id}`, {
                        isAdmin: false
                    })
                    getAdmins()
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    async function addAdmin() {
        let actualAdmins = [...admins]

        if (actualAdmins.filter(x => x.id == adminId).length != 0) {
            Toast.fire({
                icon: 'error',
                title: 'Administrador já adicionado.'
            })
        } if (adminId === '') {
            setAdminError('Selecione um usuário válido')
        } else {
            try {
                let responseAdmin = await api.put(`/users/${adminId}`, {
                    isAdmin: true
                })

                if (responseAdmin.status == 200) {
                    Swal.fire({
                        title: 'Administrador cadastrado',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#343256",
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false
                    })
                    getAdmins()
                    setSelectedAdminName('')
                }

            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: `${error.response.data}`
                })
            }
        }
    }
    function handleSelectedAdmin(value) {
        let filteredAdmin = usersData.filter(x => x.name == value)
        if (filteredAdmin.length != 0) {
            setAdminId(filteredAdmin[0].id)
        }
        setSelectedAdminName(value)
    }

    return (
        <>
            <div className={style.admContainer}>
                <TitlePages icon={<GoPerson color='#5A58A8' size={21} />} title='Administradores' />
                <div>
                    <Label>Administrador</Label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '0.25rem', width: '27vw' }}>
                        <AutoComplete
                                style={{ width: '100%' }}
                                data={users}
                                className={style.inputMain}
                                value={selectedAdminName}
                                onChange={(value) => {
                                    setAdminError('')
                                    setAdminId('')
                                    handleSelectedAdmin(value)
                                }}
                            />
                        <AddButton onClick={() => addAdmin()} />
                    </div>
                </div>

                <div style={{ width: '27vw', overflow: 'auto', padding: '0.1rem' }}>
                    <Table
                        sticky={true}
                        columns={columns}
                        showHeader={false}
                        data={admins}
                        rowKey="id"
                        emptyText="Nenhuma administrador cadastrada!"
                    />
                </div>
            </div>
        </>
    )
}