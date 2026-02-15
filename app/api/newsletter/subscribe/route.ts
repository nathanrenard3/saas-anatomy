import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';
import { validateEmail, isHoneypotFilled } from '@/lib/email-validation';

export async function POST(request: Request) {
  try {
    const { email, website } = await request.json();

    // Honeypot check — silently succeed to not alert bots
    if (isHoneypotFilled(website)) {
      return NextResponse.json(
        { message: 'success' },
        { status: 200 }
      );
    }

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'serverError' },
        { status: 500 }
      );
    }

    // Initialize Brevo API client
    const apiInstance = new brevo.ContactsApi();
    apiInstance.setApiKey(
      brevo.ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Create contact
    const createContact = new brevo.CreateContact();
    createContact.email = validation.email!;
    createContact.listIds = [3]; // Brevo contact list ID
    createContact.updateEnabled = true; // Update if contact already exists

    // Add contact to Brevo
    await apiInstance.createContact(createContact);

    return NextResponse.json(
      { message: 'success' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Brevo API error:', error);

    // Handle duplicate contact error
    if (error.response?.body?.code === 'duplicate_parameter') {
      return NextResponse.json(
        { error: 'duplicateEmail' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'subscriptionError' },
      { status: 500 }
    );
  }
}
