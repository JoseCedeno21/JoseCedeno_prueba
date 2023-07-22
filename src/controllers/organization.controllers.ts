import { Request, Response } from 'express';
import Organization from '../models/organization.models';
import Responses from '../utils/responses';

const responses = new Responses();

class OrganizationController {

  // Función para obtener una organizacion por id
  getOrganization = async (req: Request, res: Response): Promise<Response> => {
    const id_organization: string = req.params.id;
    try {
      const organization: Object = await Organization.findByPk(id_organization);
      if(!organization) return responses.notFound(res, 'Organization not found')
      const message: String = 'Organization getting succesfully';
      return responses.success(res, message, organization);
    } catch (error) {
      return responses.unknownError(res, error);
    }
  }

  //Funcion para crear una nueva organización
  createOrganization = async (req: Request, res: Response): Promise<Response> => {

    const {
      name,
      status
    } : {
      name: String,
      status: String
    } = req.body

    if(!name || !status) return responses.preconditionFailed(res, 'Name and Status are required')
    
    try {
      const organization: Object = await Organization.create({ 
        name,
        status
      });
      const response: Object = {
        statusCode: 200,
        payload: organization
      };
      const message: String = 'Organization created sucessfully';
      return responses.success(res, message, response);
    } catch (error) {
      return responses.unknownError(res, error);
    }
  }

  //Función para actualizar una organizacion mediante un id
  updateOrganization = async (req: Request, res: Response): Promise<Response> => {
    const id_organization: string = req.params.id;
    const {
      name,
      status
    } : {
      name: String,
      status: String
    } = req.body;

    if(!id_organization) return responses.preconditionFailed(res, 'El id es requerido');
    
    try {
      const organizationUpate: Object = await Organization.update({ 
        name,
        status
      },{
        where:{id_organization}
      });
      const message: String = 'Organization updated sucessfully';
      return responses.success(res, message, organizationUpate);
    } catch (error) {
      return responses.unknownError(res, error);
    }
  }

  //Función para eliminar una organización
  deleteOrganization = async (req: Request, res: Response): Promise<Response> => {
    
    const id_organization: string = req.params.id;

    if(!id_organization) return responses.preconditionFailed(res, 'El id es requerido');
    
    try {
      const organizationDeleted = await Organization.destroy({ where: {id_organization }});
      const message: String = 'Organization deleted sucessfully';
      return responses.success(res, message, organizationDeleted);
    } catch (error) {
      return responses.unknownError(res, error);
    }
  }
}

export default OrganizationController
 