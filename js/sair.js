document.querySelector('.sair').addEventListener('click',voltarLogin)

function voltarLogin (){
    localStorage.removeItem('funcionario_Atual')
    window.location.href="../index.html"
}