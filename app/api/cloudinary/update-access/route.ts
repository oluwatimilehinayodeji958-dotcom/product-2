import { NextRequest, NextResponse } from 'next/server';

function parseCloudinaryUrl(url: string) {
  const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) return null;
  return {
    apiKey: decodeURIComponent(match[1]),
    apiSecret: decodeURIComponent(match[2]),
    cloudName: match[3],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId, resourceType = 'image' } = body;

    if (!publicId) {
      return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
    }

    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      return NextResponse.json({ error: 'Missing CLOUDINARY_URL environment variable' }, { status: 500 });
    }

    const parsed = parseCloudinaryUrl(cloudinaryUrl);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid CLOUDINARY_URL format' }, { status: 500 });
    }

    const { apiKey, apiSecret, cloudName } = parsed;
    
    // Use Cloudinary Admin API to update access mode
    const updateUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload/${publicId}`;
    
    const response = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
      body: JSON.stringify({
        access_mode: 'public',
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: result.error?.message || 'Failed to update access mode', details: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Access mode updated to public' });
  } catch (error) {
    console.error('Cloudinary access mode update error:', error);
    return NextResponse.json({ error: 'Failed to update access mode' }, { status: 500 });
  }
}
