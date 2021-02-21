import { Schema, model } from 'mongoose'

const PeliculaSchema = new Schema({
    id: String,
    nombre: String,
    recauentrada: Number,
    numdias: Number,
    recauotros: Number,
    gastos: Number,
    sueldoempleado: Number,
    numeroempleados: Number,
    numpers: Number
},{
    collection:'peliculas'
})


const ActorSchema = new Schema({
    codigo: Number,
    nombre: String,
    pelicula: String,
    peliculasRealizadas: Number,
    tiempoPantalla: Number,
    vecesProtagonista:Number,
    vecesAntagonista: Number
},{
    collection:'actores'
})



export const Peliculas = model('peliculas', PeliculaSchema  )
export const Actores = model('actores', ActorSchema  )
