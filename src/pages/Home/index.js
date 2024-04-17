import { useState } from "react";
import './home.css';
import { Link } from "react-router-dom";
import Register from "../Register";

import {auth} from '../../firebaseConnection';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(() =>{
                navigate('/admin', {replace: true})
            })
            .catch(() =>{
                console.log("Erro ao fazer o login");
            })
        }else{
            alert("Por favor, preencha os campos!");
        }
    }
    return (
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <span>Gerencie a sua agenda de forma fácil</span>

            <form className="form" onSubmit={handleLogin}>
                <input type="text"
                    placeholder="Digite o seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>

                <input type="password"
                    placeholder="Digite a sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>

                    <button type="submit">Acessar</button>
            </form>

            <Link to="/register" className="button-link">
            Não possui uma conta? Cadastre-se!
            </Link>
        </div>
    );
}