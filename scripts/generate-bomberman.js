const fs = require('fs');
const path = require('path');

function generateBombermanSVG() {
  const cols = 53;
  const rows = 7;
  const size = 15;
  const gap = 3;
  const w = cols * (size + gap) + gap;
  const h = rows * (size + gap) + gap;

  let grid = '';
  // Generate static grid
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      // 30% chance of hard block (gray), 30% soft block (dark gray), rest empty (black)
      const rand = Math.random();
      let fill = '#000000'; // empty
      if (rand < 0.3) fill = '#888888'; // hard
      else if (rand < 0.6) fill = '#333333'; // soft
      
      const x = gap + c * (size + gap);
      const y = gap + r * (size + gap);
      grid += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" rx="2"/>\n`;
    }
  }

  // Animating Bomber
  // Start at col 2, row 3 -> move to col 5, row 3 -> drop bomb -> run away
  const startX = gap + 2 * (size + gap);
  const startY = gap + 3 * (size + gap);
  
  const bombX = gap + 5 * (size + gap) + size/2;
  const bombY = gap + 3 * (size + gap) + size/2;

  const svg = `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#000000" />
  
  <!-- Grid -->
  <g>${grid}</g>

  <!-- Bomb -->
  <g opacity="0">
    <circle cx="${bombX}" cy="${bombY}" r="${size/2.5}" fill="#ffffff" />
    <circle cx="${bombX}" cy="${bombY}" r="${size/2.5}" fill="#ff0000">
      <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
    </circle>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.4;0.8;1" dur="4s" repeatCount="indefinite" />
  </g>

  <!-- Explosion (Cross) -->
  <g opacity="0" fill="#ff0000">
    <rect x="${bombX - size*1.5}" y="${bombY - size/3}" width="${size*3}" height="${size/1.5}" />
    <rect x="${bombX - size/3}" y="${bombY - size*1.5}" width="${size/1.5}" height="${size*3}" />
    <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
  </g>

  <!-- Bomberman (White shape) -->
  <g fill="#ffffff">
    <rect x="${startX}" y="${startY}" width="${size}" height="${size}" rx="4" />
    <!-- Visor -->
    <rect x="${startX + size/2}" y="${startY + 2}" width="${size/2.5}" height="${size/3}" fill="#000000" />
    
    <animateTransform attributeName="transform" type="translate" 
      values="0,0; ${3*(size+gap)},0; ${3*(size+gap)},0; 0,0" 
      keyTimes="0; 0.4; 0.8; 1" 
      dur="4s" repeatCount="indefinite" />
  </g>
</svg>
  `.trim();

  const dist = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(dist)) fs.mkdirSync(dist);
  fs.writeFileSync(path.join(dist, 'bomberman-graph.svg'), svg);
  console.log('Generated bomberman-graph.svg');
}

generateBombermanSVG();