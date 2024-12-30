import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("check-service.ts", () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("http://google.com");
    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
  });
  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute("http://123google123.com");
    expect(wasOk).toBeFalsy();
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
  });
});
