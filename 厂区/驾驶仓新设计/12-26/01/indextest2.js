const initAnimation = () => {
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, snowflakes = [], particles = [];

    const resize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
    };
    window.addEventListener('resize', resize);
    resize();

    class Snowflake {
        constructor() { this.reset(); this.y = Math.random() * h; }
        reset() {
            this.x = Math.random() * w; 
            this.y = -10; 
            this.size = Math.random() * 3 + 1; 
            this.vy = Math.random() * 1.5 + 0.8; 
            this.vx = Math.random() * 1 - 0.5; 
            this.o = Math.random() * 0.5 + 0.3; 
            this.swingSpeed = Math.random() * 0.02 + 0.01;
        }
        update() {
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.y * this.swingSpeed) * 0.5;
            if (this.y > h) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.o})`;
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
            ctx.fill();
        }
    }

    // --- 强化后的鼠标特效粒子 ---
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // 随机大小
            this.size = Math.random() * 4 + 2;
            // 随机方向速度
            this.vx = (Math.random() - 0.5) * 6;
            this.vy = (Math.random() - 0.5) * 6;
            // 颜色：改为明亮的蓝色/青色，以便在白色雪花中被识别
            const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#00FFFF'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1.0; // 初始生命值
            this.decay = Math.random() * 0.02 + 0.02; // 消失速度
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 初始化雪花
    for (let i = 0; i < 150; i++) snowflakes.push(new Snowflake());

    // 鼠标移动监听：增加生成密度
    window.addEventListener('mousemove', (e) => {
        // 每次移动生成 5 个带颜色的粒子
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });

    const loop = () => {
        ctx.clearRect(0, 0, w, h);
        
        // 1. 绘制雪花（背景）
        snowflakes.forEach(s => { s.update(); s.draw(); });
        
        // 2. 绘制鼠标特效粒子（前景）
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        
        requestAnimationFrame(loop);
    };
    loop();
};