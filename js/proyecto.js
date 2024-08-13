const MENU = document.querySelector("#menu");
const RUTEO = document.querySelector("#ruteo");
const HOME = document.querySelector("#pantalla-home");
const LOGIN = document.querySelector("#pantalla-login");
const REGISTRO = document.querySelector("#pantalla-registro");
const EVENTO = document.querySelector("#pantalla-evento");
const EVENTOS = document.querySelector("#pantalla-eventos");
const INFORME = document.querySelector("#pantalla-informe");
const MAPA = document.querySelector("#pantalla-mapa");
const URLBASE = "https://babytracker.develotion.com/";
const URLBASEIMG = "https://babytracker.develotion.com/imgs/";
// ACA VAN SUMANDO CONSTANTES DE ACUERDO A LA CANTIDAD DE PANTALLAS QUE VAN CREANDO

function cerrarMenu() {
  MENU.close();
}

inicio();

function inicio() {
  chequearSesion();
  RUTEO.addEventListener("ionRouteDidChange", navegar);

  document
    .querySelector("#btnHacerLogin")
    .addEventListener("click", previaHacerLogin);
  document
    .querySelector("#btnHacerRegistro")
    .addEventListener("click", previaHacerRegistro);
  document.querySelector("#btnLogout").addEventListener("click", cerrarSesion);
  document
    .querySelector("#btnRegistrar")
    .addEventListener("click", obtenerDepartamentos);
  document
    .querySelector("#btnAgregarEvento")
    .addEventListener("click", obtenerCategorias);
  document
    .querySelector("#btnAgregarEventoNuevo")
    .addEventListener("click", previaHacerEvento);
  document
    .querySelector("#btnEventos")
    .addEventListener("click", obtenerEventos);
  document
    .querySelector("#btnInforme")
    .addEventListener("click", obtenerInforme);
  document.querySelector("#btnMapa").addEventListener("click", inicioMapa);
}

function navegar(evt) {
  console.log(evt);
  ocultarPantallas();

  if (evt.detail.to == "/") {
    HOME.style.display = "block";
  }
  if (evt.detail.to == "/login") {
    LOGIN.style.display = "block";
  }
  if (evt.detail.to == "/registro") {
    REGISTRO.style.display = "block";
  }
  if (evt.detail.to == "/agregarEvento") {
    EVENTO.style.display = "block";
  }
  if (evt.detail.to == "/eventos") {
    EVENTOS.style.display = "block";
  }
  if (evt.detail.to == "/informe") {
    INFORME.style.display = "block";
  }
  if (evt.detail.to == "/mapa") {
    MAPA.style.display = "block";
  }
  // ACA VAN SUMANDO IF DE ACUERDO A LA CANTIDAD DE PANTALLAS QUE TENGAN
}

function ocultarPantallas() {
  HOME.style.display = "none";
  LOGIN.style.display = "none";
  REGISTRO.style.display = "none";
  EVENTO.style.display = "none";
  EVENTOS.style.display = "none";
  INFORME.style.display = "none";
  MAPA.style.display = "none";
  // ACA RECUERDEN DE OCULTAR CADA PANTALLA QUE CREAN
}

function ocultarBotones() {
  document.querySelector("#btnHome").style.display = "none";
  document.querySelector("#btnLogin").style.display = "none";
  document.querySelector("#btnRegistrar").style.display = "none";
  document.querySelector("#btnAgregarEvento").style.display = "none";
  document.querySelector("#btnEventos").style.display = "none";
  document.querySelector("#btnInforme").style.display = "none";
  document.querySelector("#btnMapa").style.display = "none";
  document.querySelector("#btnLogout").style.display = "none";
}

function mostrarMenuAnonimo() {
  ocultarBotones();
  document.querySelector("#btnHome").style.display = "block";
  document.querySelector("#btnLogin").style.display = "block";
  document.querySelector("#btnRegistrar").style.display = "block";
}

function mostrarMenuVIP() {
  ocultarBotones();
  document.querySelector("#btnHome").style.display = "block";
  document.querySelector("#btnRegistrar").style.display = "block";
  document.querySelector("#btnAgregarEvento").style.display = "block";
  document.querySelector("#btnEventos").style.display = "block";
  document.querySelector("#btnInforme").style.display = "block";
  document.querySelector("#btnMapa").style.display = "block";
  document.querySelector("#btnLogout").style.display = "block";
}

function chequearSesion() {
  ocultarBotones();
  if (localStorage.getItem("usuario") == null) {
    mostrarMenuAnonimo();
  } else {
    mostrarMenuVIP();
  }
}

// fecha

document.addEventListener("DOMContentLoaded", (event) => {
  limitarFechaActual();
  document
    .querySelector("#txtFecha")
    .addEventListener("ionChange", mostrarFecha);
});

