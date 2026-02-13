// ============================================================
// CONFIGURATION - Replace with your Azure backend URL
// ============================================================
const API_URL = 'https://rocket-clicker-api.azurewebsites.net/api';
const SIGNALR_URL = 'https://rocket-clicker-api.azurewebsites.net/hub/chat';
// ============================================================

// Console logging
let consoleContent;
let clearConsoleBtn;

function logToConsole(message, type = 'info') {
    if (!consoleContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const messageDiv = document.createElement('div');
    messageDiv.className = `console-message ${type}`;
    messageDiv.innerHTML = `<span class="console-timestamp">[${timestamp}]</span>${message}`;
    
    consoleContent.appendChild(messageDiv);
    consoleContent.scrollTop = consoleContent.scrollHeight;
}

function clearConsole() {
    if (consoleContent) {
        consoleContent.innerHTML = '<div class="console-message info">Console cleared.</div>';
    }
}

// Error code utilities
class ApiError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'ApiError';
    }
}

function extractErrorCode(error) {
    if (error instanceof ApiError) {
        return error.code;
    }
    const match = error.message.match(/\(([A-Z_]+)\)$/);
    return match ? match[1] : null;
}

// API Functions
async function send_get(path, token) {
    logToConsole(`<strong>GET</strong> ${path}`, 'request');
    
    try {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined,
            },
        });

        if (response.status === 429) {
            logToConsole(`<strong>Error</strong> 429: Rate limit exceeded`, 'error');
            throw new ApiError('Rate limit exceeded', 'TOO_MANY_REQUESTS', 429);
        }
        
        const data = await response.json();
        
        if (response.ok) {
            logToConsole(`<strong>Response</strong> ${response.status}: ${JSON.stringify(data)}`, 'response');
            return data;
        } else {
            const errorMsg = data.message || 'Unknown error';
            const errorCode = data.code || 'UNKNOWN_ERROR';
            logToConsole(`<strong>Error</strong> ${response.status} [${errorCode}]: ${errorMsg}`, 'error');
            throw new ApiError(errorMsg, errorCode, response.status);
        }
    } catch (error) {
        if (!(error instanceof ApiError)) {
            logToConsole(`<strong>Error</strong> ${error.message}`, 'error');
        }
        throw error;
    }
}

async function send_post(path, data, token) {
    logToConsole(`<strong>POST</strong> ${path} - Body: ${JSON.stringify(data)}`, 'request');
    
    try {
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined,
                'Content-Type': 'application/json',
            },
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
            logToConsole(`<strong>Response</strong> ${response.status}: ${JSON.stringify(responseData)}`, 'response');
            return responseData;
        } else {
            const errorMsg = responseData.message || 'Unknown error';
            const errorCode = responseData.code || 'UNKNOWN_ERROR';
            logToConsole(`<strong>Error</strong> ${response.status} [${errorCode}]: ${errorMsg}`, 'error');
            throw new ApiError(errorMsg, errorCode, response.status);
        }
    } catch (error) {
        if (!(error instanceof ApiError)) {
            logToConsole(`<strong>Error</strong> ${error.message}`, 'error');
        }
        throw error;
    }
}

async function send_put(path, data, token) {
    logToConsole(`<strong>PUT</strong> ${path} - Body: ${JSON.stringify(data)}`, 'request');
    
    try {
        const response = await fetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined,
                'Content-Type': 'application/json',
            },
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
            logToConsole(`<strong>Response</strong> ${response.status}: ${JSON.stringify(responseData)}`, 'response');
            return responseData;
        } else {
            const errorMsg = responseData.message || 'Unknown error';
            const errorCode = responseData.code || 'UNKNOWN_ERROR';
            logToConsole(`<strong>Error</strong> ${response.status} [${errorCode}]: ${errorMsg}`, 'error');
            throw new ApiError(errorMsg, errorCode, response.status);
        }
    } catch (error) {
        if (!(error instanceof ApiError)) {
            logToConsole(`<strong>Error</strong> ${error.message}`, 'error');
        }
        throw error;
    }
}

async function send_delete(path, token) {
    logToConsole(`<strong>DELETE</strong> ${path}`, 'request');
    
    try {
        const response = await fetch(path, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined,
            },
        });
        
        const data = await response.json();
        
        if (response.ok) {
            logToConsole(`<strong>Response</strong> ${response.status}: ${JSON.stringify(data)}`, 'response');
            return data;
        } else {
            const errorMsg = data.message || 'Unknown error';
            const errorCode = data.code || 'UNKNOWN_ERROR';
            logToConsole(`<strong>Error</strong> ${response.status} [${errorCode}]: ${errorMsg}`, 'error');
            throw new ApiError(errorMsg, errorCode, response.status);
        }
    } catch (error) {
        if (!(error instanceof ApiError)) {
            logToConsole(`<strong>Error</strong> ${error.message}`, 'error');
        }
        throw error;
    }
}

