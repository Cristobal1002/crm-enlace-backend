import { auth }  from "./auth.routes.js";
import { user } from './user.routes.js'
import {campaign} from "./campaign.routes.js";
import {customer} from "./customer.routes.js";

const currentVersion = 'v1'

export const routes = (server) => {
    server.use(`/api/${currentVersion}/auth`, auth);
    server.use(`/api/${currentVersion}/user`, user);
    server.use(`/api/${currentVersion}/campaign`, campaign)
    server.use(`/api/${currentVersion}/customer`, customer)
}