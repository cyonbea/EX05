//Beatriz Teixeira exercicio 05 WEB DESIGN II 

//______________________________________________definir variáveis
let hora = new Date().getHours();
let branco = "#FFF";
let preto = "#000";
let parte = document.createElement("article");

$().ready(function () {
    // when page ready call jquery
    console.log("page ready");
    frase();
//________________________________________________________________hora x, escolhe light/dark 
 if( hora < 18 && hora > 6 ){
        console.log("light mode");
    $(":root").css({"--corfundo" : branco,"--cortexto": preto });  

} else{
    console.log("night mode");
}

//__________________________________________________________ carrega no h3 e aparece os "p", carrega no h2 e desaparece o
$("article p").hide(); //esconde os parágrafos dos artigos

//aparece/desaparece paragrafos conforme clique em h3
$("h3").on("click", function(){
    $(this).parent().children("p").toggle("show");
    $("h3").toggle($("h3").css("margin-bottom", "1em"))
});

$("aside p").hide();
//________________________________________________________________pequena animação aside
$("aside").mouseover(function(){
    $(this).animate({
        left: '0', opacity: '0.5'
    });
});

$("aside").mouseout(function(){
    $(this).animate({
        opacity: '1'
    });
});

//acrescentar novo elemento ; definir sources e atributos
let jesse = $('<img>'); //criar elemento IMG
$(jesse).attr({"width":"100%", "height":"auto", "src":"IMG/jesse.jpg"});
setTimeout(function(){$("aside").append(jesse);}, 3000); //acrescentar IMG no append

let menu = $('nav');
let titulos = Array.from($("section h3"));
let listaul = document.createElement("ul");//criar elemento (lista)

for(let i = 0; i < titulos.length; i++) {
    
    let listali = document.createElement("li");
    let link = document.createElement("a");
    link.innerHTML = titulos[i].textContent; //atribuir texto aos links
    link.setAttribute("href", "#" + titulos[i].id);//indicar a referência dos links
    
    $("nav").append(listaul); //adiciona à nav uma lista 
    $(listaul).append(listali); //adiciona à lista os elementos
    $(listali).append(link).attr("style", "display:block"); //dá link (append) e aparência (attr) aos elementos da lista 
}

$(listaul).hide();

// __________menu icon hamburguer toggle https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js 
function myFunction(x) { x.classList.toggle("change");}

//aparece e desaparece lista com click no menu icon
  $(".container").click( function(){ $(listaul).toggle("show"); });

//________________________________________fetch API
$("#btn").on("click", frase);
});

// url da API
let url = "https://www.breakingbadapi.com/api/quote/random";

function frase(){
    fetch(url)
    .then(function(resposta){
        console.log(resposta);
        return resposta.json();
    })
// dados[0].quote (array) https://www.w3schools.com/js/js_json_arrays.asp  (obrigado bruno)
    .then(function(dados){
        console.log(dados[0].quote);
        let parte = document.createElement("article");
    
        
        parte.innerHTML =`<h4>${dados[0].author}</h4>
        <p>${dados[0].quote}</p>`;
   
        $("#joke").append(parte);
      //se a quote for do Walter White, aparece mini foto
        if(parte.innerHTML.includes('Walter White')){
            console.log("walty yes" ,dados[0]);

            let waltquote = $('<img>');
            $(waltquote).attr({"width":"31px","height":"auto", "src":"IMG/walt2.jpg"})
            $(parte).append(waltquote);
        }else{

        };
        
    })

    .catch(function (error) {
      // if-else, ter uma opção para se a API não carrega
      console.log("quote erro", error);

      parte.innerHTML = `<h1>This is embarassing…</h1><p>Something broke bad when trying to get a quote</p>`;

      $("#joke").append(parte);
    });

    $("#joke p").click(function(){
        $(this).parent().children("article, p, h4, img").hide(); //desaparece a quote em que se carrega
    });

    


};

//fim javascript