async function login(username, password) {
    const response = await send_post(`${API_URL}/User/Login`, {
        username: username,
        password: password
    });
    return response;
}

async function register(username, password) {
    const response = await send_post(`${API_URL}/User/Register`, {
        username: username,
        password: password
    });
    return response;
}

async function getProgression(token) {
    const response = await send_get(`${API_URL}/Game/Progression`, token);
    return response;
}

async function initializeProgression(token) {
    const response = await send_get(`${API_URL}/Game/Initialize`, token);
    return response;
}

async function sendClick(token) {
    const response = await send_get(`${API_URL}/Game/Click`, token);
    return response;
}

async function getAllUsers(token) {
    const response = await send_get(`${API_URL}/User/All`, token);
    return response;
}

async function searchUsers(name, token) {
    const response = await send_get(`${API_URL}/User/Search/${encodeURIComponent(name)}`, token);
    return response;
}

async function getAllAdmins(token) {
    const response = await send_get(`${API_URL}/User/AllAdmin`, token);
    return response;
}

async function deleteUser(userId, token) {
    const response = await send_delete(`${API_URL}/User/${userId}`, token);
    return response;
}

async function resetProgression(token) {
    const response = await send_post(`${API_URL}/Game/Reset`, {}, token);
    return response;
}

async function getResetCost(token) {
    const response = await send_get(`${API_URL}/Game/ResetCost`, token);
    return response;
}

async function getBestScore(token) {
    const response = await send_get(`${API_URL}/Game/BestScore`, token);
    return response;
}

async function getUserById(userId, token) {
    const response = await send_get(`${API_URL}/User/${userId}`, token);
    return response;
}

async function seedInventory() {
    const response = await send_get(`${API_URL}/Inventory/Seed`);
    return response;
}

async function getItems() {
    const response = await send_get(`${API_URL}/Inventory/Items`);
    return response;
}

async function getUserInventory(token) {
    const response = await send_get(`${API_URL}/Inventory/UserInventory`, token);
    return response;
}

async function buyItem(itemId, token) {
    const response = await send_post(`${API_URL}/Inventory/Buy/${itemId}`, {}, token);
    return response;
}

// Authentication
let authToken = null;
let currentUserId = null;
let currentUsername = null;
let isRegisterMode = false;

// Game Logic
let score = 0;
let clickCount = 0;
let pointsPerClick = 1;
let multiplier = 1;
let totalClickValue = 0;
let bestScore = 0;
let currentResetCost = 100;

let scoreElement;
let clickCountElement;
let perClickElement;
let totalClickValueElement;
let bestScoreElement;
let clickButton;
let resetButton;

// Login elements
let loginContainer;
let gameContainer;
let usernameInput;
let passwordInput;
let submitButton;
let loginMessage;
let loggedUsernameSpan;
let logoutButton;
let formTitle;
let toggleText;
let toggleLink;

// Users panel elements
let usersPanel;
let togglePanelBtn;
let closePanelBtn;
let refreshUsersBtn;
let showAdminsBtn;
let usersList;
let userSearchInput;
let clearSearchBtn;
let isPanelOpen = false;
let currentFilter = 'all';

// Best score elements
let bestScoreDisplay;
let bestScoreValue;
let bestScorePlayer;

// Shop panel elements
let shopPanel;
let toggleShopBtn;
let closeShopBtn;
let shopTabBtn;
let inventoryTabBtn;
let seedShopBtn;
let shopContent;
let inventoryContent;
let isShopPanelOpen = false;
let currentShopTab = 'shop';
let shopItems = [];

// Chat panel elements
let chatPanel;
let toggleChatBtn;
let closeChatBtn;
let chatMessages;
let chatInput;
let sendChatBtn;
let isChatPanelOpen = false;
let chatConnection = null;

