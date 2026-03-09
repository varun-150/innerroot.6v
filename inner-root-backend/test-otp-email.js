const nodemailer = require('nodemailer');

async function testOtpEmail() {
    console.log("Creating test email account...");
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    console.log(`Sending OTP Email for Verification Code: ${otpCode}`);

    try {
        let info = await transporter.sendMail({
            from: '"Inner Root Verification" <no-reply@innerroot.test>', // sender address
            to: "user@example.com", // list of receivers
            subject: "Your OTP Verification Code ✔", // Subject line
            text: `Your OTP is ${otpCode}. Please use this to verify your account.`, // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2>Verify Your Email</h2>
                    <p>Thank you for signing up for Inner Root. Please use the following code to verify your account:</p>
                    <h1 style="color: #4CAF50; letter-spacing: 5px; text-align: center; padding: 10px; background: #f4f4f4; border-radius: 8px;">
                        ${otpCode}
                    </h1>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("=====================================");
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("=====================================");
        console.log("Click the link above to view how the email looks!");

    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

testOtpEmail();
