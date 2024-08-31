import { auth }  from "./auth.routes.js";
import { user } from './user.routes.js'
import {campaign} from "./campaign.routes.js";
import {customer} from "./customer.routes.js";
import {location} from "./location.routes.js";
import {bank} from "./bank.routes.js";
import {reason} from './reason.routes.js';
import {novelty} from "./novelty.routes.js";
import {donation} from "./donation.routes.js";
import {reports} from "./reports.routes.js";

const currentVersion = 'v1'

export const routes = (server) => {
    server.use(`/api/${currentVersion}/auth`, auth);
    server.use(`/api/${currentVersion}/user`, user);
    server.use(`/api/${currentVersion}/campaign`, campaign);
    server.use(`/api/${currentVersion}/customer`, customer);
    server.use(`/api/${currentVersion}/location`, location);
    server.use(`/api/${currentVersion}/bank`, bank);
    server.use(`/api/${currentVersion}/reason`, reason);
    server.use(`/api/${currentVersion}/novelty`, novelty);
    server.use(`/api/${currentVersion}/donation`, donation);
    server.use(`/api/${currentVersion}/reports`, reports);

}