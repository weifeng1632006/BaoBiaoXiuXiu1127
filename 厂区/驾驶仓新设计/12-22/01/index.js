const { createApp, ref, onMounted, reactive, computed, defineComponent, watch } = Vue;

// 产品统计卡片组件
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
    props: ["product_name", "pnumber_d", "pnumber_m", "pnumber_m_jh", "pnumber_y", "pnumber_y_jh", "inumber", "intround", "pronames"],

    setup(props) {

    },

    template: `   
        <div class="grid-content ep-bg-purple div-card-col-1">
            <el-card class="card-data-col-1">
                <span class="mx-1 card-product-name">{{product_name}}:</span>
                <el-row>
                    <el-col :span="6">
                        <p class="product-data-1 "><span class="spanclass1">{{formatNumber(pnumber_d,intround)}}</span></p>
                        <p class="product-data-2"><span>{{pronames[0]}}</span></p>
                    </el-col>
                    <el-col :span="6">
                        <p class="product-data-1 "><span class="spanclass2">{{formatNumber(pnumber_m,intround)}}</span></p>
                        <p class="product-data-2"><span>{{pronames[1]}}</span></p>
                        <p class="product-data-3"><span>任务完成率:<span>{{wanchen(pnumber_m, pnumber_m_jh)}}%</span></span></p>
                    </el-col>
                    <el-col :span="6">
                        <p class="product-data-1 "><span class="spanclass3">{{formatNumber(pnumber_y,intround)}}</span></p>
                        <p class="product-data-2"><span>{{pronames[2]}}</span></p>
                        <p class="product-data-3"><span>任务完成率:<span>{{wanchen(pnumber_y, pnumber_y_jh)}}%</span></span></p>
                    </el-col>
                    <el-col :span="6">
                        <p class="product-data-1 "><span class="spanclass4">{{formatNumber(inumber,intround)}}</span></p>
                        <p class="product-data-2"><span >{{pronames[3]}}</span></p>
                    </el-col>
                </el-row>
            </el-card>
        </div>`
});

// 成本数据组件
const chenbenData = defineComponent({
    methods: {
        formatNumber: (value, roundint = 2) => {
            if (value === 0 || value === null || value === undefined) return '-';
            return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: roundint });
        }
    },
    props: ["classname", "titlename_1", "cbdata_1", "titlename_2", "cbdata_2", "intround", "baifen"],
    template: ` 

      <div class="data-chenben">
            <el-row :class="classname">
                <el-col :span="12">
                    <p class="p-chenben-2">
                        <span class="chdata1">{{ formatNumber(cbdata_1, intround) }}</span>
                    </p>
                    <p class="p-chenben-1"><span>{{ titlename_1 }}</span></p>
                </el-col>

                <el-col :span="12">
                    <p class="p-chenben-2" v-if="!baifen">
                        <span class="chdata2">{{ formatNumber(cbdata_2, intround) }}</span>
                    </p>

                    <p class="p-chenben-2" v-else>
                        <span class="chdata2_gt" v-if="cbdata_2 >= 0">
                            +{{ formatNumber(Math.abs(cbdata_2 * 100), 2) }}%
                        </span>
                        <span class="chdata2_lt" v-else>
                            -{{ formatNumber(Math.abs(cbdata_2 * 100), 2) }}%
                        </span>
                    </p>

                    <p class="p-chenben-1">
                        <span>{{ titlename_2 }}</span>
                    </p>
                </el-col>
            </el-row>

           
    </div>
    
    `
       
});

