import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, currentIncome, goalIncome, investment, email, phone } = body;

    // Send notification email to you
    const { data, error } = await resend.emails.send({
      from: 'Brando Blends <noreply@brandoblends.com>',
      to: ['hsq0503@gmail.com'],
      subject: `New Questionnaire Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #1e3a8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Lead from Brando Blends</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Questionnaire Details</h2>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #1e3a8a;">Personal Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            </div>

            <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #1e3a8a;">Financial Information</h3>
              <p style="margin: 5px 0;"><strong>Current Monthly Income:</strong> ${currentIncome}</p>
              <p style="margin: 5px 0;"><strong>Goal Income (3 months):</strong> ${goalIncome}</p>
              <p style="margin: 5px 0;"><strong>Investment Capacity:</strong> ${investment}</p>
            </div>

            <div style="margin: 20px 0; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-weight: bold;">✓ Lead submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>This email was generated automatically from your Brando Blends website.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: 'Brando Blends <noreply@brandoblends.com>',
      to: [email],
      subject: 'Welcome to Brando Blends - Your Application is Confirmed! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000;">
          <div style="background-color: #1e40af; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to Brando Blends!</h1>
          </div>
          
          <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e40af; margin-top: 0;">Hey ${name}! 👋</h2>
            
            <p style="font-size: 18px; line-height: 1.6; color: #333;">
              <strong>Congratulations on taking the first step towards transforming your barber business!</strong>
            </p>

            <div style="margin: 30px 0; padding: 20px; background-color: #dbeafe; border-left: 5px solid #3b82f6; border-radius: 4px;">
              <p style="margin: 0; font-size: 16px; color: #1e40af; font-weight: bold;">
                ✅ We've received your application successfully!
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.8; color: #333;">
              This is <strong>the best decision you could have made for your business.</strong> You're about to join the ranks of barbers who are scaling to $15k-$20k/month using proven social media strategies.
            </p>

            <div style="margin: 30px 0; padding: 25px; background-color: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 18px; color: #065f46; font-weight: bold;">
                📞 What's Next?
              </p>
              <p style="margin: 0; font-size: 16px; color: #065f46; line-height: 1.6;">
                I'll personally review your application and call you within the next <strong>48 hours</strong> to discuss how we can help you achieve your goals.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.8; color: #333;">
              In the meantime, keep an eye on your inbox for some exclusive tips and insights that will help you prepare for our call.
            </p>

            <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 5px solid #f59e0b; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.6;">
                <strong>💡 Pro Tip:</strong> Make sure to check your spam folder and add noreply@brandoblends.com to your contacts so you don't miss any important updates!
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 30px;">
              Get ready to become the most known barber in your city! 💈✨
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://brandoblends.com" style="display: inline-block; padding: 15px 40px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                Visit Our Website
              </a>
            </div>

            <p style="font-size: 16px; color: #333; margin-top: 30px;">
              To your success,<br>
              <strong style="color: #1e40af; font-size: 18px;">The Brando Blends Team</strong>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 5px 0;">Brando Blends - Transform Your Barber Business</p>
            <p style="margin: 5px 0;">If you have any questions, contact us at: hsq0503@gmail.com</p>
          </div>
        </div>
      `,
    });

    if (confirmationEmail.error) {
      console.error('Confirmation email error:', confirmationEmail.error);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

