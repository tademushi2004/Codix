const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. CSS
html = html.replace(
`.tray-block canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}`,
`.tray-block canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    width: 100%;
    height: 100%;
}`);

html = html.replace(
`#new-chip-btn {
    font-family: var(--font-pixel);
    font-size: 6px;
    color: var(--text-accent);
    background: #0a1a0a;
    border: 1px solid var(--wire-green);
    padding: 4px;
    cursor: pointer;
    letter-spacing: 1px;
    transition: background 0.15s, box-shadow 0.15s;
    margin-left: 4px;
    white-space: nowrap;
}

#new-chip-btn:hover {
    background: #0f2a0f;
    box-shadow: 0 0 8px rgba(0,255,65,0.3);
}`,
`#right-hud-tools { display: flex; gap: 8px; align-items: center; }
#new-chip-btn {
    font-family: var(--font-pixel);
    font-size: 8px;
    color: var(--text-accent);
    background: #0a1a0a;
    border: 1px solid var(--wire-green);
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
}
#new-chip-btn:hover { background: #1a3a1a; }
#reset-all-btn {
    font-family: var(--font-pixel);
    font-size: 8px;
    color: #ff3333;
    background: #331111;
    border: 1px solid #ff3333;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
}
#reset-all-btn:hover { background: #551111; }`);

html = html.replace(
`#board-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 8px;
}`,
`#board-wrapper {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    padding: 8px;
    overflow: auto;
}`);

html = html.replace(
`@media (max-width: 900px) {
    #game-container { flex-direction: column; }
    .panel { flex: none; height: 50vh; }
    #left-panel { border-right: none; border-bottom: 2px solid var(--wall-border); }
}`,
`@media (max-width: 900px) {
    #game-container { flex-direction: column; }
    #left-panel { flex: none; height: 45vh; border-right: none; border-bottom: 2px solid var(--wall-border); }
    #right-panel { flex: none; height: 55vh; }
}`);

html = html.replace(
`@media (max-width: 600px) {
    :root { --hud-height: 44px; --tray-height: 80px; }
    #title-logo { font-size: 28px; letter-spacing: 6px; }
    #press-start { font-size: 9px; }
    .heart { width: 12px; height: 12px; }
    #exp-bar-outer { width: 50px; }
}`,
`@media (max-width: 600px) {
    :root { --hud-height: auto; --tray-height: auto; }
    #left-hud { flex-wrap: wrap; padding: 6px 10px; gap: 4px; min-height: 50px; justify-content: flex-start; }
    .stat-item { flex: 1 1 45%; margin-bottom: 2px; justify-content: flex-start; }
    #time-text-display { margin-left: 0 !important; }
    #title-logo { font-size: 28px; letter-spacing: 6px; }
    #press-start { font-size: 9px; }
    .heart { width: 12px; height: 12px; }
    #exp-bar-outer { width: 50px; }
    
    #right-hud { justify-content: space-between; padding: 0 10px; min-height: 48px; }
    #what-space-title { font-size: 10px; }
    #right-hud-tools button { font-size: 10px; padding: 8px 12px; min-height: 48px; }
    
    #parts-tray { padding: 8px; }
    .tray-block { width: 48px; height: 48px; }
    #tray-blocks { gap: 12px; }
    .tray-section { gap: 12px; }
}`);

// 2. HTML
html = html.replace(
`<div id="right-hud">WHAT SPACE</div>`,
`<div id="right-hud">
            <span id="what-space-title">WHAT SPACE</span>
            <div id="right-hud-tools">
                <button id="new-chip-btn">NEW CHIP</button>
                <button id="reset-all-btn">RESET ALL</button>
            </div>
        </div>`);

