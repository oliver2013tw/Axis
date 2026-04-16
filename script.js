const dropzone = document.getElementById('dropzone');
const dashboard = document.getElementById('dashboard');
const logWaterfall = document.getElementById('log-waterfall');
const timelineTrack = document.getElementById('timeline-track');

// 監聽拖放事件
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.opacity = '0.4';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.opacity = '1';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        startAevumLSD(files[0].name);
    }
});

// 啟動 Aevum LSD 矩陣展開
function startAevumLSD(fileName) {
    dropzone.style.display = 'none';
    dashboard.classList.remove('dashboard-hidden');
    
    addLog(`INITIATING LOGIC SCAN: ${fileName}...`, false);
    
    // 模擬數據湧入
    setTimeout(() => {
        simulateLogs();
    }, 800);
}

// 模擬無盡瀑布日誌與錯誤標記
function addLog(message, isError = false) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${isError ? 'log-error' : ''}`;
    entry.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
    logWaterfall.appendChild(entry);
    
    // 自動捲動到底部 (無盡滾動)
    logWaterfall.scrollTop = logWaterfall.scrollHeight;

    if (isError) {
        // 觸發局部邊框警告
        document.querySelector('.log-panel').classList.add('panel-error');
        // 在時間軸添加紅線標記
        addErrorMark();
    }
}

function addErrorMark() {
    const mark = document.createElement('div');
    mark.className = 'error-mark';
    mark.style.left = Math.random() * 100 + '%'; // 模擬時間點
    timelineTrack.appendChild(mark);
}

// 模擬運行中的代碼
function simulateLogs() {
    const logs = [
        "COMPILING MODULES...",
        "MEMORY ALLOCATION OPTIMIZED",
        "ERROR: NULL_POINTER_EXCEPTION AT HEXAVAULT_CORE.PY",
        "RETRYING LOGIC ATTACHMENT...",
        "DATA STREAM STABILIZED",
        "MONITORING SYSTEM VARIABLES..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        const isErr = logs[i].includes("ERROR");
        addLog(logs[i], isErr);
        i++;
        if (i >= logs.length) clearInterval(interval);
    }, 1200);
}
