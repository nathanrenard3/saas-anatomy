import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Configuration serveur incorrecte' },
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
    createContact.email = email;
    createContact.listIds = [3]; // Brevo contact list ID
    createContact.updateEnabled = true; // Update if contact already exists

    // Add contact to Brevo
    await apiInstance.createContact(createContact);

    return NextResponse.json(
      { message: 'Inscription réussie !' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Brevo API error:', error);

    // Handle duplicate contact error
    if (error.response?.body?.code === 'duplicate_parameter') {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}
