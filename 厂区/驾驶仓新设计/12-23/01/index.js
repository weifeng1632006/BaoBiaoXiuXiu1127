const { createApp, ref, onMounted, reactive, computed, defineComponent, watch } = Vue;

// --- 组件定义保持不变 ---
const productCard = defineComponent({
    methods: {
        formatNumber: (value, roundint = 3) => {
            if (value === 0 || value === null || value === undefined) return '-';
            return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: roundint });
        },
        wanchen: (v1, v2, irount = 0) => {
            if (!v2 || v2 == 0) return '0.00';
            return ((v1 / v2) * 100).toFixed(irount);
        }
    },
    props: ["product_name", "pnumber_d", "pnumber_m", "pnumber_m_jh", "pnumber_y", "pnumber_y_jh", "inumber", "intround", "pronames","isload"],
    template: `   
        <div class="div-card-col-1" >
            <el-card>
                <div class="card-product-name" style="color: #409EFF; font-weight: bold; margin-bottom: 20px;">{{product_name}}</div>
                <el-row :gutter="10">
                    <el-col :span="6" v-for="(label, index) in pronames" :key="index" style="text-align: center;">

                        <div style="font-size: 12px; color: #333; margin-bottom: 5px;" v-if="isload">
                         {{    index === 0 ? "数据加载中...": 
                               index === 1 ? "数据加载中..." :
                               index === 2 ? "数据加载中..." : "数据加载中..."  }}
                        </div>
                        <div style="font-size: 16px; color: #333; margin-bottom: 5px;" v-else>
                            {{ index === 0 ? formatNumber(pnumber_d, intround) : 
                               index === 1 ? formatNumber(pnumber_m, intround) :
                               index === 2 ? formatNumber(pnumber_y, intround) : formatNumber(inumber, intround) }}
                        </div>


                        <div style="font-size: 12px; color: #999;">{{label}}</div>
                        <div v-if="index === 1 || index === 2" style="font-size: 11px; margin-top: 5px;">
                            任务完成率: <span style="color: #ee4b10;font-size: 17px;">{{ index === 1 ? wanchen(pnumber_m, pnumber_m_jh) : wanchen(pnumber_y, pnumber_y_jh) }}%</span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>`
});

const chenbenData = defineComponent({
    methods: {
        formatNumber: (value, roundint = 2) => {
            if (value === 0 || value === null || value === undefined) return '-';
            return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: roundint });
        }
    },
    props: ["titlename_1", "cbdata_1", "titlename_2", "cbdata_2", "intround", "baifen"],
    template: ` 
      <div style="margin-bottom: 25px; text-align: center;">
            <el-row>
                <el-col :span="12">
                    <div style="color: #3b60f2; font-size: 18px; font-weight: bold;">{{ formatNumber(cbdata_1, intround) }}</div>
                    <div style="font-size: 12px; color: #666;">{{ titlename_1 }}</div>
                </el-col>
                <el-col :span="12">
                    <div v-if="!baifen" style="color: #28d3e6; font-size: 18px; font-weight: bold;">{{ formatNumber(cbdata_2, intround) }}</div>
                    <div v-else :class="cbdata_2 >= 0 ? 'chdata2_gt' : 'chdata2_lt'" style="font-size: 18px;">
                        {{ cbdata_2 >= 0 ? '+' : '' }}{{ formatNumber(cbdata_2 * 100, 2) }}%
                    </div>
                    <div style="font-size: 12px; color: #666;">{{ titlename_2 }}</div>
                </el-col>
            </el-row>
      </div>`
});

