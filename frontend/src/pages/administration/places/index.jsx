import { useState, useEffect } from 'react'

import style from '../../administration/adm.module.css'

import Table from 'rc-table';
import Swal from 'sweetalert2';
import { GoPerson } from 'react-icons/go'
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

export default function Places() {


    const [newPlaces, setNewPlaces] = useState([])
    const [placesError, setPlacesError] = useState('')
    const [places, setPlaces] = useState([])

    const [loading, setLoading] = useState([])


    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        setLoading(true)
        let responseUsers = await api.get('places')
        setPlaces(responseUsers.data)
        setLoading(false)
    }

    async function handleRemove(id) {
        try {
            Swal.fire({
                title: 'Deletar Local?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#343256",
                cancelButtonColor: "#636e72",
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`/places/${id}`)
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
        if (places === '') {
            validation = false
            setPlacesError('Digite um local')
        }

        return validation
    }

    async function addPlaces() {
        if (validation()) {
            try {
                let response = await api.post('places', {
                    "name": newPlaces
                })

                if (response.status == 200) {
                    Swal.fire({
                        title: 'Local cadastrado',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#343256",
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false
                    })

                    setNewPlaces('')
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

    const columns = [
        {
            title: "",
            dataIndex: "name",
            key: "",
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
                <div className="actionBtn" style={{ display: 'flex', cursor: 'pointer', width: '1.5rem', height: '1.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}><FaTrash color='#5A5A5A' size={14} onClick={() => handleRemove(row.id)} /></div></div>)

        },
    ];

    return (
        <>
            <div className={style.admContainer}>
                <TitlePages icon={<GoPerson color='#5A58A8' size={21} />} title='Locais' />
                <div>
                    <Label>Local</Label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '0.25rem', width: '27vw' }}>
                        <input className={style.inputContainer} value={newPlaces}
                            placeholder="Novo local"
                            onChange={(e) => {
                                setPlacesError("")
                                setNewPlaces(e.target.value)
                            }}
                        />
                        <AddButton onClick={() => addPlaces()} />

                    </div>
                    {placesError ? (
                        <div className="inputError">{placesError}</div>
                    ) : null}
                </div>

                <div style={{ width: '27vw', overflow: 'auto', padding: '0.1rem' }}>
                    <Table
                        sticky={true}
                        columns={columns}
                        showHeader={false}
                        data={places}
                        rowKey="id"
                        emptyText="Nenhuma administrador cadastrada!"
                    />
                </div>
            </div>
        </>
    )
}