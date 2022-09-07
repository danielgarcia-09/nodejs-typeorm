import "reflect-metadata"
import app from "./app";
import { AppDataSource } from "./db";

async function main() {
    try {
        await AppDataSource.initialize();
        app.listen(3000);
        console.log("Server is in port:", 3000);    
    } catch (error) {
        console.error(error);
    }
}
main();
