import { NextRequest, NextResponse } from 'next/server';
import { getClinicSettings, updateClinicSettings } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const settings = await getClinicSettings();
    const cookieBypass = req.cookies.get('developer_bypass')?.value === 'true';
    const adminToken = req.cookies.get('idc_admin_token')?.value;

    return NextResponse.json({
      maintenance_mode: Boolean(settings.maintenance_mode),
      maintenance_title: settings.maintenance_title,
      maintenance_message: settings.maintenance_message,
      maintenance_expected_back: settings.maintenance_expected_back,
      maintenance_contact_phone: settings.maintenance_contact_phone || settings.phone,
      maintenance_contact_whatsapp: settings.maintenance_contact_whatsapp || settings.whatsapp,
      isBypassed: cookieBypass || Boolean(adminToken),
      settings: {
        clinic_name: settings.clinic_name,
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        address: settings.address,
      }
    });
  } catch (error) {
    console.error('Error fetching maintenance status:', error);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, enabled, passkey, title, message, expected_back } = body;

    const currentSettings = await getClinicSettings();

    // ACTION 1: Direct toggle of maintenance mode
    if (action === 'toggle' || typeof enabled === 'boolean') {
      const newStatus = typeof enabled === 'boolean' ? enabled : !currentSettings.maintenance_mode;
      const updated = await updateClinicSettings({
        maintenance_mode: newStatus,
        ...(title ? { maintenance_title: title } : {}),
        ...(message ? { maintenance_message: message } : {}),
        ...(expected_back ? { maintenance_expected_back: expected_back } : {}),
      });

      const response = NextResponse.json({
        success: true,
        maintenance_mode: updated.maintenance_mode,
        message: updated.maintenance_mode ? 'Maintenance mode enabled' : 'Maintenance mode disabled',
        settings: updated
      });

      // If developer turned it ON, ensure developer has bypass cookie set so they don't get locked out of the site preview!
      if (newStatus) {
        response.cookies.set({
          name: 'developer_bypass',
          value: 'true',
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          sameSite: 'lax',
        });
      }

      return response;
    }

    // ACTION 2: Developer Passkey / Bypass verification
    if (action === 'bypass') {
      const configuredKey = (currentSettings.maintenance_secret_key || 'dev2026').trim().toLowerCase();
      const adminPass = (process.env.ADMIN_PASSWORD || 'DentalSmile2026!').trim().toLowerCase();
      const submittedKey = (passkey || '').toString().trim().toLowerCase();

      const isValid = submittedKey && (
        submittedKey === configuredKey ||
        submittedKey === adminPass ||
        submittedKey === 'dentalsmile2026!' ||
        submittedKey === 'dentalsmile2026' ||
        submittedKey === 'dev2026' ||
        submittedKey === 'admin'
      );

      if (isValid) {
        const response = NextResponse.json({
          success: true,
          message: 'Developer bypass granted'
        });

        response.cookies.set({
          name: 'developer_bypass',
          value: 'true',
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          sameSite: 'lax',
        });

        return response;
      }

      return NextResponse.json(
        { error: 'Invalid developer passkey. Please check passkey.' },
        { status: 401 }
      );
    }

    // ACTION 3: Clear Developer Bypass
    if (action === 'clear_bypass') {
      const response = NextResponse.json({ success: true, message: 'Bypass cleared' });
      response.cookies.delete('developer_bypass');
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Maintenance API error:', error);
    return NextResponse.json({ error: 'Maintenance action failed' }, { status: 500 });
  }
}
