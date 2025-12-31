
const { createApp, ref, onMounted, reactive, computed, defineComponent, watch } = Vue;

// --- 子组件：产品数据卡片 ---
const productCard = defineComponent({
    methods: {
        formatNumber: (value, roundint = 3) => {
            if (value === 0 || value === null || value === undefined) return '-';
            return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: roundint });
        },
        wanchen: (v1, v2, irount = 1) => {
            if (!v2 || v2 == 0) return '0.0';
            return ((v1 / v2) * 100).toFixed(irount);
        }
    },
    props: ["product_name", "pnumber_d", "pnumber_m", "pnumber_m_jh", "pnumber_y", "pnumber_y_jh", "inumber", "intround", "pronames", "isload"],
    template: `   
                <div style="margin-bottom: 30px;">
                    <el-card shadow="never">
                        <div style="color: #00f7ff; font-weight: bold; margin-bottom: 15px; border-left: 4px solid #00f7ff; padding-left: 10px; font-size: 16px;">
                            {{product_name}}
                        </div>
                        <el-row :gutter="10">
                            <el-col :span="6" v-for="(label, index) in pronames" :key="index" style="text-align: center;">
                                <div v-if="isload" style="font-size: 12px; color: #4e5969;">...</div>
                                <div v-else style="font-size: 18px; color: #fff; text-shadow: 0 0 8px rgba(0,247,255,0.3);">
                                    {{ index === 0 ? formatNumber(pnumber_d, intround) : 
                                       index === 1 ? formatNumber(pnumber_m, intround) :
                                       index === 2 ? formatNumber(pnumber_y, intround) : formatNumber(inumber, intround) }}
                                </div>
                                <div style="font-size: 11px; color: #8892b0; margin-top: 5px;">{{label}}</div>
                                <div v-if="(index === 1 || index === 2) && !isload" style="font-size: 10px; margin-top: 8px;">
                                    <span style="color: #8892b0;">达成: </span>
                                    <span style="color: #00f7ff; font-weight: bold;">{{ index === 1 ? wanchen(pnumber_m, pnumber_m_jh) : wanchen(pnumber_y, pnumber_y_jh) }}%</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>`
});

// --- 子组件：成本数据行 ---
const chenbenData = defineComponent({
    methods: {
        formatNumber: (value, roundint = 2) => {
            if (value === 0 || value === null || value === undefined) return '-';
            return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: roundint });
        }
    },
    props: ["titlename_1", "cbdata_1", "titlename_2", "cbdata_2", "intround", "baifen"],
    template: ` 
              <div style="margin-bottom: 35px; text-align: center;">
                    <el-row>
                        <el-col :span="12">
                            <div style="color: #fff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(255,255,255,0.2);">{{ formatNumber(cbdata_1, intround) }}</div>
                            <div style="font-size: 12px; color: #8892b0; margin-top: 4px;">{{ titlename_1 }}</div>
                        </el-col>
                        <el-col :span="12">
                            <div v-if="!baifen" style="color: #00f7ff; font-size: 20px; font-weight: bold;">{{ formatNumber(cbdata_2, intround) }}</div>
                            <div v-else :style="{color: cbdata_2 >= 0 ? '#ff4d4f' : '#3fef7d'}" style="font-size: 18px; font-weight: bold;">
                                {{ cbdata_2 >= 0 ? '↑' : '↓' }}{{ formatNumber(Math.abs(cbdata_2 * 100), 2) }}%
                            </div>
                            <div style="font-size: 12px; color: #8892b0; margin-top: 4px;">{{ titlename_2 }}</div>
                        </el-col>
                    </el-row>
              </div>`
});

