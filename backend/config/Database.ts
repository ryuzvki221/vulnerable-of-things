import "reflect-metadata"
import { DataSource } from "typeorm"
import { environment } from "../env";

export const Connection = new DataSource({
    type: environment.db.type as any,
    database: environment.db.database,
    host: environment.db.host,
    port: environment.db.port,
    username: environment.db.username,
    password: environment.db.password,
    entities: environment.app.dirs.entities,
    logging: environment.db.logging as any,
    synchronize: environment.db.synchronize,
    ssl: 'true' as any,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
