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

function extractPublicIdFromUrl(url: string): string | null {
  // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
  // or: https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}
  // or: https://res.cloudinary.com/{cloud_name}/raw/upload/{version}/{public_id}.{format} (for PDFs)
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    // Find the index of 'upload' in the path
    const uploadIndex = pathParts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Everything after 'upload' is the public path
    const publicPath = pathParts.slice(uploadIndex + 1).join('/');
    // Remove file extension
    const publicId = publicPath.substring(0, publicPath.lastIndexOf('.'));
    return publicId;
  } catch {
    return null;
  }
}

function getResourceTypeFromUrl(url: string): string {
  // Detect resource type from URL (image, video, raw for PDFs, etc.)
  const pathParts = url.split('/');
  const uploadIndex = pathParts.indexOf('upload');
  if (uploadIndex === -1) return 'image';
  
  // The resource type is usually before 'upload'
  const resourceType = pathParts[uploadIndex - 1] || 'image';
  return resourceType;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json({ error: 'Missing publicId' }, { status: 400 });
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
    
    // Extract public ID from full URL if a full URL was provided
    const actualPublicId = publicId.startsWith('http') ? extractPublicIdFromUrl(publicId) : publicId;
    
    // Detect resource type from URL (image, raw for PDFs, etc.)
    const resourceType = publicId.startsWith('http') ? getResourceTypeFromUrl(publicId) : 'image';
    
    if (!actualPublicId) {
      return NextResponse.json({ error: 'Invalid publicId or URL format' }, { status: 400 });
    }

    const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`;

    const response = await fetch(deleteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
      body: JSON.stringify({
        public_id: actualPublicId,
        resource_type: resourceType,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: result.error || 'Cloudinary delete failed', details: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({ error: 'Cloudinary delete failed' }, { status: 500 });
  }
}
