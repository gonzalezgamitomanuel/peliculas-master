"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animales = exports.Centros = void 0;
const mongoose_1 = require("mongoose");
const PeliculaSchema = new mongoose_1.Schema({
    id: String,
    nombre: String,
    recauentrada: Number,
    numdias: Number,
    sueldoactor: Number,
    numeroactores: Number
}, {
    collection: 'peliculas'
});
const ActorSchema = new mongoose_1.Schema({
    codigo: String,
    nombre: String,
    pelicula: String,
    peliculasRealizadas: Number,
    tiempoPantalla: Number,
    vecesProtagonista: Number,
    vecesAntagonista: Number
}, {
    collection: 'actores'
});
exports.Centros = mongoose_1.model('peliculas', PeliculaSchema);
exports.Animales = mongoose_1.model('actores', ActorSchema);
