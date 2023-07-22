import { DataTypes } from "sequelize";
import db from '../config/db'

const Organization = db.define('organization',{
    id_organization:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
})

Organization.sync();

export default Organization
