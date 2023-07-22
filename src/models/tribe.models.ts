import { DataTypes } from "sequelize";
import db from '../config/db'
import Organization from "./organization.models";

const Tribe = db.define('tribe',{
    id_tribe:{
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
},{
    timestamps: false,
})

Organization.hasMany(Tribe, {foreignKey: 'id_organization'})
Tribe.belongsTo(Organization, { foreignKey: 'id_organization' })

Tribe.sync();

export default Tribe
