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
    const formData = await request.formData();
    const file = formData.get('file');
    const publicId = formData.get('public_id')?.toString();

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file upload' }, { status: 400 });
    }

    // Check file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size too large. Got ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum is 10MB. Please compress your image or use a smaller file.` 
      }, { status: 400 });
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
    
    // Determine resource type based on file type
    const fileType = file.type;
    let resourceType = 'image';
    if (fileType === 'application/pdf') {
      resourceType = 'raw';
    } else if (fileType.startsWith('video/')) {
      resourceType = 'video';
    }
    
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const uploadForm = new FormData();
    uploadForm.append('file', file);
    if (publicId) {
      uploadForm.append('public_id', publicId);
    }
    uploadForm.append('resource_type', resourceType);
    uploadForm.append('access_mode', 'public');
    uploadForm.append('unsigned', 'true');

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
      body: uploadForm,
    });

    const result = await response.json();
    console.log('Cloudinary upload response:', result);
    
    if (!response.ok) {
      console.error('Cloudinary upload error details:', result);
      return NextResponse.json({ error: result.error || 'Cloudinary upload failed', details: result }, { status: 500 });
    }

    return NextResponse.json({ secure_url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
  }
}