function initChat() {
    chatConnection = new signalR.HubConnectionBuilder()
        .withUrl(SIGNALR_URL)
        .withAutomaticReconnect()
        .build();

    chatConnection.on("ReceiveMessage", (user, message) => {
        logToConsole(`📩 WebSocket received: ReceiveMessage from ${user}`, 'info');
        const isSystem = user === "SYSTEM";
        const isMine = user === currentUsername;
        addChatMessage(user, message, isSystem, isMine);
    });

    chatConnection.on("ReceiveReset", (user, points) => {
        logToConsole(`📩 WebSocket received: ReceiveReset from ${user}`, 'info');
        addChatMessage("SYSTEM", `${user} a reset son score de ${points.toLocaleString()} points !`, true, false);
    });

    chatConnection.on("UpdateUserCount", (count) => {
        logToConsole(`📩 WebSocket received: UpdateUserCount (${count})`, 'info');
        toggleChatBtn.textContent = `💬 Chat (${count})`;
        addChatMessage("SYSTEM", `${count} joueurs connectés`, true, false);
    });

    chatConnection.on("NewHighScore", (user, score) => {
        logToConsole(`📩 WebSocket received: NewHighScore from ${user}`, 'info');
        addChatMessage("SYSTEM", `🏆 NOUVEAU RECORD ! ${user} a atteint ${score.toLocaleString()} clicks !`, true, false);
    });

    chatConnection.on("PlayerReset", (user, score) => {
        logToConsole(`📩 WebSocket received: PlayerReset from ${user}`, 'info');
        addChatMessage("SYSTEM", `♻️ ${user} a reset sa progression avec un score de ${score.toLocaleString()} !`, true, false);
    });

    chatConnection.on("ScoreUpdate", (newScore) => {
        logToConsole(`📩 WebSocket received: ScoreUpdate (${newScore})`, 'info');
        score = newScore;
        clickCount = newScore;
        updateDisplay();
    });

    chatConnection.start()
        .then(() => {
            logToConsole("Connected to Chat Hub", "success");
            toggleChatBtn.style.display = 'block';
            chatConnection.invoke("Login", currentUserId);
            logToConsole(`📩 WebSocket sent: Login (${currentUserId})`, 'info');
        })
        .catch(err => {
            console.error("SignalR Connection Error: ", err);
            logToConsole("Failed to connect to Chat Hub", "error");
        });
}

