import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus, deleteAppointment } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !['new', 'pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await updateAppointmentStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteAppointment(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
