import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { Resend } from 'npm:resend@3.2.0';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    console.log("Form Data:", Object.fromEntries(formData)); // Log the form data
    
    // Extract data from form
    const referralData = {
      participant_name: formData.get('participantName'),
      date_of_birth: formData.get('dateOfBirth'),
      ndis_number: formData.get('ndisNumber'),
      address: formData.get('address'),
      guardian_name: formData.get('guardianName'),
      guardian_phone: formData.get('phone'),
      guardian_email: formData.get('email'),
      services: JSON.parse(formData.get('services') as string),
      contact_name: formData.get('contactName'),
      contact_email: formData.get('contactEmail'),
      funding_type: formData.get('funding'),
      plan_manager: formData.get('planManager'),
      service_agreement_email: formData.get('serviceAgreementEmail'),
      plan_start_date: formData.get('planStartDate'),
      plan_end_date: formData.get('planEndDate'),
      hours_available: formData.get('hoursAvailable'),
      referrer_name: formData.get('referrerName'),
      referrer_relationship: formData.get('referrerRelationship'),
      referrer_email: formData.get('referrerEmail'),
      referrer_phone: formData.get('referrerPhone'),
    };

    console.log("Processed referral data:", referralData); // Log processed data

    // Insert referral into database
    const { data: savedReferral, error: dbError } = await supabase
      .from('referrals')
      .insert([referralData])
      .select()
      .single();

    if (dbError) {
      console.error("Database insertion error:", dbError);
      throw new Error(`Database insertion failed: ${dbError.message}`);
    }

    console.log("Database insertion successful:", savedReferral); // Log successful insertion

    // Send notification email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'HCBT Referrals <referrals@hcbt.com.au>',
      to: ['info@hcbt.com.au'],
      subject: `New Referral: ${referralData.participant_name}`,
      html: `
        <h1>New Referral Received</h1>
        <h2>Participant Details</h2>
        <p><strong>Name:</strong> ${referralData.participant_name}</p>
        <p><strong>DOB:</strong> ${referralData.date_of_birth}</p>
        <p><strong>NDIS Number:</strong> ${referralData.ndis_number}</p>
        <p><strong>Address:</strong> ${referralData.address}</p>

        <h2>Guardian Details</h2>
        <p><strong>Name:</strong> ${referralData.guardian_name}</p>
        <p><strong>Phone:</strong> ${referralData.guardian_phone}</p>
        <p><strong>Email:</strong> ${referralData.guardian_email}</p>

        <h2>Services Required</h2>
        <ul>
          ${referralData.services.map(service => `<li>${service}</li>`).join('')}
        </ul>

        <h2>Contact for Appointments</h2>
        <p><strong>Name:</strong> ${referralData.contact_name}</p>
        <p><strong>Email:</strong> ${referralData.contact_email}</p>

        <h2>NDIS Plan Details</h2>
        <p><strong>Funding Type:</strong> ${referralData.funding_type}</p>
        <p><strong>Plan Manager:</strong> ${referralData.plan_manager}</p>
        <p><strong>Service Agreement Email:</strong> ${referralData.service_agreement_email}</p>
        <p><strong>Plan Dates:</strong> ${referralData.plan_start_date} to ${referralData.plan_end_date}</p>
        <p><strong>Hours Available:</strong> ${referralData.hours_available}</p>

        <h2>Referrer Details</h2>
        <p><strong>Name:</strong> ${referralData.referrer_name}</p>
        <p><strong>Relationship:</strong> ${referralData.referrer_relationship}</p>
        <p><strong>Email:</strong> ${referralData.referrer_email}</p>
        <p><strong>Phone:</strong> ${referralData.referrer_phone}</p>
      `
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      throw new Error(`Failed to send notification email: ${emailError.message}`);
    }

    console.log("Email sent successfully:", emailData); // Log successful email sending

    return new Response(
      JSON.stringify({ 
        message: 'Referral submitted successfully', 
        data: savedReferral,
        emailSent: true 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error processing referral:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to process referral',
        details: error.message
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      }
    );
  }
});