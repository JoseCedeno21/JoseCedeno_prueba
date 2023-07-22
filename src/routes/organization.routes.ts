import { Router } from 'express';
import OrganizationController from '../controllers/organization.controllers';

const organizationRoutes = Router();
const organizationController = new OrganizationController();

organizationRoutes.get('/:id', organizationController.getOrganization);
organizationRoutes.post('/', organizationController.createOrganization);
organizationRoutes.put('/:id', organizationController.updateOrganization);
organizationRoutes.delete('/:id', organizationController.deleteOrganization);

export default organizationRoutes;
