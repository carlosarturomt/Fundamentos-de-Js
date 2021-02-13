const amarillo = document.getElementById('amarillo')
const azul = document.getElementById('azul')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 20

swal('', 'Instrucciones: Se iluminarán las casas de Hogwarts, y lo que tienes que haccer es marcar las correspondientes.', '')

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.cambiarNivel = this.cambiarNivel.bind(this)

        this._this = this
        this.toggleBtEmpezar()
        this.nivel = 1
        this.colores = {
            amarillo,
            azul,
            rojo,
            verde
        }
    }

    toggleBtEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {

        if (this.nivel === 1) this.cambiarNivel()

        else swal(`Nivel ${this.nivel - 1} superado`, `Siguiente nivel: ${this.nivel}`, 'success')
            .then(this.cambiarNivel)
    }


    cambiarNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agergarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'amarillo'
            case 1:
                return 'azul'
            case 2:
                return 'rojo'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'amarillo':
                return 0
            case 'azul':
                return 1
            case 'rojo':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() =>
                this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agergarEventosClick() {
        this.colores.amarillo.addEventListener('click', this.elegirColor)
        this.colores.azul.addEventListener('click', this.elegirColor)
        this.colores.rojo.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    elimiarEventosClick() {
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
        this.colores.azul.removeEventListener('click', this.elegirColor)
        this.colores.rojo.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
                if (this.subnivel == this.nivel) {
                    this.nivel++
                        this.elimiarEventosClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        setTimeout(this.siguienteNivel, 1500)
                    }
                }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('', '¡Felicitaciones, ganaste el juego!', 'success')
            .then(this.inicializar)
    }

    perdioElJuego() {
        swal('', 'Vaya, perdiste el juego, a trabajar esas habilidades cognitivas.', 'error')
            .then(() => {
                this.elimiarEventosClick()
                this.inicializar()
            })
    }

}

function empezarJuego() {
    window.juego = new Juego()
}