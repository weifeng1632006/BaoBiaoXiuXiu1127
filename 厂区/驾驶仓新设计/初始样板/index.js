
const { createApp, ref, onMounted, reactive, computed, defineComponent } = Vue;



createApp(

    {


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
