import express, {Express, Request, Response} from "express";
import { defaultRoute } from "./router/defaultRoute";
import { cvRouter } from "./router/cvRouter";
import { adminRouter } from "./router/adminRouter";
import { projectRouter } from "./router/projectRouter";

export const routes = express.Router();
/**
 * App variables (typ cv och project?)
 */
 const app = express();

const PORT : number = 8080;

/**
 * Server Activation
 * TODO
 */

 app.use(express.json());
 app.use('/api/cv', cvRouter);
 app.use('/api/login', adminRouter);
 app.use('/api/project', projectRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});