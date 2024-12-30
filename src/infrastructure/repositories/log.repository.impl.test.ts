import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("log.repository.impl", () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepository = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("saveLog should call the datasource with arguments", async () => {
    const log = { level: LogSeverityLevel.high, message: "hola" } as LogEntity;
    await logRepository.saveLog(log);
    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });
  test("getLogs should call the datasource with arguments", async () => {
    const highSeverity = LogSeverityLevel.high;
    await logRepository.getLogs(highSeverity);
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(highSeverity);
  });
});
