import { app } from "./start";

const PORT : number = 8080;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});