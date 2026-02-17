import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a random 6-digit code
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification email
export async function sendVerificationEmail(email, code, name) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Placement Portal <onboarding@resend.dev>', // Use resend's test domain
      to: [email],
      subject: 'Verify Your Email - Placement Portal',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #30364F 0%, #ACBAC4 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .code-box {
                background: white;
                border: 2px dashed #667eea;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 20px 0;
              }
              .code {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎓 Placement Portal</h1>
                <p>Email Verification</p>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>Welcome to Placement Portal! Please verify your email address to complete your registration.</p>
                
                <div class="code-box">
                  <p style="margin: 0; color: #666;">Your verification code is:</p>
                  <div class="code">${code}</div>
                </div>
                
                <p>This code will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn't create an account, you can safely ignore this email.</p>
                
                <p>Best regards,<br>Placement Portal Team</p>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Verification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email send exception:', error);
    return { success: false, error: error.message };
  }
}