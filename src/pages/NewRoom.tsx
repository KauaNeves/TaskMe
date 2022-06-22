import Ilustration from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { UseAuth } from "../hooks/AuthContext";

export function NewRoom() {
    const navigate = useNavigate()
    const { user } = UseAuth()

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {

        event.preventDefault();

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img className='page' src={Ilustration} alt="Perguntas e Respostas"></img>
                <strong>1 Site</strong>
                <p>teste</p>
            </aside>
            <main className='main-content'>
                <img className='logo' src={LogoImg} alt='Logo'></img>
                <h2>Criar uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input
                    type='text'
                    placeholder='Digite o código da sala'
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
                    />
                    <Button type='submit'>Criar Sala</Button>
                </form>
                <p className='p'>Deseja entrar em uma sala existente?<Link to='/'>clique aqui</Link></p>
            </main>
        </div>
    )
}