import { Sequelize} from 'sequelize';
import * as dotenv from "dotenv";
dotenv.config()

// Connect to CockroachDB through Sequelize.
const connectionString: String = process.env.DATABASE_URL
const sequelizeConnection = new Sequelize(`${connectionString}`,
{
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false
});
  
export default sequelizeConnection