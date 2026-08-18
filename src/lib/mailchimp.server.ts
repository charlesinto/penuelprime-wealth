// Mailchimp integration for server-side use only
// SECURITY: Only use this in server functions and .server.ts files
import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

const AUDIENCE_NAME = "Penuel Prime Wealth Club";

// Cache for audience ID to avoid repeated API calls
let cachedAudienceId: string | null = null;

// Initialize Mailchimp client
function getMailchimpClient() {
  const apiKey = process.env["MAILCHIMP_API_KEY"];
  const server = process.env["MAILCHIMP_SERVER_PREFIX"]; // e.g., "us1", "us2", etc.

  if (!apiKey || !server) {
    console.warn("Mailchimp not configured - skipping contact sync");
    return null;
  }

  mailchimp.setConfig({
    apiKey,
    server,
  });

  return mailchimp;
}

/**
 * Get or create the Mailchimp audience
 * Returns audience ID or null if Mailchimp is not configured
 */
async function getOrCreateAudience(): Promise<string | null> {
  const client = getMailchimpClient();
  if (!client) return null;

  // Return cached audience ID if available
  if (cachedAudienceId) return cachedAudienceId;

  // Check if MAILCHIMP_AUDIENCE_ID is set in env
  const envAudienceId = process.env["MAILCHIMP_AUDIENCE_ID"];
  if (envAudienceId) {
    cachedAudienceId = envAudienceId;
    return envAudienceId;
  }

  try {
    // Get all lists/audiences
    const response = await client.lists.getAllLists({ count: 1000 });

    // Check if our audience already exists
    const existingAudience = (response as any).lists?.find(
      (list: any) => list.name === AUDIENCE_NAME,
    );

    if (existingAudience) {
      cachedAudienceId = existingAudience.id;
      console.info(`Found existing Mailchimp audience: ${AUDIENCE_NAME} (${existingAudience.id})`);
      return existingAudience.id;
    }

    // Create new audience if it doesn't exist
    console.info(`Creating new Mailchimp audience: ${AUDIENCE_NAME}`);
    const newAudience = await (client.lists as any).createList({
      name: AUDIENCE_NAME,
      permission_reminder: "You signed up for updates from Penuel Prime Wealth Club",
      email_type_option: false,
      contact: {
        company: "Penuel Prime Wealth Club",
        address1: "",
        city: "",
        state: "",
        zip: "",
        country: "NG",
      },
      campaign_defaults: {
        from_name: "Penuel Prime Wealth Club",
        from_email: "hello@penuelprime.com",
        subject: "",
        language: "en",
      },
    });

    cachedAudienceId = newAudience.id;
    console.info(`Created new Mailchimp audience: ${AUDIENCE_NAME} (${newAudience.id})`);
    return newAudience.id;
  } catch (error) {
    console.error("Failed to get or create Mailchimp audience:", error);
    return null;
  }
}

interface AddContactParams {
  email: string;
  firstName: string;
  lastName?: string | undefined;
  phone?: string | undefined;
  tags?: string[] | undefined;
  mergeFields?: Record<string, string> | undefined;
}

/**
 * Add or update a contact in Mailchimp audience with tags
 * Returns true on success, false on failure (logs error)
 */
export async function addContactToAudience(params: AddContactParams): Promise<boolean> {
  const client = getMailchimpClient();
  if (!client) return false;

  const audienceId = await getOrCreateAudience();
  if (!audienceId) {
    console.warn("Could not get or create Mailchimp audience - skipping contact sync");
    return false;
  }

  try {
    const subscriberHash = crypto
      .createHash("md5")
      .update(params.email.toLowerCase())
      .digest("hex");

    // Add or update the contact
    await client.lists.setListMember(audienceId, subscriberHash, {
      email_address: params.email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: params.firstName,
        ...(params.lastName && { LNAME: params.lastName }),
        ...(params.phone && { PHONE: params.phone }),
        ...params.mergeFields,
      },
    });

    // Add tags if provided
    if (params.tags && params.tags.length > 0) {
      await client.lists.updateListMemberTags(audienceId, subscriberHash, {
        tags: params.tags.map((tag) => ({ name: tag, status: "active" })),
      });
    }

    return true;
  } catch (error) {
    console.error("Failed to add contact to Mailchimp:", error);
    return false;
  }
}
