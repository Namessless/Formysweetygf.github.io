// ============================================================
// PARA LUZ ELENA ♡
// SCRIPT PRINCIPAL
// ============================================================


// ============================================================
// 01. CONFIGURACIÓN
// ============================================================

const CONFIG = {
    usuario: "Luz Elena",
    contrasena: "11042025",
    claveSesion: "sesionLuzElena",

    tiempoEntrada: 900,
    tiempoSalida: 650,
    tiempoCorazon: 4500
};


// ============================================================
// 02. ELEMENTOS PRINCIPALES
// ============================================================

const login = document.getElementById("pantalla-login");
const contenido = document.getElementById("contenido-principal");

const formulario = document.getElementById("formulario-login");
const usuarioInput = document.getElementById("usuario");
const contrasenaInput = document.getElementById("contrasena");

const mensajeLogin = document.getElementById("mensaje-login");

const botonEntrar = document.getElementById("boton-entrar");
const botonMostrar = document.getElementById("mostrar-contrasena");

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu-principal");

const navegacion = document.getElementById("navegacion");

const botonArriba = document.getElementById("boton-arriba");


// ============================================================
// 03. INICIO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    iniciarPagina();

});


function iniciarPagina() {

    prepararLogin();

    prepararMenu();

    prepararNavegacion();

    prepararScroll();

    prepararRevelaciones();

    prepararGaleria();

    prepararBotonArriba();

    prepararCorazonFinal();

    prepararTeclado();

    comprobarSesion();

}


// ============================================================
// 04. SESIÓN
// ============================================================

function comprobarSesion() {

    const sesion =
        sessionStorage.getItem(CONFIG.claveSesion);

    if (sesion === "true") {

        mostrarPagina(false);

    } else {

        mostrarLogin();

    }
}


function iniciarSesion() {

    sessionStorage.setItem(
        CONFIG.claveSesion,
        "true"
    );

}


function cerrarSesion() {

    sessionStorage.removeItem(
        CONFIG.claveSesion
    );

    mostrarLogin();

}


// ============================================================
// 05. LOGIN
// ============================================================

function prepararLogin() {

    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        procesarLogin
    );


    if (usuarioInput) {

        usuarioInput.addEventListener(
            "input",
            limpiarMensaje
        );

    }


    if (contrasenaInput) {

        contrasenaInput.addEventListener(
            "input",
            limpiarMensaje
        );

    }


    if (botonMostrar) {

        botonMostrar.addEventListener(
            "click",
            mostrarOcultarContrasena
        );

    }

}


// ============================================================
// 06. PROCESAR LOGIN
// ============================================================

function procesarLogin(event) {

    event.preventDefault();


    const usuario =
        usuarioInput
            ? usuarioInput.value.trim()
            : "";


    const contrasena =
        contrasenaInput
            ? contrasenaInput.value.trim()
            : "";


    limpiarMensaje();


    if (usuario === "") {

        mostrarMensaje(
            "Escribe tu nombre primero ♡",
            "error"
        );

        enfocar(usuarioInput);

        return;

    }


    if (contrasena === "") {

        mostrarMensaje(
            "Falta la contraseña...",
            "error"
        );

        enfocar(contrasenaInput);

        return;

    }


    const nombreCorrecto =
        usuario.toLowerCase() ===
        CONFIG.usuario.toLowerCase();


    const contrasenaCorrecta =
        contrasena === CONFIG.contrasena;


    if (nombreCorrecto && contrasenaCorrecta) {

        loginCorrecto();

        return;

    }


    if (!nombreCorrecto) {

        mostrarMensaje(
            "Tus 2 primeros nombres",
            "error"
        );

        sacudirLogin();

        return;

    }


    if (!contrasenaCorrecta) {

        mostrarMensaje(
            "La contraseña es el día que nos conocimos....",
            "error"
        );

        sacudirLogin();

        return;

    }

}


// ============================================================
// 07. LOGIN CORRECTO
// ============================================================

function loginCorrecto() {

    mostrarMensaje(
        "Bienvenida, Luz Elena ♡",
        "correcto"
    );


    iniciarSesion();


    if (botonEntrar) {

        botonEntrar.classList.add(
            "boton-cargando"
        );

    }


    crearCorazones();


    setTimeout(() => {

        mostrarPagina(true);

    }, CONFIG.tiempoEntrada);

}


