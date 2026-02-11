import * as brevo from "@getbrevo/brevo";

export async function subscribeToBrevo(email: string): Promise<void> {
  if (!process.env.BREVO_API_KEY) return;

  try {
    const apiInstance = new brevo.ContactsApi();
    apiInstance.setApiKey(
      brevo.ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const createContact = new brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [3];
    createContact.updateEnabled = true;

    await apiInstance.createContact(createContact);
  } catch (error: unknown) {
    const brevoError = error as { response?: { body?: { code?: string } } };
    if (brevoError.response?.body?.code !== "duplicate_parameter") {
      console.error("Brevo subscription error:", error);
    }
  }
}
