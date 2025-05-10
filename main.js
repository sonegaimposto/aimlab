const menuscreen = document.getElementById("menu");
const gamescreen = document.getElementById("gamescreen");

const startButton = document.getElementById("start-button");
const options = document.querySelectorAll(".menu-slider");
const sounds = document.querySelectorAll(".sound-button");
var selectedSound = null;


options.forEach((element = HTMLInputElement) => {
    element.oninput = () => {
        element.parentElement.querySelector("p").innerText = `${element.value}`
    }
});
sounds.forEach((element, index) => {
    element.addEventListener("click", event => {
        selectedSound = `assets/${index}.mp3`;
        new Audio(selectedSound).play();
    })
})


startButton.addEventListener("click", event => {

    // Setar opções
    let speed = options[0].value;
    let size = options[1].value;
    let spread = options[2].value;
    let timer = options[3].value;
    console.log(speed, size, spread, timer)
    
    // Fechar menu e abrir tela de jogo
    menuscreen.style.display = "none";
    gamescreen.style.display = "block"
    console.log("começou")

    // Contagem regressiva
    let counterNumber = 3;
    let counterText = document.createElement("h2");
    counterText.innerText = "3";
    counterText.id = "counter-text";
    gamescreen.appendChild(counterText);
    let counterLoop = setInterval(() => {
        counterNumber--
        counterText.innerText = `${counterNumber}`
        if (counterNumber == 0) {

            // Fechar contagem regressiva
            clearInterval(counterLoop)
            
            // Começar timer
            counterText.remove()
            setTimeout(() => {
                // Voltar pro menu
                menuscreen.style.display = "grid";
                gamescreen.style.display = "none";
            }, (timer * 1000));

            // Jogo
            setInterval(() => {
                // Criar target
                let target = document.createElement("div");
                target.classList = "target";
                // Tamanho e posição
                target.style.width = `${size}vw`;
                target.style.top = `${Math.floor( Math.random() * spread + ( (100 - spread)/2 ) )}vh`;
                target.style.left = `${Math.floor( Math.random() * spread + ( (100 - spread)/2 ) )}vw`;
                // Colocar na tela
                gamescreen.appendChild(target)
                // Remover
                setInterval(() => {
                    target.remove()
                }, (2000 - (100 * speed)));
                // Evento caso o jogador clique a tempo
                target.addEventListener("click", event => {
                    if (selectedSound != null) {
                        new Audio(selectedSound).play()
                    }
                    target.remove();
                })
                
            }, (2000 - (100 * speed)) );

        }
    }, 1000);

})