// ============================================================
// 08. MOSTRAR PÁGINA
// ============================================================

function mostrarPagina(animar = true) {

    if (!login || !contenido) {
        return;
    }


    login.classList.add(
        "login-saliendo"
    );


    const retraso =
        animar
            ? CONFIG.tiempoSalida
            : 0;


    setTimeout(() => {

        login.style.display = "none";


        contenido.classList.remove(
            "oculto"
        );


        contenido.classList.add(
            "contenido-visible"
        );


        document.body.classList.add(
            "pagina-desbloqueada"
        );


        window.scrollTo({
            top: 0,
            behavior: "auto"
        });


        if (animar) {

            animarHero();

        }

    }, retraso);

}


// ============================================================
// 09. MOSTRAR LOGIN
// ============================================================

function mostrarLogin() {

    if (!login || !contenido) {
        return;
    }


    login.style.display = "flex";


    login.classList.remove(
        "login-saliendo"
    );


    contenido.classList.add(
        "oculto"
    );


    contenido.classList.remove(
        "contenido-visible"
    );


    document.body.classList.remove(
        "pagina-desbloqueada"
    );


    cerrarMenu();


    if (botonEntrar) {

        botonEntrar.classList.remove(
            "boton-cargando"
        );

    }


    if (usuarioInput) {

        setTimeout(() => {

            usuarioInput.focus();

        }, 300);

    }

}


// ============================================================
// 10. MENSAJES
// ============================================================

function mostrarMensaje(texto, tipo) {

    if (!mensajeLogin) {
        return;
    }


    mensajeLogin.textContent = texto;


    mensajeLogin.classList.remove(
        "error",
        "correcto",
        "visible"
    );


    if (tipo === "error") {

        mensajeLogin.classList.add(
            "error"
        );

    }


    if (tipo === "correcto") {

        mensajeLogin.classList.add(
            "correcto"
        );

    }


    requestAnimationFrame(() => {

        mensajeLogin.classList.add(
            "visible"
        );

    });

}


function limpiarMensaje() {

    if (!mensajeLogin) {
        return;
    }


    mensajeLogin.classList.remove(
        "visible",
        "error",
        "correcto"
    );

}


// ============================================================
// 11. CONTRASEÑA
// ============================================================

function mostrarOcultarContrasena() {

    if (!contrasenaInput) {
        return;
    }


    const oculta =
        contrasenaInput.type === "password";


    if (oculta) {

        contrasenaInput.type = "text";


        if (botonMostrar) {

            botonMostrar.textContent = "◉";

            botonMostrar.setAttribute(
                "aria-label",
                "Ocultar contraseña"
            );

        }

    } else {

        contrasenaInput.type = "password";


        if (botonMostrar) {

            botonMostrar.textContent = "◉";

            botonMostrar.setAttribute(
                "aria-label",
                "Mostrar contraseña"
            );

        }

    }

}


// ============================================================
// 12. ENFOCAR
// ============================================================

function enfocar(elemento) {

    if (!elemento) {
        return;
    }


    setTimeout(() => {

        elemento.focus();

    }, 100);

}


// ============================================================
// 13. SACUDIDA DEL LOGIN
// ============================================================

function sacudirLogin() {

    const tarjeta =
        document.querySelector(
            ".login-card"
        );


    if (!tarjeta) {
        return;
    }


    tarjeta.classList.remove(
        "login-error-shake"
    );


    void tarjeta.offsetWidth;


    tarjeta.classList.add(
        "login-error-shake"
    );


    setTimeout(() => {

        tarjeta.classList.remove(
            "login-error-shake"
        );

    }, 600);

}


// ============================================================
// 14. ANIMACIÓN DEL HERO
// ============================================================

function animarHero() {

    const elementos =
        document.querySelectorAll(
            ".hero-texto > *, .hero-visual"
        );


    elementos.forEach(
        (elemento, indice) => {

            elemento.style.setProperty(
                "--delay",
                `${indice * 120}ms`
            );


            elemento.classList.add(
                "hero-animado"
            );

        }
    );

}


// ============================================================
// 15. MENÚ MÓVIL
// ============================================================

