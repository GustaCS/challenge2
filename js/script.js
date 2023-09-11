let inputImage = document.querySelector('.input-image');
let btnAdcImage = document.querySelector('.btnAdcImagens');
let imagePreview = document.querySelector('.preview');
let barraProgresso = document.querySelector('.barraProgresso');

function controlarProgresso(n){
    barraProgresso.style.width = `${n}%`; 
}



async function extrairTexto(img){
  const worker = Tesseract.createWorker({
    logger: function(m){
        console.log(m);
        controlarProgresso(m.progress * 100);
    }
  });
  
   await worker.load();
   await worker.loadLanguage('eng+por');
   await worker.initialize('eng+por');
   const { data: { text } } = await worker.recognize(img);

   var numeroRecibo = document.querySelector('#numeroRecibo')
   var nomeResponsavel = document.querySelector('#nomeResponsavel')
   var dataRecibo = document.querySelector('#dataRecibo')
   var totalPagar = document.querySelector('#totalPagar')
   var horarioFiscal = document.querySelector('#horario')

   let regexNum = /(Extrato)\s[0-9]*/
   let regexTotal = /TOTAL [R$]* [0-9]*,[0-9]*/
   let regexNome = /CUPOM FISCAL [\D]{16}/
   let regexHora = /[\d]{2}:[\d]{2}:[\d]{2}/
   let regexDtVencimento = /\d{2}[/]\d{2}[/]\d{4}/
   
   let dtVencimento = text.match(regexDtVencimento)
   let total = text.match(regexTotal)
   let nome = text.match(regexNome)
   let hora = text.match(regexHora)
   let resultNumeroRecibo = text.match(regexNum)
   
   numeroRecibo.value = (resultNumeroRecibo[0]).slice(7,20)
   nomeResponsavel.value = (nome[0])
   totalPagar.value = (total[0]).slice(5,30)
   dataRecibo.value =dtVencimento
   horarioFiscal.value = hora
   await worker.terminate();

   console.log(text)
}

function preencherCampo(){

}

btnAdcImage.addEventListener('click' , function(){
    inputImage.click();
})

inputImage.addEventListener('change' , function(){
    let fileImage = inputImage.files[0];

    imagePreview.src = URL.createObjectURL(fileImage);

    try{
      extrairTexto(fileImage);

    }catch(e){
        console.log('erro' , e);
    }

;})

