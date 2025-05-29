// script.js

document.addEventListener("DOMContentLoaded", function () {
  document.body.style.backgroundImage = "url('./imagenes/fondo_hollowknight.webp')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
});

// Función para alternar la visibilidad de los textos emergentes
function toggleText(id) {
    const textBlock = document.getElementById(id);
    if (textBlock) {
      textBlock.classList.toggle('active');
    }
  }



  document.addEventListener("DOMContentLoaded", () => {
    const personajes = [
        { nombre: "El Caballero", descripcion: "Protagonista silencioso en la búsqueda de salvar Hallownest.", img: "caballero.webp" },
        { nombre: "Hornet", descripcion: "Guardián del Reino y medio hermana del Caballero.", img: "Hornet_1.webp" },
        { nombre: "Rey Pálido", descripcion: "Antiguo monarca de Hallownest, creador de los Recipientes.", img: "rey_pal.webp" },
        { nombre: "El Resplandor", descripcion: "Deidad de luz que causó la Infección en Hallownest.", img: "el_resplandor.webp" },
        { nombre: "El Hollow Knight", descripcion: "Recipiente elegido para contener la Infección.", img: "infeccion_hollowknight1.png" },
        { nombre: "Zote el Poderoso", descripcion: "Guerrero presuntuoso pero débil, encontrado en varias ocasiones.", img: "zote.jpg" },
        { nombre: "Grimm", descripcion: "Líder de la Tropa Grimm, invocador de pesadillas.", img: "grimm.webp" },
        { nombre: "Monomon la Maestra", descripcion: "Uno de los tres Soñadores que sellaron el Templo del Huevo Negro.", img: "monomon_maestra.jpeg" },
        { nombre: "Lurien el Vigilante", descripcion: "Otro de los Soñadores, encargado de vigilar la Ciudad de las Lágrimas.", img: "lurien.jpg" },
        { nombre: "Herrah la Bestia", descripcion: "Última de los Soñadores, reina de Nido Profundo.", img: "herrah.png" },
        { nombre: "Quirrel", descripcion: "Viajero curioso que busca el significado de su existencia.", img: "quirrel.jpeg" },
        { nombre: "Cornifer", descripcion: "Cartógrafo que dibuja mapas del vasto Hallownest.", img: "cornifer.webp" },
        { nombre: "Cloth", descripcion: "Guerrera en busca de valor y honor.", img: "cloth.webp" },
        { nombre: "Myla", descripcion: "Minera alegre que trabaja en el Pico de Cristal.", img: "myla.webp" },
        { nombre: "Bretta", descripcion: "Joven insecto que sueña con ser rescatada.", img: "bretta.webp" },
        { nombre: "sombra del Caballero", descripcion: "El ser dentro del cascaron del caballero, podría decirse que es el verdadero elegido.", img: "sombra.webp" },
        { nombre: "Maestro Mato", descripcion: "Uno de los tres maestros del arte de la espada.", img: "mato.webp" },
        { nombre: "Maestro Oro", descripcion: "Hermano de Mato, experto en técnicas de espada.", img: "oro.webp" },
        { nombre: "Maestro Sheo", descripcion: "Artista y guerrero, antiguo maestro de la espada.", img: "sheo.webp" },
        { nombre: "El Coleccionista", descripcion: "Entidad obsesionada con recolectar especímenes.", img: "coleccionista.webp" }
    ];

    const container = document.getElementById("tarjetas-personajes");

      personajes.forEach((personaje) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const imagen = document.createElement("img");
      imagen.src = `imagenes/${personaje.img}`;
      imagen.alt = personaje.nombre;

      const nombre = document.createElement("h3");
      nombre.textContent = personaje.nombre;

      const descripcion = document.createElement("p");
      descripcion.textContent = personaje.descripcion;
      descripcion.classList.add("descripcion");
      descripcion.style.display = "none";

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(descripcion);

      tarjeta.addEventListener("click", () => {
          descripcion.style.display = descripcion.style.display === "none" ? "block" : "none";
      });

      container.appendChild(tarjeta);
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comentario-form");
  const lista = document.getElementById("comentarios-lista");

  if (form) {
    // Cargar comentarios existentes
    fetch('http://localhost:3000/comentarios') // ¡Qué no se me olvide que aquí también podría utilizar IP!
      .then(res => res.json())
      .then(data => {
        data.forEach(comentario => {
          const div = document.createElement("div");
          div.classList.add("comentario");
          div.innerHTML = `<strong>${comentario.nombre}</strong>: ${comentario.mensaje}`;
          lista.appendChild(div);
        });
      });

      // Enviar nuevo comentario
      form.addEventListener("submit", e => {
      e.preventDefault();
      
      const nombre = document.getElementById("nombre").value;
      const mensaje = document.getElementById("mensaje").value;

      if (!nombre.trim() || !mensaje.trim()) {
        alert("Por favor, completa ambos campos.");
        return;
      }

      fetch('http://localhost:3000/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, mensaje })
      })
        .then(res => res.json())
        .then(data => {
          const div = document.createElement("div");
          div.classList.add("comentario");
          div.innerHTML = `<strong>${data.nombre}</strong>: ${data.mensaje}`;
          lista.appendChild(div);
          form.reset();
        });
    });
  }
});
