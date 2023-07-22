import db, { Op } from "sequelize";
import { Request, Response } from 'express';
import Repository from '../models/repository.models';
import Organization from '../models/organization.models';
import Tribe from '../models/tribe.models';
import Metrics from '../models/metrics.models';
import axios from 'axios';
import Responses from '../utils/responses';

const responses = new Responses();

const csvWriter = require('csv-writer').createObjectCsvStringifier;

interface metricsPayload {
    id: number,
    name: string,
    tribe: string,
    organization: string,
    coverage: string,
    codeSmells: number,
    bugs: number,
    vulnerabilities: number,
    hotspots: number,
    verificationState: string,
    state: string
};

class MetricsController {
    
    public codes: Object = {
        604: 'Verificado',
        605: 'En espera',
        606: 'Aprobado'
    }

    public states: Object = {
        E: 'Enable',
        D: 'Disable',
        A: 'Archived'
    }

    getVerificationCode = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload: Object = {
                repositories:[
                    {
                        id: '884243106732933121',
                        state: 604
                    },
                    {
                        id: '884243107219996673',
                        state: 605
                    }
                ]
            };
            const message: String = 'Verification codes getting sucessfully';
            return responses.success(res, message, payload);
        } catch (error) {
            return responses.unknownError(res, error);
        }
    }

    getMetrics = async (req: Request, res: Response): Promise<Response> => {
        const id_tribe: String = req.params.id;
        const {
            date,
            state = 'E',
            coverage = 0.75
        } = req.query;

        if(!id_tribe) return responses.preconditionFailed(res, 'Id tribe is required');

        try {
            let generalMetrics: any = await Repository.findAll({
                include: [{
                    model: Tribe,
                    include:[{
                        model: Organization
                    }]
                },{
                    model: Metrics,
                    required: false,
                    where:{
                        couverage:{
                            [Op.gt]: coverage
                        }
                    }
                }],
                where:{
                    create_time: date ? 
                        db.where(db.fn('date', db.col('repository.create_time')), '=', date) 
                        : db.where(db.fn("date_part",'YEAR', db.col('repository.create_time')), new Date().getFullYear()),
                    id_tribe: id_tribe,
                    state: state
                }
            });
            console.log('generalMetrics',generalMetrics);
            if(!generalMetrics || !generalMetrics.length){
                const message: String = 'La Tribu no se encuentra registrada';
                return responses.notFound(res, message);
            }; 
            if(!generalMetrics.find((m: any) => m.metric)){
                const message: String = 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria';
                return responses.notFound(res, message);
            };
            //Obtener los codigos de verificacion de los repositorios  
            const {data} = await axios.get('http://localhost:8080/api/metrics/verificationCode');
            let repositories: metricsPayload[] = []

            for (const item of generalMetrics) {
                let metrics: metricsPayload = {
                    id: item.id_repository,
                    name: item.name,
                    tribe: item.tribe.name,
                    organization: item.tribe.organization.name,
                    coverage: `${(parseFloat(item.metric.couverage) * 100).toFixed(2)}%`,
                    codeSmells: item.metric.couverage,
                    bugs: item.metric.bugs,
                    vulnerabilities: item.metric.vulnerabilities,
                    hotspots: item.metric.hotspot,
                    verificationState: this.codes[(data.payload.repositories.find((d: any) => d.id)).state],
                    state: this.states[item.state]
                };
                repositories.push(metrics);
            };
            const payload = { repositories };
            const message: String = 'Metrics getting sucessfully';
            return responses.success(res, message, payload);
        } catch (error) {
            return responses.unknownError(res, error);
        }
    }

    getCsvMetrics = async (req: Request, res: Response): Promise<Response> => {
        const id_tribe: String = req.params.id;

        if(!id_tribe) return responses.preconditionFailed(res, 'Id tribe is required');

        try {
            const { data } = await axios.get(`http://localhost:8080/api/metrics/${id_tribe}`);
            if(!data || !data.payload || !data.payload.repositories) return responses.notFound(res, 'Metrics not found')
            const datas: metricsPayload[] = data.payload.repositories;
            const writer = csvWriter({
                header: [
                    {id: 'id', title: 'Id'},
                    {id: 'name', title: 'Name'},
                    {id: 'tribe', title: 'Tribe'},
                    {id: 'organization', title: 'Organization'},
                    {id: 'coverage', title: 'Coverage'},
                    {id: 'codeSmells', title: 'Code Smells'},
                    {id: 'bugs', title: 'Bugs'},
                    {id: 'vulnerabilities', title: 'Vulnerabilities'},
                    {id: 'hotspots', title: 'Hotspot'},
                    {id: 'verificationState', title: 'Verification State'},
                    {id: 'state', title: 'State'}
                ]
            });
            const csvfile = writer.stringifyRecords(datas);
            res.attachment('reporte.csv');
            return res.status(200).send(csvfile);
        } catch (error) {
            return responses.unknownError(res, error);
        }
    }

}

export default MetricsController
