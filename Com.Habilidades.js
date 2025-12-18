document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-category');
    
    // --- 1. EFECTO REVEAL AL HACER SCROLL ---
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    };

    // Estilos iniciales para el reveal
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecutar una vez al cargar


    // --- 2. EFECTO DE BRILLO (GLOW) SEGUIDOR ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Creamos un reflejo dinámico en la tarjeta
            card.style.background = `
                radial-gradient(circle at ${x}px ${y}px, 
                rgba(0, 212, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.03) 80%)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.03)';
        });
    });

    // --- 3. FILTRO DE BÚSQUEDA EN TIEMPO REAL ---
    const searchInput = document.getElementById('skill-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const skillItems = document.querySelectorAll('.skill-category li');

            skillItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});