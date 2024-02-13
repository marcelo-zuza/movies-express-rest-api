import { Request, Response } from "express";
// models
import { MovieModel } from "../models/Movie";
// Logger
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body
        const movie = await MovieModel.create(data);
        res.status(201).json(movie)
    } catch (e: any) {
        Logger.error(`System error: ${e.message}`);
        return res.status(500).json({error: "ERRO! Por favor tente mais tarde"})
    }
}

export async function findMovieById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)

        if(!movie) {
            return res.status(404).json({error: "Can't find this movie"})
        }
        return res.status(200).json(movie)
    } catch (e: any){
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "ERRO! Por favor tente mais tarde"})

    }
}

export async function getAllMovies(req: Request, res: Response){
    try {
        const movies = await MovieModel.find()
        return res.status(200).json(movies)
    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "ERRO! Por favor tente mais tarde"})

    }
}

export async function removeMovie(req: Request, res: Response){
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)

        if(!movie){
            return res.status(404).json({error: "Can't find this movie"})
        }
        await movie.deleteOne()
        return res.status(200).json({msg: "Deleted Successfully"})

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "ERRO! Por favor tente mais tarde"})

    }
}

export async function updateMovie(req: Request, res: Response){
    const id = req.params.id
    const data = req.body
    const movie = await MovieModel.findById(id)
    try {
        if(!movie){
            return res.status(404).json({error: "Can't find this movie"})
    }
    await MovieModel.updateOne({_id: id}, data)
    return res.status(200).json(data)

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "ERRO! Por favor tente mais tarde"})

    }
}
