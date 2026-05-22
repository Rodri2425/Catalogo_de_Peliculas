/* ==============================================
   CineFamiliar — Script principal
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- PARTÍCULAS DE FONDO ---- */
    const particlesContainer = document.getElementById('particles');
    const PARTICLE_COUNT = 28;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 2.5 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 18 + 12;
        const delay = Math.random() * 15;
        const opacity = Math.random() * 0.4 + 0.15;

        p.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;

        particlesContainer.appendChild(p);
    }


    /* ---- BUSCADOR ---- */
    const buscador = document.getElementById('buscador');
    const cartelera = document.getElementById('cartelera');

    buscador.addEventListener('input', () => {
        const query = buscador.value.toLowerCase().trim();
        const cards = cartelera.querySelectorAll('.movie-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const desc  = card.querySelector('.description').textContent.toLowerCase();
            const matches = title.includes(query) || desc.includes(query);

            if (matches) {
                card.style.display = '';
                card.style.animation = 'card-reveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) both';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Mensaje sin resultados
        const existing = cartelera.querySelector('.no-results');
        if (existing) existing.remove();

        if (visibleCount === 0) {
            const msg = document.createElement('div');
            msg.classList.add('no-results');
            msg.innerHTML = `
                <p>Sin resultados para "${buscador.value}"</p>
                <span>Intenta con otro título o descripción</span>
            `;
            cartelera.appendChild(msg);
        }
    });


    /* ---- MODAL DE TRAILER ---- */
    const modal       = document.getElementById('trailerModal');
    const trailerFrame = document.getElementById('trailerFrame');
    const modalTitle  = document.getElementById('modal-title');
    const modalClose  = document.getElementById('modalClose');

    function getEmbedUrl(url) {
        // Soporte para formatos youtube.com/watch?v=, youtu.be/, y youtu.be/?si=
        let videoId = null;

        // youtu.be corto
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (shortMatch) videoId = shortMatch[1];

        // youtube.com watch
        const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (longMatch) videoId = longMatch[1];

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        }

        // Fallback: devolver la URL tal cual
        return url;
    }

    function openModal(url, title) {
        trailerFrame.src = getEmbedUrl(url);
        modalTitle.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        // Pequeño delay para que la animación cierre antes de limpiar el src
        setTimeout(() => {
            trailerFrame.src = '';
        }, 350);
        document.body.style.overflow = '';
    }

    // Delegar eventos en los botones de trailer
    cartelera.addEventListener('click', (e) => {
        const btn = e.target.closest('.trailer-btn');
        if (!btn) return;
        const url   = btn.dataset.trailerUrl;
        const title = btn.dataset.title;
        openModal(url, title);
    });

    // Cerrar con botón ✕
    modalClose.addEventListener('click', closeModal);

    // Cerrar al click en el overlay (fuera del box)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    /* ---- SCROLL: navbar compacta ---- */
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;

        if (current > 80) {
            navbar.style.padding = '0.7rem 3rem';
        } else {
            navbar.style.padding = '1.1rem 3rem';
        }

        lastScroll = current;
    }, { passive: true });


    /* ---- INTERSECTION OBSERVER: entrada de tarjetas ---- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.movie-card').forEach(card => {
        observer.observe(card);
    });

});