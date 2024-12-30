import { envs } from "./envs.plugin";

describe("env.plugin.ts", () => {
  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.MAILER_EMAIL = "test.com";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(
        '"MAILER_EMAIL" should be a valid email address'
      );
    }
  });
});