function prepararMenu() {

    if (!botonMenu || !menu) {
        return;
    }


    botonMenu.addEventListener(
        "click",
        alternarMenu
    );


    const enlaces =
        menu.querySelectorAll(
            ".enlace-nav"
        );


    enlaces.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            cerrarMenu
        );

    });


    document.addEventListener(
        "click",
        controlarClickMenu
    );

}


function alternarMenu() {

    const abierto =
        menu.classList.toggle(
            "menu-abierto"
        );


    botonMenu.classList.toggle(
        "activo",
        abierto
    );


    botonMenu.setAttribute(
        "aria-expanded",
        String(abierto)
    );


    document.body.classList.toggle(
        "menu-abierto",
        abierto
    );

}


function cerrarMenu() {

    if (menu) {

        menu.classList.remove(
            "menu-abierto"
        );

    }


    if (botonMenu) {

        botonMenu.classList.remove(
            "activo"
        );


        botonMenu.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.classList.remove(
        "menu-abierto"
    );

}


function controlarClickMenu(event) {

    if (!menu || !botonMenu) {
        return;
    }


    if (
        !menu.classList.contains(
            "menu-abierto"
        )
    ) {

        return;

    }


    const dentroMenu =
        menu.contains(event.target);


    const dentroBoton =
        botonMenu.contains(event.target);


    if (!dentroMenu && !dentroBoton) {

        cerrarMenu();

    }

}


// ============================================================
// 16. NAVEGACIÓN
// ============================================================

function prepararNavegacion() {

    const enlaces =
        document.querySelectorAll(
            ".enlace-nav"
        );


    enlaces.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            manejarNavegacion
        );

    });

}


function manejarNavegacion(event) {

    const enlace =
        event.currentTarget;


    const destino =
        enlace.getAttribute("href");


    if (
        !destino ||
        !destino.startsWith("#")
    ) {

        return;

    }


    const seccion =
        document.querySelector(
            destino
        );


    if (!seccion) {
        return;
    }


    event.preventDefault();


    const altura =
        navegacion
            ? navegacion.offsetHeight
            : 0;


    const posicion =
        seccion.getBoundingClientRect().top +
        window.scrollY -
        altura -
        15;


    window.scrollTo({

        top: posicion,

        behavior: "smooth"

    });


    cerrarMenu();

}


// ============================================================
// 17. SCROLL
// ============================================================

function prepararScroll() {

    window.addEventListener(
        "scroll",
        actualizarScroll,
        {
            passive: true
        }
    );


    actualizarScroll();

}


function actualizarScroll() {

    const posicion =
        window.scrollY;


    actualizarNavegacion(posicion);

    actualizarBarra(posicion);

    actualizarBotonArriba(posicion);

}


// ============================================================
// 18. NAVEGACIÓN ACTIVA
// ============================================================

function actualizarNavegacion(posicion) {

    const secciones =
        document.querySelectorAll(
            "main section[id]"
        );


    const enlaces =
        document.querySelectorAll(
            ".enlace-nav"
        );


    let actual = "";


    secciones.forEach((seccion) => {

        const limite =
            seccion.offsetTop - 220;


        if (posicion >= limite) {

            actual = seccion.id;

        }

    });


    enlaces.forEach((enlace) => {

        enlace.classList.remove(
            "activo"
        );


        const href =
            enlace.getAttribute("href");


        if (href === `#${actual}`) {

            enlace.classList.add(
                "activo"
            );

        }

    });

}


// ============================================================
// 19. BARRA NAV
// ============================================================

function actualizarBarra(posicion) {

    if (!navegacion) {
        return;
    }


    navegacion.classList.toggle(
        "navegacion-scroll",
        posicion > 40
    );

}


// ============================================================
// 20. REVELACIONES
// ============================================================

