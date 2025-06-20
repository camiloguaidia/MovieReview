// --- Usuarios y autenticación ---
let usuarios = [];

try {
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
} catch (error) {
    console.error("Error leyendo usuarios del almacenamiento local:", error);
    usuarios = [];
}

let usuarioActivo = null;

function registrarUsuario() {
    const nombre = document.getElementById("registro-nombre").value.trim();
    const email = document.getElementById("registro-email").value.trim().toLowerCase();
    const pass = document.getElementById("registro-pass").value.trim();

    if (!nombre || !email || !pass) {
        alert("Completa todos los campos.");
        return;
    }

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        alert("Ese correo ya está registrado.");
        return;
    }

    usuarios.push({ nombre, email, pass });

    try {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Registro exitoso. Ahora inicia sesión.");
        document.getElementById("registro-nombre").value = "";
        document.getElementById("registro-email").value = "";
        document.getElementById("registro-pass").value = "";
    } catch (error) {
        console.error("Error guardando en almacenamiento local:", error);
        alert("Hubo un error al registrar.");
    }
}

function iniciarSesion() {
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const pass = document.getElementById("login-pass").value.trim();

    const usuario = usuarios.find(u => u.email === email && u.pass === pass);

    if (usuario) {
        usuarioActivo = usuario;
        mostrarUsuarioActivo();
    } else {
        alert("Credenciales incorrectas.");
    }
}

function mostrarUsuarioActivo() {
    const mensaje = document.getElementById("mensaje-usuario");
    const contenido = document.getElementById("contenido");
    const loginForm = document.getElementById("form-login");
    const registroForm = document.getElementById("form-registro");
    const logoutBtn = document.getElementById("btn-logout");
    const authBox = document.getElementById("autenticacion");

    if (mensaje) mensaje.textContent = `Bienvenido, ${usuarioActivo.nombre}`;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (loginForm) loginForm.style.display = "none";
    if (registroForm) registroForm.style.display = "none";
    if (authBox) authBox.style.display = "none";
    if (contenido) {
        contenido.style.display = "block";
        contenido.classList.add("active");
    }
}

function cerrarSesion() {
    usuarioActivo = null;
    const mensaje = document.getElementById("mensaje-usuario");
    const contenido = document.getElementById("contenido");
    const loginForm = document.getElementById("form-login");
    const registroForm = document.getElementById("form-registro");
    const logoutBtn = document.getElementById("btn-logout");
    const authBox = document.getElementById("autenticacion");

    if (mensaje) mensaje.textContent = "";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
    if (registroForm) registroForm.style.display = "block";
    if (authBox) authBox.style.display = "block";
    if (contenido) {
        contenido.style.display = "none";
        contenido.classList.remove("active");
    }
}

// --- Búsqueda de películas ---
function filtrarPeliculas() {
    const input = document.getElementById('buscador-peliculas');
    const filtro = input.value.toLowerCase();
    const items = document.querySelectorAll('.plataforma-item');

    items.forEach(item => {
        const titulo = item.querySelector('.titulo-imagen').textContent.toLowerCase();
        item.style.display = titulo.includes(filtro) ? 'flex' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador-peliculas');
    if (buscador) {
        buscador.addEventListener('input', filtrarPeliculas);
    }
});

// --- Carrito de compras ---
const carrito = [];

function agregarAlCarrito(event, titulo) {
    event.stopPropagation();
    if (!carrito.includes(titulo)) {
        carrito.push(titulo);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.forEach(titulo => {
        const li = document.createElement("li");
        li.textContent = titulo;
        lista.appendChild(li);
    });
}

function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
}
