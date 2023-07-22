import { DataTypes } from "sequelize";
import db from '../config/db'
import Repository from "./repository.models";

const Metrics = db.define('metrics',{
    id_repository:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    couverage:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    bugs:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vulnerabilities:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hotspot:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    code_smells:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
})

Repository.hasOne(Metrics, { foreignKey: 'id_repository' })
Metrics.belongsTo(Repository, { foreignKey: 'id_repository' })

Metrics.sync();

export default Metrics
