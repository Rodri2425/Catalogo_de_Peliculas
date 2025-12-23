document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('stars-container');
    const cantidadEstrellas = 15; //  cambiar numero de estrellas para visualizar

    for (let i = 0; i < cantidadEstrellas; i++) {
        createStar();
    }

    function createStar() {
        // 1. Crear el contenedor de la estrella (la caja que tiene cuerda + estrella)
        const wrapper = document.createElement('div');
        wrapper.classList.add('star-wrapper');

        // 2. Crear la cuerda
        const cuerda = document.createElement('div');
        cuerda.classList.add('cuerda');
        // Hacemos que algunas cuerdas sean más largas que otras aleatoriamente
        const alturaCuerda = Math.floor(Math.random() * 100) + 50; // Entre 50px y 150px
        cuerda.style.height = alturaCuerda + 'px';

        // 3. Crear la estrella
        const estrella = document.createElement('div');
        estrella.classList.add('estrella');
        estrella.innerHTML = '★'; // Símbolo de estrella

        // 4. Posición aleatoria en el ancho de la pantalla (0% a 100%)
        const randomLeft = Math.floor(Math.random() * 100);
        wrapper.style.left = randomLeft + '%';

        // 5. Retraso aleatorio para que no caigan todas al mismo tiempo
        const randomDelay = Math.random() * 2; // Entre 0 y 2 segundos
        wrapper.style.animationDelay = randomDelay + 's, ' + (randomDelay + 1.5) + 's'; 
        // Nota: El primer delay es para 'caer', el segundo para 'balanceo'

        // 6. Armar todo y ponerlo en el HTML
        wrapper.appendChild(cuerda);
        wrapper.appendChild(estrella);
        container.appendChild(wrapper);
    }


    // --- LÓGICA PARA LOS BOTONES DE TRÁILER ---
function setupTrailerButtons() {
    // 1. Buscamos todos los botones que tienen la clase 'trailer-btn'
    const buttons = document.querySelectorAll('.trailer-btn');

    // 2. Recorremos todos los botones encontrados
    buttons.forEach(button => {
        
        // 3. A cada botón le agregamos una función que se activa al hacer 'click'
        button.addEventListener('click', function() {
            
            // 4. Leer la URL que escondimos en la propiedad 'data-trailer-url'
            const trailerUrl = button.getAttribute('data-trailer-url');
            const movieTitle = button.getAttribute('data-title');

            // 5. Verificar que tengamos una URL
            if (trailerUrl) {
                // Abrir el enlace en una nueva pestaña (ventana)
                window.open(trailerUrl, '_blank');
            } else {
                console.error("No se encontró URL para el tráiler de:", movieTitle);
                alert(`Lo sentimos, el tráiler de ${movieTitle} no está disponible.`);
            }
        });
    });
}

// --- LÓGICA PARA LAS LUCES DEL BANNER DEL NACIMIENTO ---
function crearLucesBanner() {
    const container = document.getElementById('luces-fondo-container');
    
    // Si no existe el contenedor (por si acaso), no hacemos nada.
    if (!container) return;

    const cantidadLuces = 60; // ¡Puedes poner más si quieres más brillo!

    for (let i = 0; i < cantidadLuces; i++) {
        const luz = document.createElement('div');
        luz.classList.add('luz-magica');

        // Tamaño aleatorio para que no sean todas iguales (entre 2px y 5px)
        const size = Math.random() * 3 + 2; 
        luz.style.width = size + 'px';
        luz.style.height = size + 'px';

        // Posición aleatoria dentro del banner
        luz.style.top = Math.random() * 100 + '%';
        luz.style.left = Math.random() * 100 + '%';

        // Retraso aleatorio para que parpadeen en momentos distintos
        luz.style.animationDelay = Math.random() * 3 + 's';
        // Duración aleatoria para que unas parpadeen más rápido que otras
        luz.style.animationDuration = (Math.random() * 2 + 2) + 's';

        container.appendChild(luz);
    }
}

// 6. Aseguramos que la función se ejecute cuando el documento esté cargado
// Si ya tienes un listener de DOMContentLoaded, simplemente llama a setupTrailerButtons() dentro de él.
setupTrailerButtons();
crearLucesBanner();



});