import { NextRequest, NextResponse } from 'next/server';
import { getClinicSettings, updateClinicSettings } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getClinicSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch clinic settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateClinicSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update clinic settings' }, { status: 500 });
  }
}
