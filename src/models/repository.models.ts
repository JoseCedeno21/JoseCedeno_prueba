import { DataTypes, Sequelize } from "sequelize";
import db from '../config/db'
import Tribe from "./tribe.models";

const Repository = db.define('repository',{
    id_repository:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    state:{
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    create_time:{
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    status:{
        type: DataTypes.CHAR(1),
        allowNull: false
    },
},{
    timestamps: false,
})

Tribe.hasMany(Repository, {foreignKey: 'id_tribe'})
Repository.belongsTo(Tribe, { foreignKey: 'id_tribe' })

Repository.sync();

export default Repository
