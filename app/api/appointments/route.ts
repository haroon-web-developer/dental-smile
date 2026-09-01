import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAppointments } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, phone, whatsapp, email, service, preferred_date, preferred_time, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid patient name.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json({ error: 'Please provide a valid phone number.' }, { status: 400 });
    }

    if (!service || typeof service !== 'string') {
      return NextResponse.json({ error: 'Please select a dental service.' }, { status: 400 });
    }

    if (!preferred_date || typeof preferred_date !== 'string') {
      return NextResponse.json({ error: 'Please select a preferred date.' }, { status: 400 });
    }

    if (!preferred_time || typeof preferred_time !== 'string') {
      return NextResponse.json({ error: 'Please select a preferred time slot.' }, { status: 400 });
    }

    const appointment = await createAppointment({
      name: name.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp ? whatsapp.trim() : phone.trim(),
      email: email ? email.trim() : undefined,
      service: service.trim(),
      preferred_date: preferred_date.trim(),
      preferred_time: preferred_time.trim(),
      message: message ? message.trim() : undefined,
    });

    return NextResponse.json({
      success: true,
      appointment,
      message: 'Appointment request received successfully.'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Failed to process appointment request. Please try again or reach out on WhatsApp.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const appointments = await getAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to retrieve appointments' }, { status: 500 });
  }
}
