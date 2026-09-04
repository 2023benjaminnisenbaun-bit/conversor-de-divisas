// ==========================================
// TASAS DE CAMBIO
// ==========================================

// Las tasas están expresadas tomando USD como referencia.
// Ejemplo:
// 1 USD = 1400 ARS
// 1 USD = 0.85 EUR

const tasas = {
    ARS: 1400,
    USD: 1,
    EUR: 0.85
};


// ==========================================
// ELEMENTOS HTML
// ==========================================

const inputMonto = document.getElementById("input-monto");

const selectOrigen =
    document.getElementById("select-moneda-origen");

const selectDestino =
    document.getElementById("select-moneda-destino");

const btnConvertir =
    document.getElementById("btn-convertir");

const contenedorDesglose =
    document.getElementById("contenedor-desglose");

const contenedorResultadoFinal =
    document.getElementById("contenedor-resultado-final");

const desgloseMonto =
    document.getElementById("desglose-monto");

const desgloseTasa =
    document.getElementById("desglose-tasa");

const desgloseResultado =
    document.getElementById("desglose-resultado");

const resultadoFinal =
    document.getElementById("resultado-final");

const valorPegatina =
    document.getElementById("valor-pegatina");

const pizarron =
    document.getElementById("pizarron-notas");


// ==========================================
// CONVERTIR DIVISAS
// ==========================================

btnConvertir.addEventListener("click", function () {

    const monto = parseFloat(inputMonto.value);

    const monedaOrigen = selectOrigen.value;
    const monedaDestino = selectDestino.value;


    // Validar monto

    if (isNaN(monto) || monto <= 0) {

        alert("Por favor, ingresá un monto válido.");

        return;
    }


    // ======================================
    // CÁLCULO
    // ======================================

    // Primero pasamos el monto a USD

    const montoEnUSD =
        monto / tasas[monedaOrigen];


    // Después pasamos USD a la moneda destino

    const resultado =
        montoEnUSD * tasas[monedaDestino];


    // Tasa específica entre las dos monedas

    const tasa =
        tasas[monedaDestino] / tasas[monedaOrigen];


    // ======================================
    // FORMATEAR RESULTADOS
    // ======================================

    const montoFormateado =
        monto.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    const resultadoFormateado =
        resultado.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    const tasaFormateada =
        tasa.toLocaleString("es-AR", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        });


    // ======================================
    // ACTUALIZAR DESGLOSE
    // ======================================

    desgloseMonto.textContent =
        `${montoFormateado} ${monedaOrigen}`;

    desgloseTasa.textContent =
        `1 ${monedaOrigen} = ${tasaFormateada} ${monedaDestino}`;

    desgloseResultado.textContent =
        `${resultadoFormateado} ${monedaDestino}`;


    // ======================================
    // RESULTADO FINAL
    // ======================================

    resultadoFinal.textContent =
        `${resultadoFormateado} ${monedaDestino}`;


    // ======================================
    // ENVIAR RESULTADO AL GENERADOR
    // ======================================

    valorPegatina.textContent =
        `${resultadoFormateado} ${monedaDestino}`;


    // ======================================
    // ACTUALIZAR LAS 6 PEGATINAS
    // ======================================

    const valoresPegatinas =
        document.querySelectorAll(".valor-pegatina-diseno");

    valoresPegatinas.forEach(function (elemento) {

        elemento.textContent =
            `${resultadoFormateado} ${monedaDestino}`;

    });


    // Mostrar resultado

    contenedorDesglose.style.display = "block";
    contenedorResultadoFinal.style.display = "flex";

});


// ==========================================
// GUARDAR PEGATINAS
// ==========================================

const pegatinas =
    document.querySelectorAll(".pegatina");


pegatinas.forEach(function (pegatina) {

    const botonGuardar =
        pegatina.querySelector(".btn-guardar");


    // Click en la pegatina

    pegatina.addEventListener("click", function (evento) {

        // Si se hizo click en el botón,
        // evitamos guardar dos veces.

        if (evento.target.classList.contains("btn-guardar")) {
            return;
        }

        guardarPegatina(pegatina);

    });


    // Click en botón Guardar

    botonGuardar.addEventListener("click", function (evento) {

        evento.stopPropagation();

        guardarPegatina(pegatina);

    });

});


// ==========================================
// FUNCIÓN PARA GUARDAR
// ==========================================

function guardarPegatina(pegatina) {

    const valor =
        pegatina.querySelector(".valor-pegatina-diseno").textContent;


    // No permitir guardar una pegatina vacía

    if (valor === "--") {

        alert("Primero realizá una conversión.");

        return;
    }


    // Crear copia

    const copia =
        pegatina.cloneNode(true);


    // Agregar clase de pegatina guardada

    copia.classList.add("pegatina-guardada");


    // Eliminar botón de guardar

    const boton =
        copia.querySelector(".btn-guardar");

    if (boton) {
        boton.remove();
    }


    // Agregar al pizarrón

    pizarron.appendChild(copia);


    // Eliminar mensaje de pizarrón vacío

    const mensaje =
        pizarron.querySelector(".pizarron-vacio");

    if (mensaje) {
        mensaje.remove();
    }

}