function mostrarFecha(event) {
  let fecha = event.detail.value;
}

function limitarFechaActual() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = ("0" + (hoy.getMonth() + 1)).slice(-2);
  const dia = ("0" + hoy.getDate()).slice(-2);
  const horas = ("0" + hoy.getHours()).slice(-2);
  const minutos = ("0" + hoy.getMinutes()).slice(-2);
  const segundos = ("0" + hoy.getSeconds()).slice(-2);
  const fechaMaxima = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  document.querySelector("#txtFecha").setAttribute("max", fechaMaxima);
}

// login

function previaHacerLogin() {
  let usuario = document.querySelector("#txtUsuario").value;
  let password = document.querySelector("#txtPassword").value;

  let user = new Object();
  user.usuario = usuario;
  user.password = password;

  hacerLogin(user);
}

function hacerLogin(user) {
  fetch(URLBASE + "login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (informacion) {
      console.log(informacion);
      console.log(informacion.id);
      //OJO LA RESPUESTA EN SU OBLIGATORIO si es que viene así
      localStorage.setItem("id", informacion.id);
      localStorage.setItem("token", informacion.apiKey);
      ocultarPantallas();
      HOME.style.display = "block";
      mostrarMenuVIP();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cerrarSesion() {
  ocultarPantallas();
  HOME.style.display = "block";
  mostrarMenuAnonimo();
  localStorage.removeItem("id");
  localStorage.removeItem("token");
}

// registro

function previaHacerRegistro() {
  let usuarioIngresado = document.querySelector("#txtUsuarioRegistro").value;
  let passwordIngresado = document.querySelector("#txtPasswordRegistro").value;
  let departamentoIngresado = document.querySelector("#slcDepartamento").value;
  let ciudadIngresada = document.querySelector("#slcCiudad").value;

  const datosUsuario = {
    usuario: usuarioIngresado,
    password: passwordIngresado,
    departamento: departamentoIngresado,
    ciudad: ciudadIngresada,
  };
  console.log(datosUsuario);
  hacerRegistro(datosUsuario);
}

function hacerRegistro(datosUsuario) {
  fetch(URLBASE + "usuarios.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data && data.error) {
        throw data.error;
      } else {
        mostrarMensaje(
          "SUCCESS",
          null,
          "El usuario ha sido creado correctamente",
          2000
        );
        borrarHacerRegistro();
      }
    })
    .catch(errorCallback);
}

function borrarHacerRegistro() {
  document.querySelector("#txtUsuarioRegistro").value = "";
  document.querySelector("#txtPasswordRegistro").value = "";
  document.querySelector("#slcDepartamento").value = "";
  document.querySelector("#slcCiudad").value = "";
}

function obtenerDepartamentos() {
  fetch("https://babytracker.develotion.com/departamentos.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cargarDepartamento(data);
    })
    .catch(errorCallback);
}

function cargarDepartamento(data) {
  let listaDepartamentos = data.departamentos;

  miLinea = "";
  for (let unDepartamento of listaDepartamentos) {
    miLinea += `<ion-select-option value=${unDepartamento.id}>${unDepartamento.nombre}</ion-select-option>`;
  }
  document.querySelector("#slcDepartamento").innerHTML = miLinea;
}

function obtenerCiudades() {
  let idDepartamento = document.querySelector("#slcDepartamento").value;

  fetch(URLBASE + "ciudades.php?idDepartamento=" + idDepartamento, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cargarCiudades(data);
    })
    .catch(errorCallback);
}

function cargarCiudades(data) {
  let listaCiudades = data.ciudades;

  miLinea = "";
  for (let unaCiudad of listaCiudades) {
    miLinea += `<ion-select-option value=${unaCiudad.id}>${unaCiudad.nombre}</ion-select-option>`;
  }
  document.querySelector("#slcCiudad").innerHTML = miLinea;
}

// eventos

function obtenerCategorias() {
  fetch(URLBASE + "categorias.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      categorias = data.categorias;
      cargarCategorias(data);
    })
    .catch(errorCallback);
}

function cargarCategorias(data) {
  let miSelect = "";
  for (let unaC of data.categorias) {
    miSelect += `
        <ion-select-option value=${unaC.id}>${unaC.tipo}</ion-select-option>`;
  }
  document.querySelector("#slcCategoria").innerHTML = miSelect;
}

function previaHacerEvento() {
  let eventoIngresado = document.querySelector("#slcCategoria").value;
  let fechaIngresado = document.querySelector("#txtFecha").value;
  let detalleIngresado =
    "Detalle: " + document.querySelector("#txtDetalles").value;
  let usuarioCreador = localStorage.getItem("id");

  const datosEvento = {
    idCategoria: eventoIngresado,
    fecha: fechaIngresado,
    detalle: detalleIngresado,
    idUsuario: usuarioCreador,
  };
  console.log(datosEvento);
  hacerEvento(datosEvento);
}

