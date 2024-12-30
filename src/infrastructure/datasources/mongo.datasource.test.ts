import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongo/init";
import { MongoDataSource } from "./mongo.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";

describe("mongo.datasource.ts", () => {
  const logDataSource = new MongoDataSource();
  const log = new LogEntity({
    level: LogSeverityLevel.high,
    message: "Test log",
    origin: "monog.datasource.test.ts",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });
  afterEach(async () => {
    await LogModel.deleteMany();
  });
  afterAll(async () => {
    mongoose.connection.close();
  });
  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created: ",
      expect.any(String)
    );
  });
  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(2);
    expect(logs[0].level).toBe(LogSeverityLevel.high);
  });
});
