const dropzone = document.getElementById('dropzone');
const dashboard = document.getElementById('dashboard');
const logWaterfall = document.getElementById('log-waterfall');
const varMatrix = document.getElementById('var-matrix');
const fileInput = document.getElementById('fileInput');

// 處理點擊與檔案選擇
function handleFileSelect(input) {
    const file = input.files[0];
    if (file) {
        processFile(file.name);
    }
}

// 處理拖放事件
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.opacity = '0.5';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.opacity = '1';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file.name);
});

// 啟動系統核心
function processFile(name) {
    // 視覺回饋：立即隱藏進入畫面
    dropzone.style.opacity = '0';
    
    setTimeout(() => {
        dropzone.style.display = 'none';
        dashboard.classList.remove('dashboard-hidden');
        console.log("System Initialized with:", name);
        runAevumSimulation(name);
    }, 500);
}

// 模擬 Debug 數據流
function runAevumSimulation(fileName) {
    // 清除舊日誌
    logWaterfall.innerHTML = '';
    varMatrix.innerHTML = '';

    addLog(`MOUNTING LOGIC UNIT: ${fileName.toUpperCase()}`, false);
    addLog("KERNEL_ESTABLISHED. INITIATING TRACKING...", false);

    const mockLogs = [
        "FETCHING MEMORY ADDR: 0x004F32",
        "LOGIC_GATE_STATUS: STABLE",
        "SYNCING WITH AEVUM_LSD_CLOUD",
        "HEXAVAULT_DECRYPT_ACTIVE",
        "TRACE_COMPLETE",
        "ENCRYPT_SEQUENCE_INIT",
        "ACCESS_GRANTED_LEVEL_A"
    ];

    // 核心循環：每 1.2 秒噴出一次日誌
    setInterval(() => {
        const isError = Math.random() > 0.85;
        const randomMsg = mockLogs[Math.floor(Math.random() * mockLogs.length)];
        
        addLog(isError ? `CRITICAL_ERROR: DATA_CORRUPTION` : `EXEC_SUCCESS: ${randomMsg}`, isError);
        
        // 更新變數矩陣
        updateVariable("entropy", (Math.random() * 10).toFixed(4));
        updateVariable("voltage", (1.2 + Math.random() * 0.5).toFixed(2) + "V");
        updateVariable("status", isError ? "RETRYING" : "ACTIVE");
        
        // 移動時間軸滑塊
        const thumb = document.getElementById('timeline-thumb');
        if (thumb) {
            let currentPos = parseFloat(thumb.style.left) || 0;
            thumb.style.left = ((currentPos + 1.5) % 100) + '%';
        }
    }, 1200);
}

function addLog(msg, isError) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${isError ? 'log-error' : ''}`;
    entry.innerText = `> ${msg}`;
    logWaterfall.appendChild(entry);
    
    // 自動捲動
    logWaterfall.scrollTop = logWaterfall.scrollHeight;

    // 錯誤時的邊框閃爍
    if (isError) {
        const panel = document.querySelector('.log-panel');
        if (panel) {
            panel.style.borderColor = '#ff3e3e';
            setTimeout(() => panel.style.borderColor = 'rgba(255,255,255,0.1)', 300);
        }
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
    el.innerHTML = `<span style="opacity:0.4">${key.toUpperCase()}</span><br><span style="color:#3b82f6">${val}</span>`;
}
