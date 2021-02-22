"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const schemas_1 = require("../model/schemas");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        this.getPeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Peliculas.aggregate([
                    {
                        $lookup: {
                            from: 'actores',
                            localField: 'nombre',
                            foreignField: 'pelicula',
                            as: "actores"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getPelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Peliculas.aggregate([
                    {
                        $lookup: {
                            from: 'actores',
                            localField: 'nombre',
                            foreignField: 'pelicula',
                            as: "actores"
                        }
                    }, {
                        $match: {
                            id: id
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postPelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, recauentrada, numdias, sueldoactor, numeroactores } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                id: id,
                nombre: nombre,
                recauentrada: recauentrada,
                numdias: numdias,
                sueldoactor: sueldoactor,
                numeroactores: numeroactores
            };
            const oSchema = new schemas_1.Peliculas(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.postActor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { codigo, nombre, pelicula, peliculasRealizadas, tiempoPantalla, vecesProtagonista, vecesAntagonista } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                codigo: codigo,
                nombre: nombre,
                pelicula: pelicula,
                peliculasRealizadas: peliculasRealizadas,
                tiempoPantalla: tiempoPantalla,
                vecesProtagonista: vecesProtagonista,
                vecesAntagonista: vecesAntagonista
            };
            const oSchema = new schemas_1.Actores(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.getActor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { codigo, pelicula } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const a = yield schemas_1.Actores.findOne({
                    codigo: codigo,
                    pelicula: pelicula
                });
                res.json(a);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.updateActor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { codigo, pelicula } = req.params;
            const { nombre, peliculasRealizadas, tiempoPantalla, vecesProtagonista, vecesAntagonista } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Actores.findOneAndUpdate({
                codigo: codigo,
                pelicula: pelicula
            }, {
                codigo: codigo,
                nombre: nombre,
                pelicula: pelicula,
                peliculasRealizadas: peliculasRealizadas,
                tiempoPantalla: tiempoPantalla,
                vecesProtagonista: vecesProtagonista,
                vecesAntagonista: vecesAntagonista
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updatePelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, recauentrada, numdias, sueldoactor, numeroactores } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Peliculas.findOneAndUpdate({
                id: id
            }, {
                id: id,
                nombre: nombre,
                recauentrada: recauentrada,
                numdias: numdias,
                sueldoactor: sueldoactor,
                numeroactores: numeroactores
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteActor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pelicula, codigo } = req.params;
            yield database_1.db.conectarBD();
            yield schemas_1.Actores.findOneAndDelete({ codigo: codigo, pelicula: pelicula }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        res.send(`No encontrado`);
                    }
                    else {
                        res.send('Actor eliminado: ' + doc);
                    }
                }
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/peliculas', this.getPeliculas),
            this._router.get('/pelicula/:id', this.getPelicula),
            this._router.post('/', this.postPelicula),
            this._router.post('/actor', this.postActor),
            this._router.get('/actor/:codigo&:pelicula', this.getActor),
            this._router.post('/actor/:codigo&:pelicula', this.updateActor),
            this._router.post('/pelicula/:id', this.updatePelicula),
            this._router.get('/deleteActor/:codigo&:pelicula', this.deleteActor);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
