export interface WhatsAppMessagePayload {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

/**
 * Generates human-readable WhatsApp appointment message
 */
export function formatWhatsAppMessage(payload: WhatsAppMessagePayload, clinicName = 'Dental Smile'): string {
  const parts = [
    `Hello ${clinicName}, I would like to request an appointment.`,
    '',
    `*Patient Name:* ${payload.name}`,
    `*Phone:* ${payload.phone}`,
    payload.whatsapp && payload.whatsapp !== payload.phone ? `*WhatsApp:* ${payload.whatsapp}` : null,
    payload.email ? `*Email:* ${payload.email}` : null,
    `*Service:* ${payload.service}`,
    `*Preferred Date:* ${payload.preferred_date}`,
    `*Preferred Time:* ${payload.preferred_time}`,
    payload.message ? `*Concern / Notes:* ${payload.message}` : null,
    '',
    'Please confirm the appointment. Thank you.'
  ].filter(Boolean) as string[];

  return parts.join('\n');
}

/**
 * Builds direct WhatsApp URL
 */
export function buildWhatsAppLink(
  phoneNumber: string,
  payloadOrCustomText?: WhatsAppMessagePayload | string,
  customText?: string
): string {
  // Sanitize phone number (strip spaces, dashes, + signs)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  let message = '';
  if (typeof payloadOrCustomText === 'string') {
    message = payloadOrCustomText;
  } else if (customText) {
    message = customText;
  } else if (payloadOrCustomText) {
    message = formatWhatsAppMessage(payloadOrCustomText);
  } else {
    message = 'Hello Dental Smile, I would like to inquire about dental services.';
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

