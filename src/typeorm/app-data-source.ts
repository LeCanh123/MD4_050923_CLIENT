import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "md4_db",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})