createApp({
    components: {
        "product-card": productCard,
        "chenben-data": chenbenData
    },
    setup() {
        const selectdate = ref("");
        const barChart = ref(null);
        const pieChart = ref(null);
        let myBarChart, myPieChart;

        // 基础数据
        const sourceData = reactive({
            "计划指标": [],
            "电解铜产量": [],
            "硫酸一产量": [],
            "硫酸二产量": [],
            "电解铜进销存": [],
            "硫酸总库存": [],
            "光伏发电": []
        });
        //计划指标
        const planData = reactive({
            "电解铜产量": [],
            "硫酸产量": [],
            "光伏发电": [],

        })



        // const base_urls = "http://127.0.0.1:8002/";
        const base_urls = "https://weifeng.ckfgs.cn/";
     

        // 通用抓取函数
        const fetchData2 = async (key, api) => {
            try {
                const response = await axios.get(base_urls + api);
                sourceData[key] = response.data;
            } catch (error) {
                console.error(`Fetch error for ${key}:`, error);
            }
        };

        // 筛选逻辑：根据 selectdate 自动计算当前显示的行
        const fteDataTable = computed(() => {
            const result = {};

            // console.log("sourceData",sourceData);
            // console.log("selectdate",selectdate.value);

            Object.keys(sourceData).forEach(key => {
                const list = Array.isArray(sourceData[key]) ? sourceData[key] : [];
                // 假设后端返回的字段名是 '格式日期'               
                result[key] = list.find(item => item.格式日期 === selectdate.value) || {};

            });
            // console.log("result",result);

            return result;
        });

        //筛选计划指标
        const planDataTable = (prdname) => {
            return computed(() => {
                // 使用 .value 如果 sourceData 是 ref 定义的
                const rawList = sourceData["计划指标"];
                const list = Array.isArray(rawList) ? rawList : [];

                // 调试：打印当前状态
                //    console.log(`查询产品: ${prdname}, 当前日期: ${selectdate.value}, 列表长度: ${list.length}`);

                if (list.length === 0) return {};

                const dailyPlans = list.filter(item => item.格式日期 === selectdate.value);
                const targetPlan = dailyPlans.find(item => item.明细_指标名称 === prdname);

                // console.log("targetPlan",targetPlan);

                // console.log("找到的指标数据:", targetPlan);
                return targetPlan || {};
            });
        };

        planData["电解铜产量"] = planDataTable("电解铜铜产量");

        planData["硫酸产量"] = planDataTable("硫酸产量");

        planData["光伏发电"] = planDataTable("光伏发电");
        // planData["电解铜月度"] = planDataTable("电解铜铜产量");


        // 初始化日期
        const setDefaultDates = () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            selectdate.value = yesterday.toISOString().split('T')[0]; // 默认昨天
        };

        // 更新图表函数
        const updateCharts = () => {
            if (!myBarChart) return;

            const copper = fteDataTable.value["电解铜产量"];
            const acid1 = fteDataTable.value["硫酸一产量"];
            const acid2 = fteDataTable.value["硫酸二产量"];

            myBarChart.setOption({
                series: [{
                    data: [
                        copper.日产量 || 0,
                        acid1.日产量 || 0,
                        acid2.日产量 || 0
                    ]
                }]
            });
        };

        // 监听数据或日期变化，刷新图表
        watch([fteDataTable], () => {
            updateCharts();
        }, { deep: true });

        onMounted(async () => {
            setDefaultDates();

            // 异步加载数据
            await Promise.all([
                fetchData2("计划指标", "factdata/pct/jihau_zhibiao"),
                fetchData2("电解铜产量", "factdata/pct/tong"),
                fetchData2("硫酸一产量", "factdata/pct/ls1"),
                fetchData2("硫酸二产量", "factdata/pct/ls2"),
                fetchData2("电解铜进销存", "factdata/pct/dianjie_jinxiao"),
                fetchData2("硫酸总库存", "factdata/scbb/jinxiao_lsall"),
                fetchData2("光伏发电", "factdata/scbb/guangfudianli"),
            ]);

            // 初始化 ECharts
            myBarChart = echarts.init(barChart.value);
            myBarChart.setOption({
                title: { text: '当日产量对比' },
                xAxis: { type: 'category', data: ['电解铜产量', '硫酸一产量', '硫酸二产量'] },
                yAxis: { type: 'value' },
                series: [{ type: 'bar', data: [0, 0, 0], itemStyle: { color: '#409EFF' } }]
            });

            myPieChart = echarts.init(pieChart.value);
            myPieChart.setOption({
                title: { text: '库存分布', left: 'center' },
                series: [{
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 100, name: '电解铜' },
                        { value: 200, name: '硫酸' }
                    ]
                }]
            });

            updateCharts();

            window.addEventListener('resize', () => {
                myBarChart?.resize();
                myPieChart?.resize();
            });
        });

        return {
            barChart, pieChart,
            selectdate,
            fteDataTable, // 模板中现在使用 fteDataTable.电解铜.xxx
            planData,
        };
    }
}).use(ElementPlus).mount('#app');