function addChatMessage(user, message, isSystem, isMine) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isSystem ? 'system' : ''} ${isMine ? 'mine' : ''}`;
    
    const authorDiv = document.createElement('div');
    authorDiv.className = 'message-author';
    authorDiv.textContent = user;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(authorDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message || !chatConnection) return;

    try {
        await chatConnection.invoke("SendMessage", currentUsername, message);
        chatInput.value = '';
    } catch (err) {
        console.error(err);
        logToConsole(`Failed to send message: ${err.message}`, 'error');
    }
}

function toggleChatPanel() {
    isChatPanelOpen = !isChatPanelOpen;
    
    if (isChatPanelOpen) {
        if (isShopPanelOpen) toggleShopPanel();
        if (isPanelOpen) toggleUsersPanel();
    }
    
    if (isChatPanelOpen) {
        chatPanel.classList.add('open');
        chatPanel.style.display = 'flex';
    } else {
        chatPanel.classList.remove('open');
        setTimeout(() => {
            if (!isChatPanelOpen) chatPanel.style.display = 'none';
        }, 300);
    }
}

function closeChatPanel() {
    if (isChatPanelOpen) {
        toggleChatPanel();
    }
}

function updateDisplay() {
    scoreElement.textContent = score.toLocaleString();
    clickCountElement.textContent = clickCount.toLocaleString();
    perClickElement.textContent = multiplier.toLocaleString();
    totalClickValueElement.textContent = totalClickValue.toLocaleString();
    bestScoreElement.textContent = bestScore.toLocaleString();
    
    if (resetButton) {
        resetButton.textContent = `⚡ Reset (Cost: ${currentResetCost.toLocaleString()} clicks)`;
    }
    
    if (bestScoreElement) {
        if (score > bestScore) {
            bestScoreElement.style.color = '#ffd700';
            bestScoreElement.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        } else if (score >= bestScore * 0.9) {
            bestScoreElement.style.color = '#ff9800';
            bestScoreElement.style.textShadow = 'none';
        } else {
            bestScoreElement.style.color = '';
            bestScoreElement.style.textShadow = 'none';
        }
    }
}

function createFloatingNumber(x, y, value) {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    floatingNum.textContent = `+${value}`;
    floatingNum.style.left = `${x}px`;
    floatingNum.style.top = `${y}px`;
    document.body.appendChild(floatingNum);

    setTimeout(() => {
        floatingNum.remove();
    }, 1000);
}

async function handleClick(e) {
    if (!authToken) {
        logToConsole('Cannot click: not logged in', 'error');
        return;
    }

    clickButton.disabled = true;

    try {
        const response = await sendClick(authToken);

        if (response && response.count !== undefined) {
            score = response.count;
            clickCount = response.count;
            if (response.multiplier !== undefined) {
                multiplier = response.multiplier;
            }
            if (response.totalClickValue !== undefined) {
                totalClickValue = response.totalClickValue;
            }
            updateDisplay();

            const rect = clickButton.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const actualClickValue = (1 + totalClickValue) * multiplier;
            createFloatingNumber(x, y, actualClickValue);
        }
    } catch (error) {
        console.error('Click error:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'NO_PROGRESSION') {
            logToConsole(`No progression found. Attempting to initialize...`, 'info');
            try {
                await initializeProgression(authToken);
                const retryResponse = await sendClick(authToken);
                if (retryResponse && retryResponse.count !== undefined) {
                    score = retryResponse.count;
                    clickCount = retryResponse.count;
                    if (retryResponse.multiplier !== undefined) {
                        multiplier = retryResponse.multiplier;
                    }
                    if (retryResponse.totalClickValue !== undefined) {
                        totalClickValue = retryResponse.totalClickValue;
                    }
                    updateDisplay();
                }
            } catch (retryError) {
                logToConsole(`Failed to recover from error: ${retryError.message}`, 'error');
            }
        } else if (errorCode === 'TOO_MANY_REQUESTS' || error.status === 429) {
            const originalContent = clickButton.innerHTML;
            clickButton.disabled = true;
            clickButton.innerHTML = "⏳<br>Cooldown";
            logToConsole(`⚠️ Rate limit exceeded! Wait a bit.`, 'warning');
            
            setTimeout(() => {
                clickButton.disabled = false;
                clickButton.innerHTML = originalContent;
            }, 5000);
        } else {
            logToConsole(`Click failed: ${error.message}`, 'error');
        }
    } finally {
        if (clickButton.innerHTML.indexOf("Cooldown") === -1) {
            clickButton.disabled = false;
        }
    }
}

async function updateResetCost() {
    if (!authToken) return;
    
    try {
        const costData = await getResetCost(authToken);
        if (costData && costData.cost !== undefined) {
            currentResetCost = costData.cost;
            updateDisplay();
        }
    } catch (error) {
        console.error('Error fetching reset cost:', error);
    }
}

async function handleReset() {
    if (!authToken) {
        logToConsole('Cannot reset: not logged in', 'error');
        return;
    }

    const nextMultiplier = multiplier + 1;
    const nextResetCost = Math.floor(100 * Math.pow(1.5, nextMultiplier - 1));
    const isNewBest = score > bestScore;
    
    let confirmMessage = `Reset your ${score.toLocaleString()} clicks to 0 and gain +1 multiplier?\n\nCurrent multiplier: ${multiplier}\nNew multiplier: ${nextMultiplier}\n\nNext reset will cost: ${nextResetCost.toLocaleString()} clicks`;
    
    if (isNewBest) {
        confirmMessage += `\n\n🏆 NEW BEST SCORE! 🏆\nYour best will be: ${score.toLocaleString()}`;
    }
    
    if (!confirm(confirmMessage)) {
        logToConsole('Reset cancelled by user', 'info');
        return;
    }

    resetButton.disabled = true;

    try {
        const oldBestScore = bestScore;
        const oldScore = score;
        const response = await resetProgression(authToken);

        if (response && response.count !== undefined) {
            score = response.count;
            clickCount = response.count;
            multiplier = response.multiplier;
            totalClickValue = response.totalClickValue || 0;
            bestScore = response.bestScore || bestScore;
            
            await updateResetCost();
            
            if (bestScore > oldBestScore) {
                logToConsole(`🎉 <strong>RESET COMPLETE!</strong> Multiplier: ${multiplier - 1} → ${multiplier} | 🏆 <strong>NEW BEST: ${bestScore.toLocaleString()}!</strong> | Next reset: ${currentResetCost.toLocaleString()} clicks`, 'info');
            } else {
                logToConsole(`🎉 <strong>RESET COMPLETE!</strong> Multiplier: ${multiplier - 1} → ${multiplier} | Clicks: ${oldScore.toLocaleString()} → 0 | Next reset: ${currentResetCost.toLocaleString()} clicks`, 'info');
            }
            
            updateDisplay();
            await loadBestScore();
        }
    } catch (error) {
        console.error('Reset error:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'INSUFFICIENT_CLICKS') {
            logToConsole(`❌ Reset failed: ${error.message}`, 'error');
        } else {
            logToConsole(`❌ Reset failed: ${error.message}`, 'error');
        }
    } finally {
        resetButton.disabled = false;
    }
}

async function handleSubmit() {
    if (isRegisterMode) {
        await handleRegister();
    } else {
        await handleLogin();
    }
}

async function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showLoginMessage('Please enter username and password', 'error');
        return;
    }

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';

        const response = await login(username, password);

        if (response && response.token) {
            authToken = response.token;
            currentUserId = response.user ? response.user.id : null;
            currentUsername = response.user ? response.user.username : username;
            
            await loadUserProgression(authToken);
            
            showGameScreen();
            showLoginMessage('Login successful!', 'success');
            
            if (!chatConnection) {
                initChat();
            }
        } else {
            showLoginMessage('Invalid credentials', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'USER_NOT_FOUND') {
            showLoginMessage('User not found. Please check your username.', 'error');
        } else if (errorCode === 'INVALID_PASSWORD') {
            showLoginMessage('Invalid password. Please try again.', 'error');
        } else {
            showLoginMessage('Login failed. Please check your credentials.', 'error');
        }
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
}

async function handleRegister() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showLoginMessage('Please enter username and password', 'error');
        return;
    }

    if (password.length < 3) {
        showLoginMessage('Password must be at least 3 characters', 'error');
        return;
    }

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Registering...';

        const response = await register(username, password);

        if (response && response.token) {
            showLoginMessage('Registration successful! Logging you in...', 'success');
            
            authToken = response.token;
            currentUserId = response.user ? response.user.id : null;
            currentUsername = response.user ? response.user.username : username;
            
            await loadUserProgression(authToken);
            
            setTimeout(() => {
                showGameScreen();
                if (!chatConnection) {
                    initChat();
                }
            }, 500);
        } else {
            showLoginMessage('Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'USERNAME_EXISTS') {
            showLoginMessage('Username already exists. Please choose another.', 'error');
        } else {
            showLoginMessage('Registration failed. Please try again.', 'error');
        }
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = isRegisterMode ? 'Register' : 'Login';
    }
}

function showLoginMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = `login-message ${type}`;
}

function showGameScreen() {
    loginContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    loggedUsernameSpan.textContent = currentUsername;
    updateDisplay();
    
    toggleShopBtn.style.display = 'block';
    togglePanelBtn.style.display = 'block';
    
    bestScoreDisplay.style.display = 'block';
    loadBestScore();
}

function showLoginScreen() {
    gameContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    usernameInput.value = '';
    passwordInput.value = '';
    loginMessage.textContent = '';
    
    toggleShopBtn.style.display = 'none';
    togglePanelBtn.style.display = 'none';
    toggleChatBtn.style.display = 'none';
    
    bestScoreDisplay.style.display = 'none';
}

async function loadUserProgression(token) {
    try {
        logToConsole(`Loading progression...`, 'info');
        
        let progression = null;
        
        try {
            progression = await getProgression(token);
        } catch (error) {
            const errorCode = error.code || extractErrorCode(error);
            
            if (errorCode === 'NO_PROGRESSION') {
                logToConsole(`No progression found, initializing...`, 'info');
                try {
                    progression = await initializeProgression(token);
                } catch (initError) {
                    const initErrorCode = initError.code || extractErrorCode(initError);
                    
                    if (initErrorCode === 'PROGRESSION_EXISTS') {
                        logToConsole(`Progression exists, fetching again...`, 'info');
                        progression = await getProgression(token);
                    } else {
                        throw initError;
                    }
                }
            } else {
                throw error;
            }
        }
        
        if (progression && progression.count !== undefined) {
            score = progression.count;
            clickCount = progression.count;
            multiplier = progression.multiplier || 1;
            totalClickValue = progression.totalClickValue || 0;
            bestScore = progression.bestScore || 0;
            logToConsole(`Progression loaded: ${progression.count} clicks, multiplier: ${multiplier}, totalClickValue: ${totalClickValue}, best: ${bestScore}`, 'info');
            
            await updateResetCost();
            
            updateDisplay();
        }
    } catch (error) {
        console.error('Error loading progression:', error);
        logToConsole(`Failed to load progression: ${error.message}`, 'error');
        score = 0;
        clickCount = 0;
        updateDisplay();
    }
}

function handleLogout() {
    if (chatConnection) {
        chatConnection.stop();
        chatConnection = null;
    }
    authToken = null;
    currentUserId = null;
    currentUsername = null;
    score = 0;
    clickCount = 0;
    multiplier = 1;
    totalClickValue = 0;
    bestScore = 0;
    currentResetCost = 100;
    
    closeShopPanel();
    closeUsersPanel();
    closeChatPanel();
    
    showLoginScreen();
}

function toggleMode() {
    isRegisterMode = !isRegisterMode;
    
    if (isRegisterMode) {
        formTitle.textContent = 'Register';
        submitButton.textContent = 'Register';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Login';
    } else {
        formTitle.textContent = 'Login';
        submitButton.textContent = 'Login';
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = 'Register';
    }
    
    loginMessage.textContent = '';
    loginMessage.className = 'login-message';
}

// Users Panel Functions
function toggleUsersPanel() {
    isPanelOpen = !isPanelOpen;
    
    if (isPanelOpen) {
        if (isShopPanelOpen) toggleShopPanel();
        if (isChatPanelOpen) toggleChatPanel();

        usersPanel.classList.add('open');
        togglePanelBtn.classList.add('panel-open');
        document.body.classList.add('panel-open');
        loadAllUsers();
    } else {
        usersPanel.classList.remove('open');
        togglePanelBtn.classList.remove('panel-open');
        document.body.classList.remove('panel-open');
    }
}

function closeUsersPanel() {
    if (isPanelOpen) {
        toggleUsersPanel();
    }
}

async function loadAllUsers() {
    try {
        userSearchInput.value = '';
        clearSearchBtn.style.display = 'none';
        
        currentFilter = 'all';
        updateFilterButtons();
        usersList.innerHTML = '<div class="loading">Loading users...</div>';
        const users = await getAllUsers(authToken);
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        usersList.innerHTML = '<div class="loading">Failed to load users</div>';
    }
}

async function loadAdmins() {
    try {
        userSearchInput.value = '';
        clearSearchBtn.style.display = 'none';
        
        currentFilter = 'admins';
        updateFilterButtons();
        usersList.innerHTML = '<div class="loading">Loading admins...</div>';
        const admins = await getAllAdmins(authToken);
        
        if (admins && admins.length > 0) {
            displayUsers(admins);
        } else {
            usersList.innerHTML = '<div class="loading">No admins found</div>';
        }
    } catch (error) {
        console.error('Error loading admins:', error);
        usersList.innerHTML = '<div class="loading">Failed to load admins</div>';
    }
}

function updateFilterButtons() {
    if (currentFilter === 'all') {
        refreshUsersBtn.classList.add('active');
        showAdminsBtn.classList.remove('active');
    } else if (currentFilter === 'admins') {
        refreshUsersBtn.classList.remove('active');
        showAdminsBtn.classList.add('active');
    } else {
        refreshUsersBtn.classList.remove('active');
        showAdminsBtn.classList.remove('active');
    }
}

let searchTimeout = null;

async function handleUserSearch() {
    const searchTerm = userSearchInput.value.trim();
    
    if (searchTerm) {
        clearSearchBtn.style.display = 'block';
    } else {
        clearSearchBtn.style.display = 'none';
    }
    
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    if (!searchTerm) {
        if (currentFilter === 'admins') {
            await loadAdmins();
        } else {
            await loadAllUsers();
        }
        return;
    }
    
    currentFilter = 'search';
    updateFilterButtons();
    
    searchTimeout = setTimeout(async () => {
        try {
            usersList.innerHTML = '<div class="loading">Searching...</div>';
            const users = await searchUsers(searchTerm, authToken);
            
            if (users && users.length > 0) {
                displayUsers(users);
            } else {
                usersList.innerHTML = '<div class="loading">No users found</div>';
            }
        } catch (error) {
            console.error('Error searching users:', error);
            usersList.innerHTML = '<div class="loading">Failed to search users</div>';
        }
    }, 300);
}

function clearUserSearch() {
    userSearchInput.value = '';
    clearSearchBtn.style.display = 'none';
    
    if (currentFilter === 'admins') {
        loadAdmins();
    } else {
        loadAllUsers();
    }
}

function displayUsers(users) {
    if (!users || users.length === 0) {
        usersList.innerHTML = '<div class="loading">No users found</div>';
        return;
    }

    usersList.innerHTML = '';
    
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.dataset.userId = user.id;
        
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        
        const userName = document.createElement('div');
        userName.className = 'user-name';
        userName.textContent = user.username;
        
        if (user.role === 0) {
            const adminBadge = document.createElement('span');
            adminBadge.className = 'admin-badge';
            adminBadge.textContent = '👑 ADMIN';
            userName.appendChild(adminBadge);
        }
        
        const userId = document.createElement('div');
        userId.className = 'user-id';
        userId.textContent = `ID: ${user.id}`;
        
        userInfo.appendChild(userName);
        userInfo.appendChild(userId);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-user-btn';
        deleteBtn.textContent = '🗑️ Delete';
        deleteBtn.onclick = () => handleDeleteUser(user.id, user.username);
        
        if (currentUserId && user.id === currentUserId) {
            deleteBtn.disabled = true;
            deleteBtn.textContent = '🔒 You';
        }
        
        userItem.appendChild(userInfo);
        userItem.appendChild(deleteBtn);
        usersList.appendChild(userItem);
    });
}

async function handleDeleteUser(userId, username) {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) {
        return;
    }
    
    try {
        await deleteUser(userId, authToken);
        logToConsole(`User "${username}" deleted successfully`, 'info');
        
        await loadAllUsers();
        
        if (currentUserId && userId === currentUserId) {
            handleLogout();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'USER_NOT_FOUND') {
            logToConsole(`User not found`, 'error');
            await loadAllUsers();
        } else {
            logToConsole(`Failed to delete user: ${error.message}`, 'error');
        }
    }
}

// Shop Panel Functions
function toggleShopPanel() {
    isShopPanelOpen = !isShopPanelOpen;
    
    if (isShopPanelOpen) {
        if (isPanelOpen) toggleUsersPanel();
        if (isChatPanelOpen) toggleChatPanel();
    }
    
    if (isShopPanelOpen) {
        shopPanel.classList.add('open');
        toggleShopBtn.classList.add('shop-panel-open');
        document.body.classList.add('shop-panel-open');
        loadShopData();
    } else {
        shopPanel.classList.remove('open');
        toggleShopBtn.classList.remove('shop-panel-open');
        document.body.classList.remove('shop-panel-open');
    }
}

function closeShopPanel() {
    if (isShopPanelOpen) {
        toggleShopPanel();
    }
}

function switchToShopTab() {
    currentShopTab = 'shop';
    shopTabBtn.classList.add('active');
    inventoryTabBtn.classList.remove('active');
    shopContent.style.display = 'block';
    inventoryContent.style.display = 'none';
}

function switchToInventoryTab() {
    currentShopTab = 'inventory';
    inventoryTabBtn.classList.add('active');
    shopTabBtn.classList.remove('active');
    inventoryContent.style.display = 'block';
    shopContent.style.display = 'none';
}

async function loadShopData() {
    if (!authToken) {
        shopContent.innerHTML = '<div class="loading">Please log in to view the shop</div>';
        inventoryContent.innerHTML = '<div class="loading">Please log in to view inventory</div>';
        return;
    }
    
    if (currentShopTab === 'shop') {
        await loadShopItems();
    } else {
        await loadUserInventory();
    }
}

async function handleSeedShop() {
    try {
        seedShopBtn.disabled = true;
        seedShopBtn.textContent = '🌱 Seeding...';
        
        await seedInventory();
        logToConsole('Shop seeded successfully', 'info');
        
        await loadShopItems();
    } catch (error) {
        console.error('Error seeding shop:', error);
        logToConsole(`Failed to seed shop: ${error.message}`, 'error');
    } finally {
        seedShopBtn.disabled = false;
        seedShopBtn.textContent = '🌱 Seed Shop';
    }
}

async function loadShopItems() {
    try {
        shopContent.innerHTML = '<div class="loading">Loading items...</div>';
        const items = await getItems();
        shopItems = items;
        displayShopItems(items);
    } catch (error) {
        console.error('Error loading shop items:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'NO_ITEMS') {
            shopContent.innerHTML = '<div class="loading">No items available. Click "Seed Shop" to add items.</div>';
        } else {
            shopContent.innerHTML = '<div class="loading">Failed to load items</div>';
        }
    }
}

function displayShopItems(items) {
    if (!items || items.length === 0) {
        shopContent.innerHTML = '<div class="loading">No items available</div>';
        return;
    }
    
    shopContent.innerHTML = '';
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        
        itemDiv.innerHTML = `
            <div class="shop-item-header">
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">💰 ${item.price.toLocaleString()}</div>
            </div>
            <div class="shop-item-details">
                <span>Click Value: +${item.clickValue}</span>
                <span>Max: ${item.maxQuantity}</span>
            </div>
            <button class="buy-item-btn" data-item-id="${item.id}">
                🛒 Buy
            </button>
        `;
        
        const buyBtn = itemDiv.querySelector('.buy-item-btn');
        buyBtn.addEventListener('click', () => handleBuyItem(item.id, item.price));
        
        shopContent.appendChild(itemDiv);
    });
}

async function handleBuyItem(itemId, price) {
    if (!authToken) {
        logToConsole('Cannot buy item: not logged in', 'error');
        return;
    }
    
    try {
        const inventory = await buyItem(itemId, authToken);
        logToConsole(`Item purchased successfully!`, 'info');
        
        await loadUserProgression(authToken);
        
        if (currentShopTab === 'inventory') {
            await loadUserInventory();
        }
    } catch (error) {
        console.error('Error buying item:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'NOT_ENOUGH_MONEY') {
            logToConsole(`Not enough money to buy this item`, 'error');
        } else if (errorCode === 'INVENTORY_FULL') {
            logToConsole(`Inventory is full for this item`, 'error');
        } else if (errorCode === 'ITEM_NOT_FOUND') {
            logToConsole(`Item not found`, 'error');
        } else {
            logToConsole(`Failed to buy item: ${error.message}`, 'error');
        }
    }
}

async function loadUserInventory() {
    if (!authToken) {
        inventoryContent.innerHTML = '<div class="loading">Please log in to view inventory</div>';
        return;
    }
    
    try {
        inventoryContent.innerHTML = '<div class="loading">Loading inventory...</div>';
        const inventory = await getUserInventory(authToken);
        displayUserInventory(inventory);
    } catch (error) {
        console.error('Error loading inventory:', error);
        inventoryContent.innerHTML = '<div class="loading">Failed to load inventory</div>';
    }
}

async function displayUserInventory(inventory) {
    if (!inventory || inventory.length === 0) {
        inventoryContent.innerHTML = '<div class="loading">Your inventory is empty</div>';
        return;
    }
    
    inventoryContent.innerHTML = '';
    
    if (shopItems.length === 0) {
        try {
            shopItems = await getItems();
        } catch (error) {
            console.error('Error loading items for inventory display:', error);
        }
    }
    
    inventory.forEach(entry => {
        const item = shopItems.find(i => i.id === entry.itemId);
        const itemName = item ? item.name : `Item #${entry.itemId}`;
        const clickValue = item ? item.clickValue : 0;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        
        itemDiv.innerHTML = `
            <div class="inventory-item-header">
                <div class="inventory-item-name">${itemName}</div>
                <div class="inventory-item-quantity">×${entry.quantity}</div>
            </div>
            <div class="inventory-item-details">
                Click Value: +${clickValue} each | Total: +${clickValue * entry.quantity}
            </div>
        `;
        
        inventoryContent.appendChild(itemDiv);
    });
}

