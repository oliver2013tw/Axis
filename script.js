const dropzone = document.getElementById('dropzone');
const dashboard = document.getElementById('dashboard');
const logWaterfall = document.getElementById('log-waterfall');
const varMatrix = document.getElementById('var-matrix');
const timelineTrack = document.getElementById('timeline-track');

const MAX_LOG_ENTRIES = 500; // 防止內存洩漏
const ALLOWED_EXTENSIONS = ['.py', '.js', '.json', '.txt', '.cpp'];

// 拖放交互
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.opacity = '0.5'; });
dropzone.addEventListener('dragleave', () => { dropzone.style.opacity = '1'; });
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file.name)) {
        initiateSystem(file.name);
    } else {
        alert("INVALID LOGIC TYPE. SYSTEM REJECTED.");
        dropzone.style.opacity = '1';
    }
});

function validateFile(name) {
    return ALLOWED_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext));
}

function initiateSystem(fileName) {
    dropzone.style.display = 'none';
    dashboard.classList.remove('dashboard-hidden');
    
    // 重置介面
    logWaterfall.innerHTML = '';
    varMatrix.innerHTML = '';
    
    pushLog(`MONOLITH SYSTEM ACTIVE: MOUNTING ${fileName.toUpperCase()}`, false);
    
    // 啟動虛擬執行
    startSimulation();
}

function pushLog(msg, isErr = false) {
    if (logWaterfall.children.length > MAX_LOG_ENTRIES) {
        logWaterfall.removeChild(logWaterfall.firstChild);
    }

    const div = document.createElement('div');
    div.className = `log-entry ${isErr ? 'log-error' : ''}`;
    div.innerText = `> ${msg}`;
    logWaterfall.appendChild(div);
    logWaterfall.scrollTop = logWaterfall.scrollHeight;

    if (isErr) {
        document.querySelector('.log-panel').classList.add('panel-error');
        createTimelineMark();
    }
}

function updateVar(name, value) {
    let el = document.getElementById(`var-${name}`);
    if (!el) {
        el = document.createElement('div');
        el.id = `var-${name}`;
        el.className = 'var-item';
        varMatrix.appendChild(el);
    }
    el.innerHTML = `<span style="opacity:0.5">${name}:</span> <span class="var-value var-changing">${value}</span>`;
    
    // 移除閃爍動畫以便下次觸發
    setTimeout(() => {
        el.querySelector('.var-value').classList.remove('var-changing');
    }, 500);
}

function createTimelineMark() {
    const mark = document.createElement('div');
    mark.className = 'error-mark'; // CSS中定義的紅線
    mark.style.position = 'absolute';
    mark.style.left = (Math.random() * 100) + '%';
    mark.style.width = '1px';
    mark.style.height = '10px';
    mark.style.background = '#ff3e3e';
    mark.style.top = '-5px';
    timelineTrack.appendChild(mark);
}

// 模擬運算
function startSimulation() {
    let count = 0;
    const mockData = ["PROCESS_START", "AUTH_SYNCING", "ENCRYPT_AES_256", "BUFFER_OVERFLOW_PREVENTION", "TRACE_COMPLETE"];
    
    setInterval(() => {
        const msg = mockData[Math.floor(Math.random() * mockData.length)];
        const isErr = Math.random() > 0.85;
        pushLog(isErr ? `CRITICAL_EXCEPTION_IN_${msg}` : `STATUS_OK: ${msg}`, isErr);
        
        updateVar("sys_entropy", (Math.random() * 100).toFixed(2));
        updateVar("logic_state", isErr ? "HALT" : "EXEC");
        count++;
    }, 1000);
}
