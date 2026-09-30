const fs = require('fs');
const path = require('path');

async function fetchContributions(token, username) {
  if (!token || !username) {
    console.log('No token/username, using dummy data.');
    return Array.from({ length: 365 }, () => Math.floor(Math.random() * 10));
  }
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
  return weeks.flatMap(w => w.contributionDays.map(d => d.contributionCount));
}

function generateSVG(data) {
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const baseR = 150;
  
  let d = '';
  const total = data.length;
  for (let i = 0; i < total; i++) {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const count = data[i] || 0;
    const r = baseR + (count * 3);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    d += (i === 0 ? 'M' : 'L') + ` ${x},${y} `;
  }
  d += 'Z';

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000" />
  
  <circle cx="${cx}" cy="${cy}" r="${baseR}" fill="none" stroke="#333333" stroke-width="1" stroke-dasharray="4" />
  <circle cx="${cx}" cy="${cy}" r="${baseR + 30}" fill="none" stroke="#222222" stroke-width="1" />
  <circle cx="${cx}" cy="${cy}" r="${baseR + 60}" fill="none" stroke="#111111" stroke-width="1" />
  
  <path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
  
  <!-- Glitch sweep -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="4s" repeatCount="indefinite" />
    <polygon points="${cx},${cy} ${cx},0 ${cx + size},0" fill="#ff0000" opacity="0.15" />
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="0" stroke="#ff0000" stroke-width="2" />
  </g>

  <!-- Core -->
  <circle cx="${cx}" cy="${cy}" r="15" fill="#FFFFFF">
    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
  </circle>
  <circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="#ff0000" stroke-width="1">
    <animate attributeName="r" values="15;30" dur="2s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>
  `.trim();
}

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const user = process.env.GITHUB_USER;
  const data = await fetchContributions(token, user);
  const svg = generateSVG(data);
  const dist = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(dist)) fs.mkdirSync(dist);
  fs.writeFileSync(path.join(dist, 'anomaly-graph.svg'), svg);
  console.log('Generated anomaly-graph.svg');
}

run();