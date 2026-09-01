import { NextRequest, NextResponse } from 'next/server';
import { getServices, updateService } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateService(body);
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
