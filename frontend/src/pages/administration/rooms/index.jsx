import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import style from '../../administration/adm.module.css'

import Table from 'rc-table';
import Swal from 'sweetalert2';
import { HiUsers } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa';

import TitlePages from "../../../components/titleConfigs";
import Label from "../../../components/label";
import AddButton from "../../../components/buttonAdd";
import { api } from "../../../service/api";

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export default function Rooms() {

    const navigate = useNavigate()
    const [selectedPlaces, setSelectedPlaces] = useState('')
    const [places, setPlaces] = useState([])
    const [rooms, setRooms] = useState([])
    const [newRooms, setNewRooms] = useState([])

    const [roomsError, setRoomsError] = useState('')

    const [loading, setLoading] = useState([])


    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        setLoading(true)
        let responsePlaces = await api.get('places')
        setPlaces(responsePlaces.data)

        let responseRooms = await api.get('rooms')
        setRooms(responseRooms.data)
        setLoading(false)
    }
    const columns = [
        {
            title: "",
            dataIndex: ["Places", "name"],
            key: "name",
            align: "left",
            width: '47%',

        },
        {
            title: "Sala",
            dataIndex: ["name"],
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
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><FaTrash color='#5A5A5A'  onClick={() => handleRemove(row.id)} size={14} /></div></div>
            )
        },
    ];

    async function handleRemove(id) {
        try {
            Swal.fire({
                title: 'Deletar a Sala?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#343256",
                cancelButtonColor: "#636e72",
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`/rooms/${id}`)
                    getData()
                }
            })
                .catch(e => Toast.fire({
                    icon: 'error',
                    title: `${e.response.data}`
                }))
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: `${error.response.data}`
            })
        }
    }

    function validation() {
        let validation = true
        if (selectedPlaces === '') {
            validation = false
            setRoomsError('Selecione um local')
        }
        if (newRooms === '') {
            validation = false
            setRoomsError('Digite uma sala')
        }
        return validation
    }

    async function addRooms() {
        if (validation()) {
            try {
                let response = await api.post('rooms', {
                    "name": newRooms,
                    "placesId":selectedPlaces
                })

                if (response.status == 200) {
                    Swal.fire({
                        title: 'Sala cadastrado',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#343256",
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false
                    })

                    setNewRooms('')
                    setSelectedPlaces('')
                    getData()
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: `${error.response.data}`
                })
            }
        }
    }



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
                                    {places?.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    {selectedPlaces.length > 0 ?
                        <div style={{ width: '100%' }}>
                            <Label>Sala</Label>
                            <div>
                                <div>
                                    <input className={style.inputPlaces} 
                                    value={newRooms}
                                        placeholder="Novo local"
                                        onChange={(e) => {
                                            setRoomsError("")
                                            setNewRooms(e.target.value)
                                        }}
                                    style={{ width: '100%' }} />
                                </div>
                                {roomsError ? (
                                    <div className="inputError">{roomsError}</div>
                                ) : null}
                            </div>
                        </div> : <></>}
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '10px' }}>
                        <AddButton onClick={() => addRooms()} />
                    </div>
                </div>
                {rooms.length > 0 ?
                    <div style={{ width: '100%', height: '52vh', overflow: 'auto', padding: '0.1rem', marginTop: '0.5rem' }}>
                        <Table
                            sticky={true}
                            columns={columns}
                            showHeader={true}
                            data={rooms}
                            rowKey="id"
                            emptyText="Nenhuma sala cadastrado!"
                        />
                    </div> : <div className="emptyArray">Nenhuma sala cadastrada para as UBS!</div>}
            </div>
        </>
    )
}