
const { createApp, ref, onMounted, reactive, computed } = Vue;


/**
 * 用 element plus 用单个html,制作一个表格，要求有日期筛选起止日期到结束日期，日期筛选有两个独立输入，要求表要有线条，背景颜色，表列可以手动调，最后一行有合计数。表格边框颜色为红色，表格列自动填充满个表格，日期筛选默认为起止本月第一天，结束日期为今天，表格行高要设置为30px
 * 
 */


createApp({
    setup() {
        const startDate = ref('');
        const endDate = ref('');
        const currentTime = ref('');

        const tableData = ref([

        ]);



        const fetchData = async (outvalue, api) => {

            await axios.get(api)
                .then(response => {
                    // 假设API返回的数据可以直接用于显示
                    outvalue.value = response.data;

                    // console.log(`output->data`,data)
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }

        fetchData(tableData,"http://192.168.67.242:8001/test/")


        //以下是固定模板------------------------------------

        const setDefaultDates = () => {
                    const today = new Date();
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    
                    const formatDate = (date) => {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    };
                    
                    startDate.value = formatDate(firstDay);
                    endDate.value = formatDate(today);
                };

        const filteredData = computed(() => {
            let data = [...tableData.value];

            if (startDate.value && endDate.value) {
                data = data.filter(item => {
                    const itemDate = item.取数日期;
                    return itemDate >= startDate.value && itemDate <= endDate.value;
                });
            }

            return data;
        });

        const totalQuantity = computed(() => {
            return filteredData.value.reduce((sum, item) => sum + item.quantity, 0);
        });

        const totalAmount = computed(() => {
            return filteredData.value.reduce((sum, item) => sum + item.amount, 0);
        });

        const averagePrice = computed(() => {
            return filteredData.value.length > 0
                ? filteredData.value.reduce((sum, item) => sum + item.price, 0) / filteredData.value.length
                : 0;
        });

        const filterData = () => {
            ElMessage.success(`已筛选出 ${filteredData.value.length} 条记录`);
        };

        const resetFilter = () => {
            startDate.value = '';
            endDate.value = '';
            ElMessage.info('筛选条件已重置');
        };

        const tableRowClassName = ({ rowIndex }) => {
            return '';
        };

        const handleSortChange = ({ column, prop, order }) => {
            console.log('排序变化:', prop, order);
        };

        const getSummaries = (param) => {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }

                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);

                    if (column.property === 'price') {
                        sums[index] = '¥' + (sums[index] / data.length).toFixed(2);
                    } else if (column.property === 'amount') {
                        sums[index] = '¥' + sums[index].toFixed(2);
                    } else if (column.property === 'quantity') {
                        sums[index] = sums[index];
                    } else {
                        sums[index] = '';
                    }
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        };

        const updateTime = () => {
            const now = new Date();
            currentTime.value = now.toLocaleString('zh-CN');
        };

        onMounted(() => {
            updateTime();
            setInterval(updateTime, 1000);
            setDefaultDates()
        });

        return {
            startDate,
            endDate,
            currentTime,
            filteredData,
            totalQuantity,
            totalAmount,
            averagePrice,
            filterData,
            resetFilter,
            tableRowClassName,
            handleSortChange,
            getSummaries
        };
    }
}).use(ElementPlus).mount('#app');
