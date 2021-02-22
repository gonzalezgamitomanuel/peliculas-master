"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actores = exports.Peliculas = void 0;
const mongoose_1 = require("mongoose");
const PeliculaSchema = new mongoose_1.Schema({
    id: String,
    nombre: String,
    recauentrada: Number,
    numdias: Number,
    sueldoactor: Number,
    numeroactores: Number,
}, {
    collection: 'peliculas'
});
const ActorSchema = new mongoose_1.Schema({
    codigo: Number,
    nombre: String,
    pelicula: String,
    peliculasRealizadas: Number,
    tiempoPantalla: Number,
    vecesProtagonista: Number,
    vecesAntagonista: Number
}, {
    collection: 'actores'
});
exports.Peliculas = mongoose_1.model('peliculas', PeliculaSchema);
exports.Actores = mongoose_1.model('actores', ActorSchema);
