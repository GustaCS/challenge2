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
   var dataVencimento = document.querySelector('#dataVencimento')

   let regexNum = /(Extrato)\s[0-9]*/
   let resultNumeroRecibo = text.match(regexNum)
   let regexTotal = /TOTAL [R$]* [0-9]*,[0-9]*/
   let regexNome = /CUPOM FISCAL [\D]{16}/
  
   let dtVencimento = text.slice(93,106)
   let regexDtVencimento = /[\d]{2}[/][\d]{2}[/][\d]{4}/
   let dtVencimentoFinal = dtVencimento.match(regexDtVencimento)
   let total = text.match(regexTotal)
   let nome = text.match(regexNome)

   numeroRecibo.value = (resultNumeroRecibo[0]).slice(7,20)
   nomeResponsavel.value = (nome[0])
   dataRecibo.value = text.slice(50,60)
   dataVencimento.value = dtVencimentoFinal
   totalPagar.value = (total[0]).slice(5,30)
   await worker.terminate();

   console.log(text)
  console.log(dtVencimentoFinal)


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

