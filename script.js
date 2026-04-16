const dropzone = document.getElementById('dropzone');
const dashboard = document.getElementById('dashboard');
const logWaterfall = document.getElementById('log-waterfall');
const varMatrix = document.getElementById('var-matrix');

// 檔案驗證
const ALLOWED_EXT = ['.py', '.js', '.txt', '.json', '.cpp', '.html', '.css'];

function validateFile(name) {
    return ALLOWED_EXT.some(ext => name.toLowerCase().endsWith(ext));
}

// 處理選擇檔案 (手機 & 點擊)
function handleFileSelect(input) {
    const file = input.files[0];
    if (file) {
        processFile(file.name);
    }
}

// 處理拖放
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.opacity = '0.5'; });
dropzone.addEventListener('dragleave', () => { dropzone.style.opacity = '1'; });
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file.name);
});

// 啟動系統
function processFile(name) {
    if (!validateFile(name)) {
        alert("UNSUPPORTED LOGIC UNIT.");
        return;
    }

    dropzone.style.opacity = '0';
    setTimeout(() => {
        dropzone.style.display = 'none';
        dashboard.classList.remove('dashboard-hidden');
        runAevumSimulation(name);
    }, 500);
}

// 模擬 Debug 數據流
function runAevumSimulation(fileName) {
    addLog(`SYSTEM_MOUNT: ${fileName.toUpperCase()}`, false);
    addLog("KERNEL_ESTABLISHED. INITIATING TRACKING...", false);

    const mockLogs = [
        "FETCHING MEMORY ADDR: 0x004F32",
        "LOGIC_GATE_STATUS: STABLE",
        "SYNCING WITH AEVUM_LSD_CLOUD",
        "ERROR: DATA_CORRUPTION_DETECTION",
        "HEXAVAULT_DECRYPT_ACTIVE",
        "RETRYING_CONNECTION..."
    ];

    setInterval(() => {
        const isError = Math.random() > 0.85;
        const msg = mockLogs[Math.floor(Math.random() * mockLogs.size)]; // 修復小錯誤
        addLog(isError ? `CRITICAL: ${mockLogs[3]}` : `EXEC: ${mockLogs[Math.floor(Math.random()*mockLogs.length)]}`, isError);
        
        updateVariable("entropy", (Math.random() * 10).toFixed(4));
        updateVariable("status", isError ? "HALT" : "RUNNING");
        
        // 移動時間軸滑塊
        const thumb = document.getElementById('timeline-thumb');
        let currentPos = parseFloat(thumb.style.left) || 0;
        thumb.style.left = ((currentPos + 1) % 100) + '%';
    }, 1200);
}

function addLog(msg, isError) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${isError ? 'log-error' : ''}`;
    entry.innerText = `> ${msg}`;
    logWaterfall.appendChild(entry);
    logWaterfall.scrollTop = logWaterfall.scrollHeight;

    if (isError) {
        const panel = document.querySelector('.log-panel');
        panel.style.borderColor = '#ff3e3e';
        setTimeout(() => panel.style.borderColor = 'rgba(255,255,255,0.1)', 200);
    }
}

function updateVariable(key, val) {
    let el = document.getElementById(`var-${key}`);
    if (!el) {
        el = document.createElement('div');
        el.id = `var-${key}`;
        el.className = 'var-item';
        varMatrix.appendChild(el);
    }
    el.innerHTML = `<span style="opacity:0.4">${key.toUpperCase()}</span><br>${val}`;
}