// --- 主应用 ---
createApp({
    components: { "product-card": productCard, "chenben-data": chenbenData },
    setup() {
        const selectdate = ref("");
        const barChart = ref(null);
        const acidChart = ref(null);
        const pvChart = ref(null);
        const loading = ref(true);
        let myBarChart, myAcidChart, myPvChart;

        const sourceData = reactive({ "计划指标": [], "电解铜产量": [], "硫酸一产量": [], "硫酸二产量": [], "电解铜进销存": [], "硫酸总库存": [], "光伏发电": [] });
        const planData = reactive({ "电解铜产量": [], "硫酸产量": [], "光伏发电": [] });

        const base_urls = "https://weifeng.ckfgs.cn/";

        const fetchData2 = async (key, api) => {
            try {
                const response = await axios.get(base_urls + api);
                sourceData[key] = response.data;
            } catch (error) { console.error(error); }
        };

        const fteDataTable = computed(() => {
            const result = {};
            Object.keys(sourceData).forEach(key => {
                const list = Array.isArray(sourceData[key]) ? sourceData[key] : [];
                result[key] = list.find(item => item.格式日期 === selectdate.value) || {};
            });
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

        const skipToWeb = () => window.open("https://www.yunzhijia.com/maco-platform/view/report.do?reportId=3f94a8abfae443818f85f8aa3f9b16ea", '_blank');

        // 通用 ECharts 深色配置
        const getCommonOption = (title, color1, color2) => ({
            backgroundColor: 'transparent',
            title: { text: title, left: 'center', textStyle: { color: '#00f7ff', fontSize: 14 } },
            tooltip: { trigger: 'axis', backgroundColor: 'rgba(10, 25, 47, 0.9)', borderColor: '#00f7ff', textStyle: { color: '#fff' } },
            grid: { top: '20%', left: '10%', right: '5%', bottom: '15%' },
            xAxis: {
                type: 'category',
                axisLine: { lineStyle: { color: 'rgba(0, 247, 255, 0.3)' } },
                axisLabel: { color: '#8892b0' }
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
                axisLabel: { color: '#8892b0' }
            }
        });

        const updateCharts = () => {
            if (!myBarChart || !selectdate.value) return;
            const currentMonth = selectdate.value.substring(0, 7);

            const filterMonth = (data) => (data || [])
                .filter(item => item.格式日期 && item.格式日期.startsWith(currentMonth))
                .sort((a, b) => new Date(a.格式日期) - new Date(b.格式日期));

            // 1. 电解铜
            const copperMonthly = filterMonth(sourceData["电解铜产量"]);
            myBarChart.setOption({
                xAxis: { data: copperMonthly.map(i => i.格式日期.substring(8, 10) + '日') },
                series: [{
                    type: 'bar',
                    data: copperMonthly.map(i => i.当日产量 || 0),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#00f7ff' }, { offset: 1, color: '#007aff' }
                        ])
                    }
                }]
            });

            // 2. 硫酸
            const ls1Monthly = filterMonth(sourceData["硫酸一产量"]);
            const ls2Monthly = filterMonth(sourceData["硫酸二产量"]);
            myAcidChart.setOption({
                xAxis: { data: ls1Monthly.map(i => i.格式日期.substring(8, 10) + '日') },
                series: [{
                    type: 'bar',
                    data: ls1Monthly.map((item, idx) => (item.当日产量 || 0) + (ls2Monthly[idx]?.当日产量 || 0)),
                    itemStyle: { color: '#3fef7d' }
                }]
            });

            // 3. 光伏
            const pvMonthly = filterMonth(sourceData["光伏发电"]);
            myPvChart.setOption({
                xAxis: { data: pvMonthly.map(i => i.格式日期.substring(8, 10) + '日') },
                series: [{
                    type: 'line', smooth: true,
                    data: pvMonthly.map(i => i.光伏供电合计 || 0),
                    lineStyle: { color: '#ffcc00', width: 3 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(255, 204, 0, 0.3)' }, { offset: 1, color: 'transparent' }
                        ])
                    }
                }]
            });
        };

        watch(() => selectdate.value, () => updateCharts());

        // 科技粒子动画
        const initAnimation = () => {
            const canvas = document.getElementById('animation-canvas');
            const ctx = canvas.getContext('2d');
            let w, h, particles = [];
            const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
            window.addEventListener('resize', resize); resize();

            class Particle {
                constructor() { this.reset(); }
                reset() {
                    this.x = Math.random() * w; this.y = Math.random() * h;
                    this.size = Math.random() * 2; this.vx = (Math.random() - 0.5) * 1;
                    this.vy = (Math.random() - 0.5) * 0.5; this.a = Math.random();
                }
                update() {
                    this.x += this.vx; this.y += this.vy;
                    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
                }
                draw() {
                    ctx.fillStyle = `rgba(0, 247, 255, ${this.a})`;
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
                }
            }
            for (let i = 0; i < 100; i++) particles.push(new Particle());
            const loop = () => {
                ctx.clearRect(0, 0, w, h);
                particles.forEach(p => { p.update(); p.draw(); });
                requestAnimationFrame(loop);
            };
            loop();
        };

        onMounted(async () => {
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            selectdate.value = yesterday.toISOString().split('T')[0];
            initAnimation();

            await Promise.all([
                fetchData2("计划指标", "factdata/pct/jihau_zhibiao"),
                fetchData2("电解铜产量", "factdata/pct/tong"),
                fetchData2("硫酸一产量", "factdata/pct/ls1"),
                fetchData2("硫酸二产量", "factdata/pct/ls2"),
                fetchData2("电解铜进销存", "factdata/pct/dianjie_jinxiao"),
                fetchData2("硫酸总库存", "factdata/scbb/jinxiao_lsall"),
                fetchData2("光伏发电", "factdata/scbb/guangfudianli"),
            ]);
            loading.value = false;

            myBarChart = echarts.init(barChart.value);
            myBarChart.setOption(getCommonOption('电解铜产量趋势 (月度/吨)'));
            myAcidChart = echarts.init(acidChart.value);
            myAcidChart.setOption(getCommonOption('硫酸总产量趋势 (月度/吨)'));
            myPvChart = echarts.init(pvChart.value);
            myPvChart.setOption(getCommonOption('光伏发电趋势 (月度/kWh)'));

            updateCharts();
            window.addEventListener('resize', () => { myBarChart?.resize(); myAcidChart?.resize(); myPvChart?.resize(); });
        });

        return { barChart, acidChart, pvChart, selectdate, fteDataTable, planData, loading, skipToWeb };
    }
}).use(ElementPlus).mount('#app');
