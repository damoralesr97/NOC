import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infrastructure/datasources/mongo.datasource";
import { PostgresDataSource } from "../infrastructure/datasources/postgres.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const monogLogRepository = new LogRepositoryImpl(new MongoDataSource());
const postgresqlLogRepository = new LogRepositoryImpl(new PostgresDataSource());

export class Server {
  public static async start() {
    console.log("Server started...");

    // CronService.createJob("*/5 * * * * *", () => {
    //   // const url = "http://localhost:3000";
    //   const url = "https://www.google.com";
    //   new CheckServiceMultiple(
    //     [fsLogRepository, monogLogRepository, postgresqlLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
