import express from 'express';
import bodyParser from 'body-parser';
import organizationRoute from './routes/organization.routes'; 
import sequelizeConnection from './config/db'
import metricsRoutes from './routes/metrics.routes';

const app = express();

app.use(bodyParser.json());
app.use('/api/organization', organizationRoute);
app.use('/api/metrics', metricsRoutes);
    
try {
    sequelizeConnection.authenticate()
    console.log('connected to db')
} catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message)
    } else {
        throw new Error('Internal server error')
    }
}
 
export default app;
