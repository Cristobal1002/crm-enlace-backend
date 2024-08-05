import { auth }  from "./auth.routes.js";

const currentVersion = 'v1'

export const routes = (server) => {
    server.use(`/api/${currentVersion}/auth`, auth);
}