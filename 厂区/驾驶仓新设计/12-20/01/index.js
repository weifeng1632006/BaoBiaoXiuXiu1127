
const { createApp, ref, onMounted, reactive, computed, defineComponent } = Vue;

const productCard = defineComponent({

     methods: {

        round: (value, r = 3) => {
            var number = parseFloat(value).toFixed(r)
            var numberAsNum = parseFloat(number);
            var number2 = numberAsNum.toLocaleString();
            return number2

        },
        //千分位
        formatNumber :(value, roundint = 3, percent = 1) => {
            if (value === 0 || value === null) return '-';
            return (value * percent).toLocaleString('en-US', { maximumFractionDigits: roundint });
        },
        // 计算任务完成率
        wanchen:(v1,v2,rint=2) => {

            if (v2==0){

                return 0;


            }
            else{

                return (v1/v2*100).toFixed(rint)
            }

        }

    },

    props: [

        "product_name",

        "pnumber_d",
        "pnumber_d_jh",

        "pnumber_m",
        "pnumber_m_jh",


        "pnumber_y",
        "pnumber_y_jh",

        
        "inumber",
      
    ],

    setup(props) {

        console.log(`props`, props)

    },


    template:
        `   
            <div class="grid-content ep-bg-purple div-card-col-1">
                    <el-card class="card-data-col-1">
                        <sapn class="mx-1 card-product-name">{{product_name}}:</sapn>
                        <el-row>
                            <el-col :span="6">
                                <p class="product-data-1"><span>{{formatNumber(pnumber_d,3)}} </span></p>
                                <p class="product-data-2"><span >日产量</span></p>
                         

                            </el-col>
                            <el-col :span="6">
                                <p class="product-data-1"><span>{{formatNumber(pnumber_m,3)}} </span></p>
                                <p class="product-data-2"><span >月累计产量</span></p>
                                <p class="product-data-3"><span >任务完成率:<span>{{wanchen(pnumber_m,pnumber_m_jh)}}%</span></span></p>

                            </el-col>
                             <el-col :span="6">
                                <p class="product-data-1"><span>{{formatNumber(pnumber_y,3)}} </span></p>
                                <p class="product-data-2"><span >年累计产量</span></p>
                                <p class="product-data-3"><span >任务完成率:<span>{{wanchen(pnumber_y,pnumber_y_jh)}}%</span></span></p>

                            </el-col>
                           <el-col :span="6">
                                <p class="product-data-1"><span>{{formatNumber(inumber,3)}} </span></p>
                                <p class="product-data-2"><span >库存数</span></p>
                              

                            </el-col>

                        </el-row>
                        <el-row>
                    </el-card>
            </div>


    `


})

const chenbenData = defineComponent({

     methods: {

        round: (value, r = 3) => {
            var number = parseFloat(value).toFixed(r)
            var numberAsNum = parseFloat(number);
            var number2 = numberAsNum.toLocaleString();
            return number2

        },
        //千分位
        formatNumber :(value, roundint = 3, percent = 1) => {
            if (value === 0 || value === null) return '-';
            return (value * percent).toLocaleString('en-US', { maximumFractionDigits: roundint });
        }
    },

    props: [
        "classname",
        "titlename_1",
        "cbdata_1",

        "titlename_2",
         "cbdata_2",

       
      
    ],

    setup(props) {

        console.log(`props`, props)

    },

   
    template:
        `   
         <div class="data-chenben">
                <el-row :class="classname">
                    <el-col :span="12">
                       
                        <p class="  p-chenben-2"><span>{{formatNumber(cbdata_1,2)}}</span></p>
                         <p class="p-chenben-1"><span>{{titlename_1}}</span></p>
                    </el-col>
                    <el-col :span="12">
                      
                        <p class="  p-chenben-2"><span>{{formatNumber(cbdata_2,2)}}</span></p>
                         <p class=" p-chenben-1"><span>{{titlename_2}}</span></p>
                </el-row>
        </div>        

    `


})





createApp(

    {
        components: {
            "product-card": productCard,
            "chenben-data":chenbenData


        },


        setup() {





            const stats = ref({
                users: 1234,
                orders: 567,
                articles: 89,
                visits: 45678
            });

            const barChart = ref(null);
            const pieChart = ref(null);
            const lineChart = ref(null);
            const radarChart = ref(null);

            let myBarChart = null;
            let myPieChart = null;
            let myLineChart = null;
            let myRadarChart = null;

                //千分位
            const formatNumber = (value, roundint = 2, percent = 1) => {
                if (value === 0 || value === null) return '-';
                return (value * percent).toLocaleString('en-US', { maximumFractionDigits: roundint });
            }

            onMounted(() => {
                // 初始化柱状图
                myBarChart = echarts.init(barChart.value);
                myBarChart.setOption({
                    title: { text: '📊 用户增长趋势' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {},
                    series: [{
                        name: '新增用户',
                        type: 'bar',
                        data: [120, 200, 150, 80, 70, 110, 130],
                        itemStyle: { color: '#409EFF' }
                    }]
                });

                // 初始化饼图
                myPieChart = echarts.init(pieChart.value);
                myPieChart.setOption({
                    title: { text: '🍕 用户设备分布' },
                    tooltip: { trigger: 'item' },
                    legend: { top: 'bottom' },
                    series: [{
                        name: '设备类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: { show: false, position: 'center' },
                        emphasis: {
                            label: { show: true, fontSize: '18', fontWeight: 'bold' }
                        },
                        labelLine: { show: false },
                        data: [
                            { value: 1048, name: '移动端' },
                            { value: 735, name: 'PC端' },
                            { value: 580, name: '平板' },
                            { value: 484, name: '其他' }
                        ]
                    }]
                });

                // 初始化折线图
                myLineChart = echarts.init(lineChart.value);
                myLineChart.setOption({
                    title: { text: '📈 访问量变化' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        data: [120, 132, 101, 134, 90, 230, 210],
                        type: 'line',
                        smooth: true,
                        areaStyle: {}
                    }]
                });

                // 初始化雷达图
                myRadarChart = echarts.init(radarChart.value);
                myRadarChart.setOption({
                    title: { text: '🎯 用户行为分析' },
                    tooltip: {},
                    radar: {
                        indicator: [
                            { name: '购买意愿', max: 6500 },
                            { name: '浏览深度', max: 16000 },
                            { name: '活跃度', max: 30000 },
                            { name: '留存率', max: 38000 },
                            { name: '满意度', max: 52000 }
                        ]
                    },
                    series: [{
                        name: '用户评分',
                        type: 'radar',
                        data: [{ value: [4300, 10000, 28000, 35000, 50000], name: '平均表现' }]
                    }]
                });

                window.addEventListener('resize', () => {
                    myBarChart.resize();
                    myPieChart.resize();
                    myLineChart.resize();
                    myRadarChart.resize();
                });
            });




            return {

                stats,
                barChart,
                pieChart,
                lineChart,
                radarChart


            };
        }
    }).use(ElementPlus).mount('#app');
