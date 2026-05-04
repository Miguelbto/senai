

export default function ListaDeTarefas(){
    function handleAdicionar (){
        const novaTarefa = {
            id: Date.now().toString()
            nome: tarefa,
            prioridade: prioridade.trim() || "Normal", // se vazio
        }

        setTarefas([...tarefas, novaTarefa])

        setTarefa("")
        setPrioridade("")
    }
}