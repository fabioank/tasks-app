import './admin.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import {
    addDoc
    , collection
    , onSnapshot
    , query
    , orderBy
    , where
    ,doc
    ,deleteDoc
} from 'firebase/firestore';

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function loadTarefas() {

            const userDetail = localStorage.getItem('@detailUser');
            setUser(JSON.parse(userDetail));

            if (userDetail) {
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista);
                })
            }
        }

        loadTarefas();
    }, [])

    async function handleRegister(e) {
        e.preventDefault();
        if (tarefaInput === '') {
            alert("Digite a sua tarefa")
            return;
        }
        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log("Tarefa registrada com sucesso");
                setTarefaInput('');
            })
            .catch((error) => {
                console.log("Erro ao registrar" + error);
            })

    }

    async function handleLogOut() {
        await signOut(auth);
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef);
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa)
    }


    return (
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite a sua tarefa'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />
                <button className='btn-register' type='submit'>Registrar tarefa</button>
            </form>

            {tarefas.map((item) => (
                <article  key={item.id} className='list'>
                    <p>{item.tarefa}</p>

                    <div>
                        <button onClick={() => editTarefa(item)}>Editar</button>
                        <button className='btn-delete' onClick={() => deleteTarefa(item.id)}>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogOut}>Sair</button>

        </div>
    );
}
