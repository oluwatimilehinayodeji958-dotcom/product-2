const fs = require('fs');
const path = require('path');

function parseEnv(envPath) {
  const env = fs.readFileSync(envPath, 'utf8');
  const lines = env.split(/\r?\n/);
  const obj = {};
  for (const line of lines) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) obj[m[1].trim()] = m[2].trim();
  }
  return obj;
}

function parseCloudinaryUrl(url) {
  const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) return null;
  return {
    apiKey: decodeURIComponent(match[1]),
    apiSecret: decodeURIComponent(match[2]),
    cloudName: match[3],
  };
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const txt = await res.text();
  try { return JSON.parse(txt); } catch (e) { return txt; }
}

async function run() {
  const repoRoot = path.resolve(__dirname, '..');
  const envPath = path.join(repoRoot, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found. Aborting.');
    process.exit(1);
  }
  const env = parseEnv(envPath);
  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  const CLOUDINARY_URL = env.CLOUDINARY_URL;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !CLOUDINARY_URL) {
    console.error('Missing required env vars. Ensure NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and CLOUDINARY_URL are set in .env.local');
    process.exit(1);
  }

  const parsedCloud = parseCloudinaryUrl(CLOUDINARY_URL);
  if (!parsedCloud) {
    console.error('Invalid CLOUDINARY_URL format');
    process.exit(1);
  }

  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${parsedCloud.cloudName}/auto/upload`;
  const CLOUDINARY_AUTH = 'Basic ' + Buffer.from(`${parsedCloud.apiKey}:${parsedCloud.apiSecret}`).toString('base64');

  const tables = [
    'publications',
    'gallery',
    'gallery_images',
    'gallery_videos',
    'research_projects',
    'events',
    'team_members',
    'editorial_users'
  ];

  const supaHeaders = {
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    apikey: SUPABASE_SERVICE_ROLE_KEY,
  };

  const supaHost = new URL(SUPABASE_URL).host.replace(/:\d+$/, '');

  console.log('Supabase host:', supaHost);
  console.log('Tables to scan:', tables.join(', '));

  for (const table of tables) {
    try {
      console.log('\nScanning table', table);
      const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
      const res = await fetch(url, { headers: supaHeaders });
      if (res.status >= 400) {
        console.log(`Skipping ${table} (REST returned ${res.status})`);
        continue;
      }
      const rows = await res.json();
      console.log(`Found ${rows.length} rows in ${table}`);

      for (const row of rows) {
        const id = row.id || row.ID || row.uuid || (row.id === undefined ? null : row.id);
        if (!id) {
          // try to find primary key property
        }
        const updates = {};
        for (const [k, v] of Object.entries(row)) {
          if (typeof v === 'string' && v.includes('/storage/v1/object')) {
            // likely a Supabase storage URL
            try {
              console.log('  Found storage URL in', table, 'row', id, 'column', k);

              // Attempt to fetch the file
              const fileRes = await fetch(v, { headers: supaHeaders });
              if (!fileRes.ok) {
                console.warn('    Failed to fetch file, status', fileRes.status);
                continue;
              }
              const buffer = Buffer.from(await fileRes.arrayBuffer());

              // upload to Cloudinary
              const FormData = global.FormData || (await import('formdata-node')).FormData;
              const form = new FormData();
              // Use base64 data URI for Cloudinary upload to avoid multipart File issues in this environment
              const b64 = buffer.toString('base64');
              const mime = 'application/octet-stream';
              form.append('file', `data:${mime};base64,${b64}`);
              // keep same public_id path-ish
              const publicId = `${table}/${id}/${k}`;
              form.append('public_id', publicId);
              form.append('resource_type', 'auto');

              const uploadRes = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                headers: { Authorization: CLOUDINARY_AUTH },
                body: form,
              });

              const uploadJson = await uploadRes.json();
              if (!uploadRes.ok) {
                console.error('    Cloudinary upload failed', uploadJson);
                continue;
              }

              const secureUrl = uploadJson.secure_url;
              console.log('    Uploaded to Cloudinary:', secureUrl);

              updates[k] = secureUrl;
            } catch (err) {
              console.error('    Error migrating field', k, err);
            }
          }
        }

        if (Object.keys(updates).length > 0) {
          // Send PATCH to supabase REST to update row
          const patchUrl = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`;
          const patchRes = await fetch(patchUrl, {
            method: 'PATCH',
            headers: {
              ...supaHeaders,
              'Content-Type': 'application/json',
              Prefer: 'return=representation',
            },
            body: JSON.stringify(updates),
          });

          if (!patchRes.ok) {
            console.error('  Failed to update DB row', await patchRes.text());
          } else {
            console.log('  DB row updated for', id);
          }
        }
      }
    } catch (err) {
      console.error('Error scanning table', table, err);
    }
  }

  console.log('\nMigration script finished (dry-run=false). Review logs above.');
}

run().catch((err) => { console.error(err); process.exit(1); });
