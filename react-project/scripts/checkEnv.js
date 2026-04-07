// simple node script to verify required VITE_ environment variables are set
// When running locally we allow defaults so the app can start even if you
// haven't created a .env.local yet. The script will still warn you and
// prompt to populate the file, but it won't abort the process.
const required = ['VITE_API_URL', 'VITE_GOOGLE_CLIENT_ID'];
let missing = [];
required.forEach(key => {
  if (!process.env[key]) {
    missing.push(key);
  }
});
if (missing.length) {
  console.warn('Warning: missing required environment variables:', missing.join(', '));
  console.warn('The frontend will use development defaults, but you should:');
  console.warn('  1. copy .env.example to .env.local');
  console.warn('  2. fill in the real API URL / Google client ID');
  console.warn('For now we supply sane defaults below so the dev server can start.');

  // provide reasonable defaults for local development so `npm run dev`
  // doesn't fail outright. These values will be overridden by Vite from a
  // proper .env.local file when present.
  if (!process.env.VITE_API_URL) {
    process.env.VITE_API_URL = 'http://localhost:8080/api';
  }
  if (!process.env.VITE_GOOGLE_CLIENT_ID) {
    process.env.VITE_GOOGLE_CLIENT_ID = 'placeholder-client-id';
  }
}

