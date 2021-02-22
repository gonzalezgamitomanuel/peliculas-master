import {Request, Response, Router } from 'express'
import { Peliculas, Actores } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getPeliculas = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Peliculas.aggregate([
                {
                    $lookup: {
                        from: 'actores',
                        localField: 'nombre',
                        foreignField: 'pelicula',
                        as: "actores"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getPelicula = async (req:Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Peliculas.aggregate([
                {
                    $lookup: {
                        from: 'actores',
                        localField: 'nombre',
                        foreignField: 'pelicula',
                        as: "actores"
                    }
                },{
                    $match: {
                        id:id
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postPelicula = async (req: Request, res: Response) => {
        const { id, nombre, recauentrada, numdias, sueldoactor, numeroactores } = req.body
        await db.conectarBD()
        const dSchema={
            id: id,
            nombre: nombre,
            recauentrada: recauentrada,
            numdias: numdias,
            sueldoactor: sueldoactor,
            numeroactores: numeroactores
        }
        const oSchema = new Peliculas(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
    private postActor = async (req: Request, res: Response) => {
        const { codigo, nombre, pelicula, peliculasRealizadas, tiempoPantalla, 
        vecesProtagonista, vecesAntagonista } = req.body
        await db.conectarBD()
        const dSchema={
            codigo: codigo,
            nombre: nombre,
            pelicula: pelicula,
            peliculasRealizadas: peliculasRealizadas,
            tiempoPantalla: tiempoPantalla,
            vecesProtagonista: vecesProtagonista,
            vecesAntagonista: vecesAntagonista
        }
        const oSchema = new Actores(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    

    private getActor = async (req:Request, res: Response) => {
        const {  codigo,pelicula } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const a = await Actores.findOne({
                codigo: codigo,
                pelicula: pelicula
            })
            res.json(a)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }


    private updateActor = async (req: Request, res: Response) => {
        const {codigo,pelicula} = req.params
        const { nombre, peliculasRealizadas, tiempoPantalla, vecesProtagonista, vecesAntagonista } = req.body
        await db.conectarBD()
        await Actores.findOneAndUpdate({
            codigo: codigo,
            pelicula:pelicula
        },{
            codigo: codigo,
            nombre:nombre,
            pelicula: pelicula,
            peliculasRealizadas: peliculasRealizadas,
            tiempoPantalla: tiempoPantalla,
            vecesProtagonista: vecesProtagonista,
            vecesAntagonista: vecesAntagonista
        },{
            new:true,
            runValidators:true
        }
        )
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updatePelicula = async (req: Request, res: Response) => {
        const {id} =req.params
        const {  nombre,recauentrada,numdias,sueldoactor,numeroactores } = req.body
        await db.conectarBD()
        await Peliculas.findOneAndUpdate({
            id: id
        },{
            id:id,
            nombre:nombre,
            recauentrada:recauentrada,
            numdias:numdias,
            sueldoactor:sueldoactor,
            numeroactores:numeroactores
        },{
            new:true,
            runValidators:true
        }
        )
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }


    private deleteActor = async (req: Request, res: Response) => {
        const { pelicula,codigo} = req.params
        await db.conectarBD()
        await Actores.findOneAndDelete(
            { codigo: codigo,pelicula: pelicula}, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        res.send(`No encontrado`)
                    }else {
                        res.send('Actor eliminado: '+ doc)
                    }
                }
            })
        db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/peliculas', this.getPeliculas),
        this._router.get('/pelicula/:id', this.getPelicula),
        this._router.post('/', this.postPelicula),
        this._router.post('/actor', this.postActor),
        this._router.get('/actor/:codigo&:pelicula', this.getActor),
        this._router.post('/actor/:codigo&:pelicula', this.updateActor),
        this._router.post('/pelicula/:id', this.updatePelicula),
        this._router.get('/deleteActor/:codigo&:pelicula', this.deleteActor)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router









