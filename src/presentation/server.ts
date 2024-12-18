import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infrastructure/datasources/mongo.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const logRepository = new LogRepositoryImpl(
  // new MongoDataSource()
  new FileSystemDataSource()
);

export class Server {
  public static async start() {
    console.log("Server started...");

    const logs = await logRepository.getLogs(LogSeverityLevel.high);
    console.log(logs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   // const url = "http://localhost:3000";
    //   const url = "https://www.google.com";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