// 3. Remove JS button creation logic
html = html.replace(
`    // NEW CHIP button
    const btn = document.getElementById('new-chip-btn');
    if (!btn) {
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '10px';
        btnContainer.style.marginTop = '10px';
        
        const newBtn = document.createElement('button');
        newBtn.id = 'new-chip-btn';
        newBtn.textContent = 'NEW CHIP';
        newBtn.addEventListener('click', createNewChip);
        
        const resetBtn = document.createElement('button');
        resetBtn.id = 'reset-all-btn';
        resetBtn.textContent = 'RESET ALL';
        resetBtn.style.background = '#331111';
        resetBtn.style.color = '#ff3333';
        resetBtn.style.borderColor = '#ff3333';
        resetBtn.addEventListener('click', () => {
            if (confirm('Clear all chips?')) {
                GameState.chips = [];
                GameState.nextChipId = 1;
                AudioSys.play('error');
            }
        });
        
        btnContainer.appendChild(newBtn);
        btnContainer.appendChild(resetBtn);
        container.appendChild(btnContainer);
    }
    
    // Wire block`,
`    // Wire block`);

// 4. Update init
html = html.replace(
`function init() {
    // Title screen handler
    document.getElementById('press-start').addEventListener('click', startGame);
    document.getElementById('title-screen').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') startGame();
    });

    // Setup parts tray`,
`function init() {
    // Title screen handler
    document.getElementById('press-start').addEventListener('click', startGame);
    document.getElementById('title-screen').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') startGame();
    });

    document.getElementById('new-chip-btn').addEventListener('click', createNewChip);
    document.getElementById('reset-all-btn').addEventListener('click', () => {
        if (confirm('Clear all chips?')) {
            GameState.chips = [];
            GameState.nextChipId = 1;
            AudioSys.play('error');
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && AudioSys.ctx && AudioSys.ctx.state === 'suspended') {
            AudioSys.ctx.resume();
        }
    });

    // Setup parts tray`);

// 5. Board size and touch
html = html.replace(
`    const cellSize = Math.floor(Math.min(bw / CONFIG.BOARD_COLS, bh / CONFIG.BOARD_ROWS));
    CONFIG.CELL_SIZE = Math.max(cellSize, 16);`,
`    const cellSize = Math.floor(Math.min(bw / CONFIG.BOARD_COLS, bh / CONFIG.BOARD_ROWS));
    const minCellSize = window.innerWidth <= 600 ? 48 : 16;
    CONFIG.CELL_SIZE = Math.max(cellSize, minCellSize);`);

html = html.replace(
`        if (clickedChip) {
            if (GameState.selectedTrayPart) {`,
`        if (clickedChip) {
            if (e.touches) e.preventDefault();
            if (GameState.selectedTrayPart) {`);

html = html.replace(
`        const handleDown = (e) => {
            if (GameState.phase !== 'playing') return;
            if (e.touches) e.preventDefault();`,
`        const handleDown = (e) => {
            if (GameState.phase !== 'playing') return;`);

html = html.replace(
`                    if (e.touches) e.preventDefault();
                    return;
                } else if (GameState.selectedTrayPart.category !== 'tool') {`,
`                    return;
                } else if (GameState.selectedTrayPart.category !== 'tool') {`);

html = html.replace(
`                    if (e.touches) e.preventDefault();
                    return;
                }
            }`,
`                    return;
                }
            }`);

html = html.replace(
`                    GameState.dragState = null;
                    if (e.touches) e.preventDefault();
                    return;
                }`,
`                    GameState.dragState = null;
                    return;
                }`);

html = html.replace(
`                document.body.style.cursor = 'grabbing';
            }
            if (e.touches) e.preventDefault();
        } else {`,
`                document.body.style.cursor = 'grabbing';
            }
        } else {`);

// 6. FOV opacity
html = html.replace(
`    mctx.fillStyle = 'rgba(0, 255, 65, 0.05)';
    mctx.strokeStyle = 'rgba(0, 255, 65, 0.15)';`,
`    mctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
    mctx.strokeStyle = 'rgba(0, 255, 65, 0.3)';`);

fs.writeFileSync('index.html', html);
console.log('Update complete');
