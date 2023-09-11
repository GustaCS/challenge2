document.querySelector("#salvar").addEventListener("click",cadastrar)

let array_registro =[]

window.addEventListener("load",()=>{
    array_registro= JSON.parse(localStorage.getItem("array_registro"))||[]
    atualizar()

})

function atualizar(){
    document.querySelector("#tabela_verificacao").innerHTML =""
    localStorage.setItem("array_registro", JSON.stringify(array_registro))
    array_registro.forEach((registro)=>{
        document.querySelector("#tabela_verificacao").innerHTML += createCard(registro)
    })
}

function cadastrar(){
    const numeroRecibo  = document.querySelector('#numeroRecibo').value
    const nomeResponsavel= document.querySelector('#nomeResponsavel').value
    const dataRecibo = document.querySelector("#dataRecibo").value
    const horario = document.querySelector("#horario").value
    const totalPagar = document.querySelector("#totalPagar").value
    

    
    const base_consumos = {
        id:Date.now(),
        numeroRecibo,
        nomeResponsavel,
        dataRecibo,
        horario,
        totalPagar
    }
    if(numeroRecibo !=="" && nomeResponsavel !=="" && dataRecibo !=="" &&horario !=="" && totalPagar !==""){
    array_registro.push(base_consumos)
    atualizar()
    }
}

function apagar(id){
    array_registro = array_registro.filter((tarefa)=>{
        return tarefa.id != id
    })
    atualizar()
}
function createCard(base_consumos){
    return `
    <tr>
    <td>${base_consumos.numeroRecibo}</td>
    <td>${base_consumos.nomeResponsavel}</td>
    <td>${base_consumos.dataRecibo}</td>
    <td>${base_consumos.horario}</td>
    <td>${base_consumos.totalPagar}</td>
    <td>
      <button type="button" onClick ="apagar(${base_consumos.id})" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exclusao_modal">Excluir</button>
      </td>
  </tr>`//template literals
}
