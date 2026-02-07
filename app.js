// ===== Quantum Field Particle System =====
class QuantumField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 150;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.mouse));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = [
            'rgba(0, 217, 255, 0.8)',
            'rgba(255, 0, 110, 0.8)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(0, 255, 163, 0.8)',
            'rgba(102, 126, 234, 0.8)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Mouse interaction
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
        }
        
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// ===== Manifestation Manager =====
class ManifestationManager {
    constructor() {
        this.manifestations = this.loadManifestations();
        this.updateConnectionStrength();
        setInterval(() => this.updateConnectionStrength(), 5000);
        setInterval(() => this.updateManifestationProgress(), 10000);
    }
    
    loadManifestations() {
        const stored = localStorage.getItem('manifestations');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveManifestations() {
        localStorage.setItem('manifestations', JSON.stringify(this.manifestations));
    }
    
    addManifestation(data) {
        const manifestation = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            category: data.category,
            intensity: data.intensity,
            progress: 0,
            energyLevel: Math.floor(Math.random() * 3) + 3, // 3-5 dots
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        
        this.manifestations.unshift(manifestation);
        this.saveManifestations();
        return manifestation;
    }
    
    updateManifestationProgress() {
        let updated = false;
        this.manifestations.forEach(m => {
            if (m.status === 'active' && m.progress < 100) {
                // Random progress increase based on intensity
                const increase = Math.random() * (m.intensity / 10) * 2;
                m.progress = Math.min(100, m.progress + increase);
                
                // Random energy level fluctuation
                m.energyLevel = Math.max(1, Math.min(5, m.energyLevel + (Math.random() > 0.5 ? 1 : -1)));
                
                if (m.progress >= 100) {
                    m.status = 'fulfilled';
                    this.showNotification('✨ Manifestation Complete!', `"${m.title}" has been fulfilled!`);
                }
                updated = true;
            }
        });
        
        if (updated) {
            this.saveManifestations();
            this.renderManifestations();
        }
    }
    
    removeManifestation(id) {
        this.manifestations = this.manifestations.filter(m => m.id !== id);
        this.saveManifestations();
        this.renderManifestations();
    }
    
    archiveManifestation(id) {
        const manifestation = this.manifestations.find(m => m.id === id);
        if (manifestation) {
            manifestation.status = 'archived';
            this.saveManifestations();
            this.renderManifestations();
        }
    }
    
    updateConnectionStrength() {
        const strengths = ['Strong', 'Very Strong', 'Optimal', 'Peak'];
        const strength = strengths[Math.floor(Math.random() * strengths.length)];
        document.getElementById('connectionStrength').textContent = strength;
    }
    
    showNotification(title, message) {
        // Simple notification - could be enhanced with a toast system
        console.log(`${title}: ${message}`);
    }
    
    renderManifestations() {
        const activeList = document.getElementById('activeManifestationsList');
        const emptyState = document.getElementById('emptyState');
        const historyList = document.getElementById('historyList');
        const historyEmptyState = document.getElementById('historyEmptyState');
        
        // Filter active and archived/fulfilled
        const active = this.manifestations.filter(m => m.status === 'active');
        const history = this.manifestations.filter(m => m.status !== 'active');
        
        // Render active manifestations
        if (active.length === 0) {
            activeList.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            activeList.classList.remove('hidden');
            emptyState.classList.add('hidden');
            activeList.innerHTML = active.map(m => this.createManifestationCard(m)).join('');
        }
        
        // Render history
        if (history.length === 0) {
            historyList.classList.add('hidden');
            historyEmptyState.classList.remove('hidden');
        } else {
            historyList.classList.remove('hidden');
            historyEmptyState.classList.add('hidden');
            historyList.innerHTML = history.map(m => this.createHistoryItem(m)).join('');
        }
    }
    
    createManifestationCard(m) {
        const categoryIcons = {
            wealth: '💰',
            health: '🌿',
            love: '💖',
            career: '🚀',
            personal: '🌟',
            spiritual: '🧘',
            other: '✨'
        };
        
        const energyDots = Array(m.energyLevel).fill('').map(() => '<span class="energy-dot"></span>').join('');
        
        return `
            <div class="manifestation-card">
                <div class="manifestation-header">
                    <span class="manifestation-category">${categoryIcons[m.category]}</span>
                    <div class="manifestation-actions">
                        <button class="btn-icon" onclick="manifestationManager.archiveManifestation(${m.id})" title="Archive">
                            📦
                        </button>
                        <button class="btn-icon" onclick="manifestationManager.removeManifestation(${m.id})" title="Remove">
                            🗑️
                        </button>
                    </div>
                </div>
                <h3 class="manifestation-title">${this.escapeHtml(m.title)}</h3>
                ${m.description ? `<p class="manifestation-description">${this.escapeHtml(m.description)}</p>` : ''}
                <div class="manifestation-meta">
                    <span>Intensity: ${m.intensity}/10</span>
                    <span>${this.formatDate(m.createdAt)}</span>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Quantum Alignment</span>
                        <span>${Math.round(m.progress)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${m.progress}%"></div>
                    </div>
                </div>
                <div class="energy-level">
                    <span>Energy Level:</span>
                    <div class="energy-dots">${energyDots}</div>
                </div>
            </div>
        `;
    }
    
    createHistoryItem(m) {
        const categoryIcons = {
            wealth: '💰',
            health: '🌿',
            love: '💖',
            career: '🚀',
            personal: '🌟',
            spiritual: '🧘',
            other: '✨'
        };
        
        return `
            <div class="history-item">
                <div class="history-content">
                    <span class="history-icon">${categoryIcons[m.category]}</span>
                    <div class="history-text">
                        <div class="history-title">${this.escapeHtml(m.title)}</div>
                        <div class="history-date">${this.formatDate(m.createdAt)}</div>
                    </div>
                </div>
                <span class="history-status status-${m.status}">${m.status === 'fulfilled' ? '✓ Fulfilled' : 'Archived'}</span>
            </div>
        `;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }
}

// ===== Initialize Application =====
let quantumField;
let manifestationManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize quantum field
    const canvas = document.getElementById('quantumField');
    quantumField = new QuantumField(canvas);
    
    // Initialize manifestation manager
    manifestationManager = new ManifestationManager();
    manifestationManager.renderManifestations();
    
    // Form handling
    const form = document.getElementById('manifestationForm');
    const intensitySlider = document.getElementById('wishIntensity');
    const intensityValue = document.getElementById('intensityValue');
    const modal = document.getElementById('encodingModal');
    
    // Update intensity display
    intensitySlider.addEventListener('input', (e) => {
        intensityValue.textContent = e.target.value;
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('wishTitle').value,
            description: document.getElementById('wishDescription').value,
            category: document.getElementById('wishCategory').value,
            intensity: parseInt(document.getElementById('wishIntensity').value)
        };
        
        // Show encoding animation
        modal.classList.add('active');
        
        // Simulate quantum encoding
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Add manifestation
        manifestationManager.addManifestation(formData);
        manifestationManager.renderManifestations();
        
        // Hide modal
        modal.classList.remove('active');
        
        // Reset form
        form.reset();
        intensityValue.textContent = '5';
        
        // Scroll to manifestations
        document.querySelector('.active-manifestations').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});
