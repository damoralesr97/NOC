import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("email.service.ts", () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });
  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "damoralesr97@outlook.com",
      subject: "Test email",
      htmlBody: "<h1>Test email</h1>",
    };
    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test email</h1>",
      subject: "Test email",
      to: "damoralesr97@outlook.com",
    });
  });
  test("should send email with attachments", async () => {
    const email = "damoralesr97@outlook.com";
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      ]),
    });
  });
});
