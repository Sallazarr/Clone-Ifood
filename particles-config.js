particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "edge" },
        opacity: { value: 0, random: true },
        size: { value: 10, random: true },
        move: { enable: true, speed: 2.5, direction: "none", out_mode: "out" },
        line_linked: {
            enable: true, 
            distance: 150, // Distância entre as partículas conectadas
            color: "#007bff", // Cor das linhas
            opacity: .5, // Opacidade das linhas
            width: 1 // Espessura das linhas
        }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 10, duration: 0.4 } }
    }
});