// Best Score Functions
async function loadBestScore() {
    try {
        const bestScoreData = await getBestScore(authToken);
        
        if (bestScoreData && bestScoreData.userId !== undefined) {
            bestScoreValue.textContent = bestScoreData.bestScore.toLocaleString();
            
            try {
                const user = await getUserById(bestScoreData.userId, authToken);
                bestScorePlayer.textContent = user.username;
            } catch (userError) {
                console.error('Error fetching best score player:', userError);
                bestScorePlayer.textContent = `User #${bestScoreData.userId}`;
            }
        }
    } catch (error) {
        console.error('Error loading best score:', error);
        const errorCode = error.code || extractErrorCode(error);
        
        if (errorCode === 'NO_PROGRESSIONS') {
            bestScoreValue.textContent = '-';
            bestScorePlayer.textContent = 'No scores yet';
        } else {
            bestScoreValue.textContent = '-';
            bestScorePlayer.textContent = 'Error loading';
        }
    }
}

function initGame() {
    consoleContent = document.getElementById('consoleContent');
    clearConsoleBtn = document.getElementById('clearConsole');
    
    shopPanel = document.getElementById('shopPanel');
    toggleShopBtn = document.getElementById('toggleShopBtn');
    closeShopBtn = document.getElementById('closeShopBtn');
    shopTabBtn = document.getElementById('shopTabBtn');
    inventoryTabBtn = document.getElementById('inventoryTabBtn');
    seedShopBtn = document.getElementById('seedShopBtn');
    shopContent = document.getElementById('shopContent');
    inventoryContent = document.getElementById('inventoryContent');
    
    usersPanel = document.getElementById('usersPanel');
    togglePanelBtn = document.getElementById('togglePanelBtn');
    closePanelBtn = document.getElementById('closePanelBtn');
    refreshUsersBtn = document.getElementById('refreshUsersBtn');
    showAdminsBtn = document.getElementById('showAdminsBtn');
    usersList = document.getElementById('usersList');
    userSearchInput = document.getElementById('userSearchInput');
    clearSearchBtn = document.getElementById('clearSearchBtn');
    
    bestScoreDisplay = document.getElementById('bestScoreDisplay');
    bestScoreValue = document.getElementById('bestScoreValue');
    bestScorePlayer = document.getElementById('bestScorePlayer');
    
    loginContainer = document.getElementById('loginContainer');
    gameContainer = document.getElementById('gameContainer');
    usernameInput = document.getElementById('username');
    passwordInput = document.getElementById('password');
    submitButton = document.getElementById('submitButton');
    loginMessage = document.getElementById('loginMessage');
    loggedUsernameSpan = document.getElementById('loggedUsername');
    logoutButton = document.getElementById('logoutButton');
    formTitle = document.getElementById('formTitle');
    toggleText = document.getElementById('toggleText');
    toggleLink = document.getElementById('toggleLink');

    scoreElement = document.getElementById('score');
    clickCountElement = document.getElementById('clickCount');
    perClickElement = document.getElementById('perClick');
    totalClickValueElement = document.getElementById('totalClickValue');
    bestScoreElement = document.getElementById('bestScore');
    clickButton = document.getElementById('clickButton');
    resetButton = document.getElementById('resetButton');

    chatPanel = document.getElementById('chatPanel');
    toggleChatBtn = document.getElementById('toggleChatBtn');
    closeChatBtn = document.getElementById('closeChatBtn');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendChatBtn = document.getElementById('sendChatBtn');

    if (toggleChatBtn) {
        toggleChatBtn.addEventListener('click', toggleChatPanel);
    }
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', closeChatPanel);
    }
    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    clearConsoleBtn.addEventListener('click', clearConsole);
    toggleShopBtn.addEventListener('click', toggleShopPanel);
    closeShopBtn.addEventListener('click', closeShopPanel);
    shopTabBtn.addEventListener('click', () => {
        switchToShopTab();
        loadShopItems();
    });
    inventoryTabBtn.addEventListener('click', () => {
        switchToInventoryTab();
        loadUserInventory();
    });
    seedShopBtn.addEventListener('click', handleSeedShop);
    togglePanelBtn.addEventListener('click', toggleUsersPanel);
    closePanelBtn.addEventListener('click', closeUsersPanel);
    refreshUsersBtn.addEventListener('click', loadAllUsers);
    showAdminsBtn.addEventListener('click', loadAdmins);
    userSearchInput.addEventListener('input', handleUserSearch);
    clearSearchBtn.addEventListener('click', clearUserSearch);
    submitButton.addEventListener('click', handleSubmit);
    logoutButton.addEventListener('click', handleLogout);
    clickButton.addEventListener('click', handleClick);
    resetButton.addEventListener('click', handleReset);
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMode();
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });

    updateDisplay();
    
    toggleShopBtn.style.display = 'none';
    togglePanelBtn.style.display = 'none';
    toggleChatBtn.style.display = 'none';
    bestScoreDisplay.style.display = 'none';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
