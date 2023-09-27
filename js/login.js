
let funcionarios=localStorage.getItem("array_funcionario")
let funcionarios_array = JSON.parse(funcionarios)

let funcionario_Atual =[]
window.addEventListener("load",()=>{
    funcionario_Atual= JSON.parse(localStorage.getItem("funcionario_Atual"))||[]
})

function atualizar(){
    localStorage.setItem("funcionario_Atual", JSON.stringify(funcionario_Atual))
}


/*var base_func= funcionarios_array.map(function(func){
return{
    email:func.email,
    senha:func.senha
}
})
*/
document.querySelector('#entrar').addEventListener('click',function(event){
    event.preventDefault()
    const emailCadastro  = document.querySelector('#emailLogin').value
    const senhaCadastro= document.querySelector('#senhaLogin').value
    for(var i=0; i<funcionarios_array.length;i++){
        var comparacao = funcionarios_array[i]
        console.log(comparacao)
        if(comparacao.email === emailCadastro && comparacao.senha === senhaCadastro && comparacao.tipoFunc==="Supervisor"){
            window.location.href="../pages/telaCadastroSupervisor.html"
            funcionario_Atual.push(comparacao)
            atualizar()
        }
        if(comparacao.email === emailCadastro && comparacao.senha === senhaCadastro && comparacao.tipoFunc==="Comum"){
            window.location.href="../pages/telaCadastroComum.html"
            funcionario_Atual.push(comparacao)
            atualizar()
        }
    }
})

