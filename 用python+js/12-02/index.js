
const { createApp, ref, onMounted, reactive, computed } = Vue;





createApp({
    setup() {

        const data = ref(null)


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




        //table-----------------------------------------
        const startDate = ref('');
        const endDate = ref('');

        const tableData = ref([

        ]);

        fetchData(tableData, "http://192.168.67.242:8001/test/")

        console.log("********************************************")

        console.log(`output->tableData`, tableData)

        const filteredData = computed(() => {
            let data = [...tableData.value];

            if (startDate.value && endDate.value) {
                data = data.filter(item => {
                    const itemDate = item['取数日期'];
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
            // 筛选逻辑已在 computed 中实现
            ElMessage.success('数据筛选完成');
        };

        const resetFilter = () => {
            startDate.value = '';
            endDate.value = '';
            ElMessage.info('筛选条件已重置');
        };

        // const tableRowClassName = ({ rowIndex }) => {
        //     if (rowIndex === filteredData.value.length) {
        //         return 'summary-row';
        //     }
        //     return '';
        // };

        const handleSortChange = ({ column, prop, order }) => {
            console.log('排序变化:', prop, order);
        };

        //
        const getSummaryStyle = ({ columnIndex }) => {
            if (columnIndex === 0) {
                return { background: '#f0f9eb', fontWeight: 'bold' };
            } else if (columnIndex === 1) {
                return { background: '#e0f3d8', fontWeight: 'bold', color: 'red' };
            } else if (columnIndex === 2) {
                return { background: '#e0f3d8', fontWeight: 'bold', color: 'blue' };
            } else {
                return { background: '#e0f3d8', fontWeight: 'bold' };
            }
        };



        //return html----------------------------------------------------------

        return {
            data, fetchData, startDate,
            endDate,
            filteredData,
            totalQuantity,
            totalAmount,
            averagePrice,
            filterData,
            resetFilter,
            
            handleSortChange,

            getSummaryStyle
        };


    }




}).use(ElementPlus).mount('#app')

