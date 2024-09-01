import UserModel from './user.model.js';
import CampaignModel from './campaign.model.js';
import CustomerModel from './customer.model.js';
import BankModel from './bank.model.js';
import DonationModel from './donation.model.js';
import NoveltyModel from './novelty.model.js';
import ReasonsModel from './reasons.model.js';
import DonationNoveltyModel from './donation-novelty.model.js';
import DonationReasonModel from './donation-reason.model.js';
import CountryModel from "./country.model.js";
import StateModel from "./state.model.js";
import CityModel from "./city.model.js";
import {seedDatabase} from '../database/seed.database.js';
import {sequelize} from "../database/main.database.js";


////Relaciones en las Donaciones
// Relación uno a muchos entre Usuario y Donaciones
UserModel.hasMany(DonationModel,{foreignKey:'user_id'});
DonationModel.belongsTo(UserModel,{foreignKey:'user_id'});

// Relación uno a muchos entre Donantes y Donaciones
CustomerModel.hasMany(DonationModel,{foreignKey:'customer_id'});
DonationModel.belongsTo(CustomerModel, {foreignKey:'customer_id'});

//Relacion de uno a muchos entre Campañas y Donaciones
CampaignModel.hasMany(DonationModel, {foreignKey:'campaign_id'});
DonationModel.belongsTo(CampaignModel, {foreignKey:'campaign_id'});

//Relacion uno a muchos entre Cuentas bancarias y donaciones
BankModel.hasMany(DonationModel, {foreignKey: 'account_id'});
DonationModel.belongsTo(BankModel, {foreignKey: 'account_id'})

// Relación muchos a muchos entre Donaciones y Novedades
DonationModel.belongsToMany(NoveltyModel,{through:DonationNoveltyModel, foreignKey:'donation_id'});
NoveltyModel.belongsToMany(DonationModel, {through:DonationNoveltyModel, foreignKey: 'novelty_id'});

//Relacion de muchos a muchos entre Donaciones y Motivos de oracion
DonationModel.belongsToMany(ReasonsModel, {through:DonationReasonModel, foreignKey: 'donation_id'});
ReasonsModel.belongsToMany(DonationModel,{through:DonationReasonModel, foreignKey:'reason_id'});


//Relaciones en bancos:
// Relación entre la cuenta bancaria y el usuario que la creó
BankModel.belongsTo(UserModel, { as: 'creator', foreignKey: 'created_by' });

// Relación entre la cuenta bancaria y el usuario que la actualizó
BankModel.belongsTo(UserModel, { as: 'updater', foreignKey: 'updated_by' });

//Relaciones en Campañas
// Relación entre la Campaña y el usuario que la creó
CampaignModel.belongsTo(UserModel, { as: 'creator', foreignKey: 'created_by' });

// Relación entre la Campaña y el usuario que la actualizó
CampaignModel.belongsTo(UserModel, { as: 'updater', foreignKey: 'updated_by' });

//Relaciones en Clientes
// Relación entre el cliente y el usuario que la creó
CustomerModel.belongsTo(UserModel, { as: 'creator', foreignKey: 'created_by' });

// Relación entre el cliente y el usuario que la actualizó
CustomerModel.belongsTo(UserModel, { as: 'updater', foreignKey: 'updated_by' });

//Relaciones en Novedades
// Relación entre el cliente y el usuario que la creó
NoveltyModel.belongsTo(UserModel, { as: 'creator', foreignKey: 'created_by' });

// Relación entre el cliente y el usuario que la actualizó
NoveltyModel.belongsTo(UserModel, { as: 'updater', foreignKey: 'updated_by' });

//Relaciones en Motivos de Oracion
// Relación entre el cliente y el usuario que la creó
ReasonsModel.belongsTo(UserModel, { as: 'creator', foreignKey: 'created_by' });

// Relación entre el cliente y el usuario que la actualizó
ReasonsModel.belongsTo(UserModel, { as: 'updater', foreignKey: 'updated_by' });

//Relaciones entre tablas de paises y ciudades
// Relación uno a muchos entre País y Departamento
CountryModel.hasMany(StateModel, { foreignKey: 'country_id' });
StateModel.belongsTo(CountryModel, { foreignKey: 'country_id' });

// Relación uno a muchos entre Departamento y Ciudad
StateModel.hasMany(CityModel, { foreignKey: 'state_id' });
CityModel.belongsTo(StateModel, { foreignKey: 'state_id' });

// Relación uno a muchos entre Pais y Cliente
CustomerModel.belongsTo(CountryModel, { foreignKey: 'country_id' });
CountryModel.hasMany(CustomerModel, { foreignKey: 'country_id' });

// Relación uno a muchos entre Estados y Cliente
CustomerModel.belongsTo(StateModel, { foreignKey: 'state_id' });
StateModel.hasMany(CustomerModel, { foreignKey: 'state_id' });

// Relación uno a muchos entre Ciudad y Cliente
CustomerModel.belongsTo(CityModel, { foreignKey: 'city_id' });
CityModel.hasMany(CustomerModel, { foreignKey: 'city_id' });




export const syncDb = async() => {

    //await UserModel.sync({alter: true});
    //await CampaignModel.sync({alter: true, force: true});
    //await BankModel.sync({alter: true});
    //await DonationModel.sync({alter: true, force: true});
    //await NoveltyModel.sync({alter: true, force: true});
    //await ReasonsModel.sync({alter: true, force: true});
    //await DonationNoveltyModel.sync({alter: true, force: true});
    //await DonationReasonModel.sync({alter: true, force: true});
    //await CountryModel.sync({alter: true});
    //await StateModel.sync({alter: true});
    //await CityModel.sync({alter: true});
    //await CustomerModel.sync({alter: true});
    //await sequelize.sync({alter: true, force: true});
    //await seedDatabase()
}

export const model = {
    UserModel,
    CampaignModel,
    CustomerModel,
    BankModel,
    DonationModel,
    NoveltyModel,
    ReasonsModel,
    DonationNoveltyModel,
    DonationReasonModel,
    CountryModel,
    StateModel,
    CityModel
}