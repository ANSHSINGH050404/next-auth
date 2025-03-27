import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //todo config mail for usage
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (email === "VERIFY") {
      await User.findByIdAndDelete(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (email === "RESET") {
      await User.findByIdAndDelete(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2148d09b8558e6",
        pass: "cd62fca65f10e7",
      },
    });

    const mailOptions = {
      from: 'ansh@ansh.com', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
        </p>`
    };

    const mainResponse = await transport.sendMail(mailOptions);
    return mainResponse;
  } catch (error: any) {
    throw new error();
  }
};
