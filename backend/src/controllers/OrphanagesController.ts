import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import orphanageView from '../views/orphanage_view'
import * as Yup from 'yup'

import Orfanage from '../models/Orphanage'


export default {
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orfanage)
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })
        
        return res.json(orphanageView.renderMany(orphanages))
    },
    async create(req: Request, res: Response){
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = req.body
        const orphanagesRepository = getRepository(Orfanage)

        const reqImages = req.files as Express.Multer.File[]
        const images = reqImages.map(image=>{
            return {
                path: image.filename
            }
        })

        const data = { name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends: open_on_weekends === 'true', 
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))

        })

        await schema.validate(data, {
            abortEarly: false
        })

        const newOrphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(newOrphanage)

        return res.status(201).json(newOrphanage)
    },
    async show(req: Request, res: Response){
        const {id} = req.params
        const orphanagesRepository = getRepository(Orfanage)
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })
        
        return res.json(orphanageView.render(orphanage))
    }
}