function prepararRevelaciones() {

    const elementos =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (!elementos.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elementos.forEach((elemento) => {

            elemento.classList.add(
                "revelado"
            );

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entradas, observador) => {

                entradas.forEach(
                    (entrada) => {

                        if (
                            !entrada.isIntersecting
                        ) {

                            return;

                        }


                        entrada.target.classList.add(
                            "revelado"
                        );


                        observador.unobserve(
                            entrada.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -70px 0px"
            }
        );


    elementos.forEach((elemento) => {

        observer.observe(elemento);

    });

}


// ============================================================
// 21. GALERÍA
// ============================================================

function prepararGaleria() {

    const fotos =
        document.querySelectorAll(
            ".galeria-item, .foto-grande, .tarjeta-especial"
        );


    fotos.forEach((foto) => {

        foto.addEventListener(
            "click",
            () => {

                abrirImagen(foto);

            }
        );

    });

}


// ============================================================
// 22. ABRIR IMAGEN
// ============================================================

function abrirImagen(contenedor) {

    if (!contenedor) {
        return;
    }


    const imagen =
        contenedor.querySelector(
            "img"
        );


    if (!imagen) {
        return;
    }


    const src =
        imagen.getAttribute(
            "src"
        );


    if (
        !src ||
        src === "" ||
        src.includes("undefined")
    ) {

        return;

    }


    const visor =
        document.createElement(
            "div"
        );


    visor.className =
        "visor-imagen";


    visor.innerHTML = `
        <button
            type="button"
            class="cerrar-visor"
            aria-label="Cerrar imagen"
        >
            ×
        </button>

        <div class="visor-contenido">

            <img
                src="${src}"
                alt="${imagen.alt || "Imagen especial"}"
            >

            <span class="visor-corazon">
                ♡
            </span>

        </div>
    `;


    document.body.appendChild(
        visor
    );


    document.body.classList.add(
        "visor-abierto"
    );


    requestAnimationFrame(() => {

        visor.classList.add(
            "visor-visible"
        );

    });


    const cerrar =
        visor.querySelector(
            ".cerrar-visor"
        );


    if (cerrar) {

        cerrar.addEventListener(
            "click",
            () => {

                cerrarVisor(visor);

            }
        );

    }


    visor.addEventListener(
        "click",
        (event) => {

            if (
                event.target === visor
            ) {

                cerrarVisor(visor);

            }

        }
    );

}


// ============================================================
// 23. CERRAR VISOR
// ============================================================

function cerrarVisor(visor) {

    if (!visor) {
        return;
    }


    visor.classList.remove(
        "visor-visible"
    );


    document.body.classList.remove(
        "visor-abierto"
    );


    setTimeout(() => {

        if (visor.parentNode) {

            visor.remove();

        }

    }, 350);

}


// ============================================================
// 24. BOTÓN ARRIBA
// ============================================================

function prepararBotonArriba() {

    if (!botonArriba) {
        return;
    }


    botonArriba.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


function actualizarBotonArriba(posicion) {

    if (!botonArriba) {
        return;
    }


    botonArriba.classList.toggle(
        "visible",
        posicion > 500
    );

}


// ============================================================
// 25. CORAZONES
// ============================================================

function crearCorazones() {

    const cantidad = 18;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(() => {

            crearCorazon();

        }, i * 90);

    }

}


function crearCorazon() {

    const corazon =
        document.createElement(
            "span"
        );


    corazon.className =
        "corazon-flotante";


    const simbolos = [
        "♡",
        "♥",
        "✦",
        "✧"
    ];


    corazon.textContent =
        simbolos[
            Math.floor(
                Math.random() *
                simbolos.length
            )
        ];


    corazon.style.left =
        `${Math.random() * 100}%`;


    corazon.style.fontSize =
        `${12 + Math.random() * 18}px`;


    corazon.style.animationDuration =
        `${2 + Math.random() * 2}s`;


    corazon.style.animationDelay =
        `${Math.random() * 0.5}s`;


    document.body.appendChild(
        corazon
    );


    setTimeout(() => {

        if (corazon.parentNode) {

            corazon.remove();

        }

    }, CONFIG.tiempoCorazon);

}


// ============================================================
// 26. CORAZÓN FINAL
// ============================================================

function prepararCorazonFinal() {

    const boton =
        document.querySelector(
            "[data-corazon]"
        );


    if (!boton) {
        return;
    }


    boton.addEventListener(
        "click",
        () => {

            boton.classList.toggle(
                "corazon-activo"
            );


            crearMiniCorazones(
                boton
            );

        }
    );

}


// ============================================================
// 27. MINI CORAZONES
// ============================================================

function crearMiniCorazones(elemento) {

    const rect =
        elemento.getBoundingClientRect();


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const corazon =
            document.createElement(
                "span"
            );


        corazon.className =
            "mini-corazon";


        corazon.textContent =
            i % 2 === 0
                ? "♡"
                : "✦";


        corazon.style.position =
            "fixed";


        corazon.style.left =
            `${rect.left + rect.width / 2}px`;


        corazon.style.top =
            `${rect.top + rect.height / 2}px`;


        corazon.style.zIndex =
            "99999";


        corazon.style.pointerEvents =
            "none";


        corazon.style.setProperty(
            "--direccion-x",
            `${(Math.random() - 0.5) * 180}px`
        );


        corazon.style.setProperty(
            "--direccion-y",
            `${-60 - Math.random() * 100}px`
        );


        document.body.appendChild(
            corazon
        );


        setTimeout(() => {

            if (corazon.parentNode) {

                corazon.remove();

            }

        }, 1300);

    }

}


// ============================================================
// 28. TECLADO
// ============================================================

function prepararTeclado() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                cerrarMenu();


                const visor =
                    document.querySelector(
                        ".visor-imagen"
                    );


                if (visor) {

                    cerrarVisor(visor);

                }

            }


            if (
                event.key === "Enter" &&
                document.activeElement ===
                usuarioInput
            ) {

                event.preventDefault();


                if (contrasenaInput) {

                    contrasenaInput.focus();

                }

            }

        }
    );

}