function hacerEvento(datosEvento) {
  fetch(URLBASE + "eventos.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
    body: JSON.stringify(datosEvento),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data && data.error) {
        throw data.error;
      } else {
        mostrarMensaje(
          "SUCCESS",
          null,
          "El evento ha sido creado correctamente",
          2000
        );
        borrarHacerEvento();
      }
    })
    .catch(errorCallback);
}

function borrarHacerEvento() {
  document.querySelector("#slcCategoria").value = "";
  document.querySelector("#txtFecha").value = "";
  document.querySelector("#txtDetalles").value = "";
}

// listado eventos

function obtenerEventos() {
  fetch(`${URLBASE}eventos.php?idUsuario=${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (respuesta) {
      console.log(respuesta);
      // Divide los eventos en dos categorías
      const ahora = new Date();
      const eventosHoy = respuesta.eventos.filter((evento) => {
        const fechaEvento = new Date(evento.fecha);
        return fechaEvento.toDateString() === ahora.toDateString();
      });

      const eventosPrevios = respuesta.eventos.filter((evento) => {
        const fechaEvento = new Date(evento.fecha);
        return fechaEvento < ahora;
      });

      // Llama a hacerListado para cada categoría
      hacerListado(eventosHoy, eventosPrevios);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function hacerListado(eventosHoy, eventosPrevios) {
  let verEventoHoy = ``;
  let verEventoPrevios = ``;

  for (let unEvento of eventosHoy) {
    const categoriaId = unEvento.idCategoria - 30;
    const categoriaIcono = `${URLBASE}imgs/${categoriaId}.png`;
    verEventoHoy += `<ion-item>
            <ion-thumbnail slot="start">
              <img src="${categoriaIcono}" alt="Categoría ${
      unEvento.idCategoria
    }">
            </ion-thumbnail>
            <ion-label>
              <h3>Fecha: ${new Date(unEvento.fecha).toLocaleString()}</h3>
              <p>${unEvento.detalle}</p>
            </ion-label>
            <ion-button onclick="eliminarEvento(${
              unEvento.id
            })">Eliminar</ion-button>
          </ion-item>`;
  }

  for (let unEvento of eventosPrevios) {
    const categoriaId = unEvento.idCategoria - 30;
    const categoriaIcono = `${URLBASE}imgs/${categoriaId}.png`;
    verEventoPrevios += `<ion-item>
            <ion-thumbnail slot="start">
              <img src="${categoriaIcono}" alt="Categoría ${
      unEvento.idCategoria
    }">
            </ion-thumbnail>
            <ion-label>
              <h3>Fecha: ${new Date(unEvento.fecha).toLocaleString()}</h3>
              <p>${unEvento.detalle}</p>
            </ion-label>
            <ion-button onclick="eliminarEvento(${
              unEvento.id
            })">Eliminar</ion-button>
          </ion-item>`;
  }

  document.querySelector("#eventos-del-dia").innerHTML = verEventoHoy;
  document.querySelector("#eventos-anteriores").innerHTML = verEventoPrevios;
}

function eliminarEvento(eventoId) {
  fetch(`${URLBASE}eventos.php?idEvento=${eventoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data && data.error) {
        throw data.error;
      } else {
        mostrarMensaje(
          "SUCCESS",
          null,
          "El evento ha sido eliminado correctamente",
          2000
        );
        obtenerEventos();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// informe

function obtenerInforme() {
  fetch(`${URLBASE}eventos.php?idUsuario=${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cargarInforme(data);
    })
    .catch(errorCallback);
}

function cargarInforme(data) {
  const eventos = data.eventos;
  const hoy = new Date();
  const inicioDia = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate(),
    0,
    0,
    0
  );
  const finDia = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate(),
    23,
    59,
    59
  );

  console.log("Fecha y hora actual:", hoy);
  console.log("Inicio del día:", inicioDia);
  console.log("Fin del día:", finDia);

  const eventosHoy = eventos.filter((evento) => {
    const fechaEvento = new Date(evento.fecha.replace(" ", "T"));
    console.log("Evento fecha:", fechaEvento);
    return fechaEvento >= inicioDia && fechaEvento <= finDia;
  });

  console.log("Eventos de hoy:", eventosHoy);

  let totalBiberones = 0;
  let totalPañales = 0;
  let ultimoBiberon = null;
  let ultimoPañal = null;

  for (let evento of eventosHoy) {
    const fechaEvento = new Date(evento.fecha.replace(" ", "T"));
    if (evento.idCategoria == 35) {
      // Biberón
      totalBiberones++;
      if (
        !ultimoBiberon ||
        fechaEvento > new Date(ultimoBiberon.fecha.replace(" ", "T"))
      ) {
        ultimoBiberon = evento;
      }
    }
    if (evento.idCategoria == 33) {
      // Pañal
      totalPañales++;
      if (
        !ultimoPañal ||
        fechaEvento > new Date(ultimoPañal.fecha.replace(" ", "T"))
      ) {
        ultimoPañal = evento;
      }
    }
  }

  // Si no hay eventos de biberón o pañal hoy, buscar el último evento correspondiente en general
  if (!ultimoBiberon) {
    ultimoBiberon = eventos
      .filter((evento) => evento.idCategoria == 35)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
  }

  if (!ultimoPañal) {
    ultimoPañal = eventos
      .filter((evento) => evento.idCategoria == 33)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
  }

  const ahora = new Date();
  const tiempoDesdeUltimoBiberon = ultimoBiberon
    ? calcularTiempoTranscurrido(
        new Date(ultimoBiberon.fecha.replace(" ", "T")),
        ahora
      )
    : "N/A";
  const tiempoDesdeUltimoPañal = ultimoPañal
    ? calcularTiempoTranscurrido(
        new Date(ultimoPañal.fecha.replace(" ", "T")),
        ahora
      )
    : "N/A";

  console.log("Total de biberones:", totalBiberones);
  console.log("Tiempo desde el último biberón:", tiempoDesdeUltimoBiberon);
  console.log("Total de pañales:", totalPañales);
  console.log(
    "Tiempo desde el último cambio de pañal:",
    tiempoDesdeUltimoPañal
  );

  document.querySelector("#total-biberones").innerHTML = totalBiberones;
  document.querySelector("#tiempo-ultimo-biberon").innerHTML =
    tiempoDesdeUltimoBiberon;

  document.querySelector("#total-panales").innerHTML = totalPañales;
  document.querySelector("#tiempo-ultimo-cambio").innerHTML =
    tiempoDesdeUltimoPañal;
}

function calcularTiempoTranscurrido(desde, hasta) {
  const diffMs = hasta - desde;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  return `${diffHrs}h ${diffMins}m`;
}

function mostrarMensaje(tipo, titulo, texto, duracion) {
  const toast = document.createElement("ion-toast");
  toast.header = titulo;
  toast.message = texto;
  if (!duracion) {
    duracion = 2000;
  }
  toast.duration = duracion;
  if (tipo === "ERROR") {
    toast.color = "danger";
    toast.icon = "alert-circle-outline";
  } else if (tipo === "WARNING") {
    toast.color = "warning";
    toast.icon = "warning-outline";
  } else if (tipo === "SUCCESS") {
    toast.color = "success";
    toast.icon = "checkmark-circle-outline";
  }

  document.body.appendChild(toast);
  toast.present();
}

function errorCallback(error) {
  mostrarMensaje("ERROR", null, error, 2000);
}

// mapa

let miLatitud;
let miLongitud;
let map;
let plazas;
obtenerPlazas();
getMiPosicion();

function inicioMapa() {
  getMiPosicion();
}

function getMiPosicion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(miUbicacion, manejarError, {
      enableHighAccuracy: true,
    });
  } else {
    alert("La geolocalización no es soportada por este navegador.");
  }
}

function miUbicacion(position) {
  miLatitud = position.coords.latitude;
  miLongitud = position.coords.longitude;
  console.log(miLatitud, miLongitud);
}

function obtenerPlazas() {
  fetch(`${URLBASE}plazas.php?idUsuario=${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: localStorage.getItem("token"),
      iduser: localStorage.getItem("id"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.plazas);
      plazas = data.plazas;
      setTimeout(function () {
        armarMapa();
      }, 2500);
    })
    .catch(errorCallback);
}

function armarMapa() {
  map = L.map("map").setView([miLatitud, miLongitud], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let circle = L.circle([miLatitud, miLongitud], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 200,
  }).addTo(map);

  for (let unaPlaza of plazas) {
    let popupContent = `<b>ID Plaza: ${unaPlaza.idPlaza}</b><br>
                         Accesible: ${
                           unaPlaza.accesible === 1 ? "Sí" : "No"
                         }<br>
                         Acepta mascotas: ${
                           unaPlaza.aceptaMascotas === 1 ? "Sí" : "No"
                         }`;

    let marker = L.marker([unaPlaza.latitud, unaPlaza.longitud]).addTo(map);
    marker.bindPopup(popupContent).openPopup();
  }
}

function manejarError(error) {
  console.error(`Error al obtener la ubicación: ${error.message}`);
  alert(`Error al obtener la ubicación: ${error.message}`);
}
