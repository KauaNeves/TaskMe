import { useNavigate } from "react-router-dom";
import { UseAuth } from "../hooks/AuthContext";
 
import Ilustration from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';

import '../styles/auth.scss';
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = UseAuth();
    const [roomCode, setRoomCode] = useState('');

    async function HanddleNewRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        navigate('/rooms/new')
    }

        async function handleJoinRoom(event: FormEvent) {
            event.preventDefault()

            if (roomCode.trim() === '') {
                return;
            }

            const roomRef = await database.ref(`rooms/${roomCode}`).get();

            if (!roomRef.exists()) {
                alert('Room does not exists.')
                return
            }

            if (roomRef.val().endedAt) {
                alert('Room already closed.')
                return
            }

            navigate(`/rooms/${roomCode}`)
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
                <button onClick={HanddleNewRoom} className='create-room'>
                    <img src={GoogleImg} alt='Logo Google'></img>
                    Crie Sua Sala Com Google
                </button>
                <div className='separator'>Ou Entre Em Sua Sala</div>
                <form onSubmit={handleJoinRoom}>
                    <input
                    type='text'
                    placeholder='Digite o código da sala'
                    onChange={event => setRoomCode(event.target.value)}
                    value={roomCode}
                    />
                    <Button type='submit'>Entrar Na Sala</Button>
                </form>
            </main>
        </div>
    )
}