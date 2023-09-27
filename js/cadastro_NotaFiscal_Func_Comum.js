document.querySelector("#salvar").addEventListener("click",cadastrar)

let array_registro =[]

window.addEventListener("load",()=>{
    array_registro= JSON.parse(localStorage.getItem("array_registro"))||[]
    atualizar()

})

function atualizar(){
    localStorage.setItem("array_registro", JSON.stringify(array_registro))
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