// ============================================================
// 29. CAMBIO DE TAMAÑO
// ============================================================

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            cerrarMenu();

        }

    }
);


// ============================================================
// 30. REDUCIR ANIMACIONES
// ============================================================

function comprobarPreferenciasMovimiento() {

    const reducir =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducir) {

        document.body.classList.add(
            "reducir-movimiento"
        );

    }

}


// ============================================================
// 31. IMÁGENES
// ============================================================

function prepararImagenes() {

    const imagenes =
        document.querySelectorAll(
            "img"
        );


    imagenes.forEach((imagen) => {

        imagen.addEventListener(
            "error",
            () => {

                imagen.classList.add(
                    "imagen-no-disponible"
                );

            }
        );

    });

}


// ============================================================
// 32. FECHA
// ============================================================

function prepararFecha() {

    const elementos =
        document.querySelectorAll(
            "[data-fecha]"
        );


    if (!elementos.length) {
        return;
    }


    const fecha =
        new Date();


    const opciones = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };


    const texto =
        fecha.toLocaleDateString(
            "es-CO",
            opciones
        );


    elementos.forEach((elemento) => {

        elemento.textContent =
            texto;

    });

}


// ============================================================
// 33. SALUDO
// ============================================================

function obtenerSaludo() {

    const hora =
        new Date().getHours();


    if (hora < 12) {

        return "Buenos días";

    }


    if (hora < 18) {

        return "Buenas tardes";

    }


    return "Buenas noches";

}


// ============================================================
// 34. SALUDO AUTOMÁTICO
// ============================================================

function prepararSaludos() {

    const elementos =
        document.querySelectorAll(
            "[data-saludo]"
        );


    if (!elementos.length) {
        return;
    }


    const saludo =
        obtenerSaludo();


    elementos.forEach((elemento) => {

        elemento.textContent =
            saludo;

    });

}


// ============================================================
// 35. ANIMACIÓN DE TEXTO
// ============================================================

function prepararTextoEscritura() {

    const textos =
        document.querySelectorAll(
            "[data-escribir]"
        );


    textos.forEach((elemento) => {

        const texto =
            elemento.textContent.trim();


        if (!texto) {
            return;
        }


        elemento.textContent = "";


        let indice = 0;


        const escribir = () => {

            if (
                indice >= texto.length
            ) {

                return;

            }


            elemento.textContent +=
                texto.charAt(indice);


            indice++;


            setTimeout(
                escribir,
                50
            );

        };


        setTimeout(
            escribir,
            600
        );

    });

}


// ============================================================
// 36. PREPARAR TODO DESPUÉS DE CARGAR
// ============================================================

window.addEventListener(
    "load",
    () => {

        comprobarPreferenciasMovimiento();

        prepararImagenes();

        prepararFecha();

        prepararSaludos();

        prepararTextoEscritura();

        document.body.classList.add(
            "pagina-cargada"
        );

    }
);


// ============================================================
// 37. MENSAJE DE CONSOLA
// ============================================================

console.log(
    "♡ Página para Luz Elena cargada correctamente ♡"
);

console.log(
    "Sistema de acceso: activo"
);