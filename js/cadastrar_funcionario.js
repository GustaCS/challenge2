let inputFuncComum = document.querySelector("#func_comum")
let inputFuncSuperior = document.querySelector("#func_superior")

inputFuncComum.addEventListener("change", atualizarRadio)
inputFuncSuperior.addEventListener("change", atualizarRadio)

let tipoFunc=""
function atualizarRadio(){
    let func_comum = inputFuncComum.checked

    if(func_comum) {
        tipoFunc= "Comum"
    }else{
        tipoFunc="Supervisor"
    }
}

document.querySelector("#button_cadastro").addEventListener("click",cadastrar_funcionario)
window.addEventListener("load",()=>{
    array_funcionario= JSON.parse(localStorage.getItem("array_funcionario"))||[]
})

function atualizar(){
    localStorage.setItem("array_funcionario", JSON.stringify(array_funcionario))
}

function cadastrar_funcionario(){
    const nome  = document.querySelector('#nomeFuncionario').value
    const email= document.querySelector('#emailFuncionario').value
    const senha = document.querySelector("#senhaFuncionario").value

    const base_funcionario = {
    id:Date.now(),
    nome,
    email,
    senha,
    tipoFunc
    }
if(nome !=="" && email !=="" && senha !=="" &&tipoFunc !==""){
    array_funcionario.push(base_funcionario)
atualizar()
}
}