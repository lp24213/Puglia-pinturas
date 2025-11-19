// Animação de Entrada - Estilo Tesla/Solana
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Após 1.2s, fazer fade out
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remover completamente após animação
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 1200);
});

