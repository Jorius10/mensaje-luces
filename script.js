document.addEventListener('DOMContentLoaded', () => {
    const wall = document.getElementById('wall');
    
    const layout = [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    ];

    const colors = [
        '#ff0000', // Rojo
        '#00ff00', // Verde
        '#0000ff', // Azul
        '#ffff00', // Amarillo
        '#ff00ff', // Rosa/Magenta
        '#00ffff', // Cyan
        '#ff8800'  // Naranja
    ];

    const bulbElements = {};

    layout.forEach((rowArray) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'letter-row';

        rowArray.forEach((letter) => {
            const container = document.createElement('div');
            container.className = 'letter-container';

            const bulb = document.createElement('div');
            bulb.className = 'bulb';
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            bulb.style.backgroundColor = randomColor;
            bulb.dataset.color = randomColor;

            const text = document.createElement('div');
            text.className = 'letter';
            text.innerText = letter;

            container.appendChild(bulb);
            container.appendChild(text);
            rowDiv.appendChild(container);

            bulbElements[letter] = bulb;
        });

        wall.appendChild(rowDiv);
    });

    const startBtn = document.getElementById('start-btn');
    const statusText = document.getElementById('status-text');
    
    // El mensaje predefinido que el usuario pidió
    // (Quitamos la coma porque no hay luz para la coma, un espacio es mejor)
    const secretMessage = "ME GUSTAS";

    let isPlaying = false;

    startBtn.addEventListener('click', () => {
        if(isPlaying) return;
        playMessage(secretMessage);
    });

    async function playMessage(message) {
        isPlaying = true;
        statusText.innerText = 'Sincronizando frecuencias...';
        startBtn.style.display = 'none';

        // Ligera pausa para darle suspenso
        await sleep(1500);
        statusText.innerText = '';

        for(let i = 0; i < message.length; i++) {
            const char = message[i];

            if(char === ' ' || char === ',') {
                // Pausa entre palabras
                await sleep(500);
            } else if (bulbElements[char]) {
                const bulb = bulbElements[char];
                const color = bulb.dataset.color;

                bulb.classList.add('active');
                bulb.style.boxShadow = `0 0 40px 15px ${color}, inset -2px -2px 10px rgba(0,0,0,0.2)`;
                
                await sleep(700);

                bulb.classList.remove('active');
                bulb.style.boxShadow = 'inset -2px -2px 10px rgba(0,0,0,0.5)';

                await sleep(350);
            }
        }

        isPlaying = false;
        statusText.innerText = 'La conexión se ha perdido...';
        
        setTimeout(() => {
            startBtn.style.display = 'inline-block';
            startBtn.innerText = "Volver a escuchar";
            statusText.innerText = "La distorsión continúa.";
        }, 3000);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
