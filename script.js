document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DE BÚSQUEDA EN TIEMPO REAL ---
    const buscador = document.getElementById('buscador');
    const movieCards = document.querySelectorAll('.movie-card');

    buscador.addEventListener('input', function(evento) {
        // Obtenemos el texto que escribió el usuario, en minúsculas
        const textoBuscado = evento.target.value.toLowerCase();

        // Recorremos cada tarjeta de película
        movieCards.forEach(card => {
            // Buscamos el título de la película dentro de la tarjeta
            const titulo = card.querySelector('h2').innerText.toLowerCase();

            // Si el título incluye lo que el usuario escribió, la mostramos. Si no, la ocultamos.
            if (titulo.includes(textoBuscado)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // --- 2. LÓGICA PARA LOS BOTONES DE TRÁILER ---
    function setupTrailerButtons() {
        const buttons = document.querySelectorAll('.trailer-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Prevenimos el comportamiento por defecto
                e.preventDefault();
                
                const trailerUrl = button.getAttribute('data-trailer-url');
                
                if (trailerUrl) {
                    window.open(trailerUrl, '_blank');
                } else {
                    alert('Tráiler no disponible por el momento.');
                }
            });
        });
    }

    // Inicializamos los botones
    setupTrailerButtons();
});