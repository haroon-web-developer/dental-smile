import { NextRequest, NextResponse } from 'next/server';
import { getFAQs, updateFAQ } from '@/lib/storage/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('Error fetching faqs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await updateFAQ(body);
    return NextResponse.json({ success: true, faq: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating faq:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateFAQ(body);
    return NextResponse.json({ success: true, faq: updated });
  } catch (error) {
    console.error('Error updating faq:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}
