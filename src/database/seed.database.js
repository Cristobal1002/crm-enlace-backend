import fs from 'fs';
import path from 'path';
import { sequelize } from './main.database.js';
import CityModel from '../models/city.model.js';

export const seedDatabase = async () => {
    try {
        // Leer el archivo JSON que contienen los scripts y el JSON
        const customersPath = path.resolve('src/database/scripts/populate.customers.sql')
        const countriesPath = path.resolve('src/database/scripts/populate.countries.sql')
        const statesPath = path.resolve('src/database/scripts/populate.states.sql')
        const citiesPath = path.resolve('src/database/scripts/cities.json');

        /*const countryQuery = fs.readFileSync(countriesPath,{encoding: 'utf-8'})
        await sequelize.query(countryQuery)

        const stateQuery = fs.readFileSync(statesPath,{encoding: 'utf-8'})
        await sequelize.query(stateQuery)

        const citiesData = fs.readFileSync(citiesPath, 'utf8');
        const cities = JSON.parse(citiesData);*/

        const customerQuery = fs.readFileSync(customersPath, 'utf8');
        await sequelize.query(customerQuery)

        // Abrir una transacción para asegurar la integridad de los datos
       /* await sequelize.transaction(async (transaction) => {
            for (const city of cities) {
                try {
                    // Insertar la ciudad en la base de datos
                    await CityModel.create({
                        id: city.id,
                        name: city.name,
                        state_id: city.state_id,
                        state_code: city.state_code,
                        state_name: city.state_name,
                        country_id: city.country_id,
                        country_code: city.country_code,
                        country_name: city.country_name,
                        latitude: city.latitude,
                        longitude: city.longitude,
                        wikiDataId: city.wikiDataId
                    }, { transaction });

                } catch (error) {
                    console.error(`Error al insertar la ciudad ${city.name}:`, error);
                    // Aquí puedes decidir si quieres seguir insertando o lanzar un error
                    throw error;
                }
            }
        });*/

        console.log('Base de datos de location pobladas exitosamente.');
    } catch (error) {
        console.error('Error al poblar las ciudades:', error);
    } finally {
        await sequelize.close(); // Cerrar la conexión a la base de datos
    }
};
