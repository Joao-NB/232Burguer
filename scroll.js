
window.addEventListener("scroll", function() {
    let footer = document.getElementById("footer");
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = window.innerHeight;
    let scrollTop = window.pageYOffset;

    // Verifica se o usuário está rolando para baixo
    if (scrollTop > 0) {
        footer.style.bottom = "0"; // Mostrar o footer quando estiver rolando para baixo
    } else {
        footer.style.bottom = "-100px"; // Esconder o footer se estiver no topo da página
    }
});



