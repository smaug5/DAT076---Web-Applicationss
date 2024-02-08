import { app } from "./start";

/**
 * App variables (typ cv och project?)
 */

const PORT : number = 8080;

/**
 * Server Activation
 * TODO
 */

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});