// --- 主应用逻辑 ---
createApp({
    components: { "product-card": productCard, "chenben-data": chenbenData },
    setup() {
        const selectdate = ref("");
        const barChart = ref(null);
        const pieChart = ref(null);

        const loading = ref(true);
        let myBarChart, myPieChart;

        const sourceData = reactive({ "计划指标": [], "电解铜产量": [], "硫酸一产量": [], "硫酸二产量": [], "电解铜进销存": [], "硫酸总库存": [], "光伏发电": [] });
        const planData = reactive({ "电解铜产量": [], "硫酸产量": [], "光伏发电": [] });

        const base_urls = "https://weifeng.ckfgs.cn/";

        const fetchData2 = async (key, api) => {
            try {
                loading.value = true;
                const response = await axios.get(base_urls + api);
                sourceData[key] = response.data;
                loading.value = false;

            } catch (error) { console.error(error); }
        };

        const fteDataTable = computed(() => {
            loading.value = true;
            const result = {};
            Object.keys(sourceData).forEach(key => {
                const list = Array.isArray(sourceData[key]) ? sourceData[key] : [];
                result[key] = list.find(item => item.格式日期 === selectdate.value) || {};
            });
            loading.value = false;
            return result;
        });

        const planDataTable = (prdname) => {
            return computed(() => {
                const list = sourceData["计划指标"] || [];
                return list.find(item => item.格式日期 === selectdate.value && item.明细_指标名称 === prdname) || {};
            });
        };

        planData["电解铜产量"] = planDataTable("电解铜铜产量");
        planData["硫酸产量"] = planDataTable("硫酸产量");
        planData["光伏发电"] = planDataTable("光伏发电");

        const updateCharts = () => {
            if (!myBarChart) return;
            const copper = fteDataTable.value["电解铜产量"]?.当日产量 || 0;
            const acid = (fteDataTable.value["硫酸一产量"]?.当日产量 || 0) + (fteDataTable.value["硫酸二产量"]?.当日产量 || 0);
            myBarChart.setOption({ series: [{ data: [copper, acid] }] });
        };

        watch([fteDataTable], () => updateCharts(), { deep: true });

        // --- 动画引擎逻辑 ---
        const initAnimation = () => {
            const canvas = document.getElementById('animation-canvas');
            const ctx = canvas.getContext('2d');
            let w, h, snowflakes = [], particles = [];

            const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
            window.addEventListener('resize', resize);
            resize();

            class Snowflake {
                constructor() { this.reset(); }
                reset() {
                    this.x = Math.random() * w; this.y = Math.random() * h;
                    this.size = Math.random() * 2 + 1; this.vy = Math.random() * 1 + 0.5;
                    this.vx = Math.random() * 0.5 - 0.25; this.o = Math.random() * 0.5 + 0.2;
                }
                update() {
                    this.y += this.vy; this.x += this.vx;
                    if (this.y > h) { this.y = -10; this.x = Math.random() * w; }
                }
                draw() {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.o})`;
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
                }
            }

            class Particle {
                constructor(x, y) {
                    this.x = x; this.y = y;
                    this.size = Math.random() * 3 + 1;
                    this.vx = (Math.random() - 0.5) * 4; this.vy = (Math.random() - 0.5) * 4;
                    this.color = `hsla(${Math.random() * 360}, 70%, 70%, 0.8)`;
                    this.life = 1;
                }
                update() { this.x += this.vx; this.y += this.vy; this.life -= 0.04; }
                draw() {
                    ctx.globalAlpha = this.life; ctx.fillStyle = this.color;
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
                }
            }

            for (let i = 0; i < 80; i++) snowflakes.push(new Snowflake());

            window.addEventListener('mousemove', (e) => {
                for (let i = 0; i < 2; i++) particles.push(new Particle(e.clientX, e.clientY));
            });

            const loop = () => {
                ctx.clearRect(0, 0, w, h);
                snowflakes.forEach(s => { s.update(); s.draw(); });
                particles = particles.filter(p => p.life > 0);
                particles.forEach(p => { p.update(); p.draw(); });
                requestAnimationFrame(loop);
            };
            loop();
        };

        onMounted(async () => {
            const today = new Date();
            today.setDate(today.getDate() - 1);
            selectdate.value = today.toISOString().split('T')[0];

            initAnimation(); // 启动动画

            await Promise.all([
                fetchData2("计划指标", "factdata/pct/jihau_zhibiao"),
                fetchData2("电解铜产量", "factdata/pct/tong"),
                fetchData2("硫酸一产量", "factdata/pct/ls1"),
                fetchData2("硫酸二产量", "factdata/pct/ls2"),
                fetchData2("电解铜进销存", "factdata/pct/dianjie_jinxiao"),
                fetchData2("硫酸总库存", "factdata/scbb/jinxiao_lsall"),
                fetchData2("光伏发电", "factdata/scbb/guangfudianli"),

                
            ]);

            myBarChart = echarts.init(barChart.value);
            myBarChart.setOption({
                title: { text: '当日产量对比', left: 'center' },
                xAxis: { type: 'category', data: ['电解铜', '硫酸'] },
                yAxis: { type: 'value' },
                series: [{ type: 'bar', data: [0, 0], itemStyle: { color: '#409EFF' }, barWidth: '40%' }]
            });

            myPieChart = echarts.init(pieChart.value);
            myPieChart.setOption({
                title: { text: '库存概览', left: 'center' },
                tooltip: { trigger: 'item' },
                series: [{ type: 'pie', radius: '50%', data: [{ value: 0, name: '电解铜' }, { value: 0, name: '硫酸' }] }]
            });

            updateCharts();
        });

        return { barChart, pieChart, selectdate, fteDataTable, planData,loading };
    }
}).use(ElementPlus).mount('#app');