const fs = require('fs');
const path = require('path');

async function main() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found at', envPath);
    process.exit(2);
  }
  const env = fs.readFileSync(envPath, 'utf8');
  const m = env.match(/^CLOUDINARY_URL=(.+)$/m);
  if (!m) {
    console.error('CLOUDINARY_URL not found in .env.local');
    process.exit(2);
  }
  const url = m[1].trim();
  const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) {
    console.error('CLOUDINARY_URL has invalid format');
    process.exit(2);
  }
  const apiKey = decodeURIComponent(match[1]);
  const apiSecret = decodeURIComponent(match[2]);
  const cloudName = match[3];
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  try {
    const FormData = global.FormData || (await import('formdata-node')).FormData;
    const form = new FormData();
    const publicId = 'test_upload_check_' + Date.now();
    form.append('file', 'data:text/plain;base64,SGVsbG8=');
    form.append('public_id', publicId);
    form.append('resource_type', 'auto');

    const headers = {
      Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
    };

    // Node 18+ has global fetch
    const fetchFn = global.fetch || (await import('node-fetch')).default;

    const res = await fetchFn(uploadUrl, {
      method: 'POST',
      headers,
      body: form,
    });

    console.log('Cloudinary upload status:', res.status);
    const json = await res.json();
    console.log('Response:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Test upload error:', err);
    process.exit(3);
  }
}

main();
