
const { createApp, ref, onMounted, reactive, computed, defineComponent } = Vue;


/**
 * 用 element plus 用单个html,制作一个表格，要求有日期筛选起止日期到结束日期，日期筛选有两个独立输入，要求表要有线条，背景颜色，表列可以手动调，最后一行有合计数。表格边框颜色为红色，表格列自动填充满个表格，日期筛选默认为起止本月第一天，结束日期为今天，表格行高要设置为30px
 * 
 */


const ColumnNumber = {
    props: {
        value: Number,
        tofixedNumber: Number,
    },
    render() {
        const formattedValue = this.value === 0 || this.value === null ? '-' : (this.value).toFixed(this.tofixedNumber);
        return h('span', formattedValue);
    },
};



const ColumnPercent = {
    props: {
        value: Number,
        tofixedNumber: Number,
    },
    render() {
        const formattedValue = this.value === 0 || this.value === null ? '-' : (this.value * 100).toFixed(this.tofixedNumber) + '%';
        return h('span', formattedValue);
    },
};





createApp(

    {

        components: {
            "column-number": ColumnNumber,
            ColumnPercent

        },


        setup() {
            const startDate = ref('');
            const endDate = ref('');
            const currentTime = ref('');

            const loading = ref(true);

            const tableData = ref([

            ]);

            const currentRow = ref(null)

            const mincolwidths = ref("50")

            const base_urls = "https://weifeng.ckfgs.cn/"



            const fetchData = async (outvalue, api) => {

                await axios.get(base_urls + api)
                    .then(response => {
                        // 假设API返回的数据可以直接用于显示
                        outvalue.value = response.data;

                        // console.log(`output->data`,data)
                    })
                    .catch(error => {
                        console.error('There was an error fetching the data!', error);

                        loading.value = false;
                    });
            }

            fetchData(tableData, "factdata/scbb/shifacuiqu")

            // console.log(`output->tableData`, tableData)

            //以下是固定模板------------------------------------

            //自定义鼠标移动单行颜色

            const handleMouseEnter = (row, event) => {

                // console.log(`output->row:`, row)
                currentRow.value = row;
            }

            const handleMouseLeave = (row, event) => {

                // console.log(`output->row:`, row)
                currentRow.value = null;


            }

            const rowClass = computed(() => (row) => {

                // console.log(`output->row:`, row.row)
                // console.log(`output->cu `,currentRow.value )
                if (currentRow.value === row.row) {

                    // 你可以在这里定义一个类名，例如 'highlight-row'
                    console.log("这里是已经选到行！")
                    return 'highlight-row';
                }
                return '';
            });





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

                // startDate.value = "2025-11-01"
                endDate.value = formatDate(today);
            };

            const filteredData = computed(() => {
                let data = [...tableData.value];

                if (startDate.value && endDate.value) {
                    data = data.filter(item => {
                        const itemDate = item.格式日期;
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

                // console.log(`output->columns`,columns)

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }

                    const values = data.map(item => Number(item[column.property]));
                    console.log(`*************************`,)

                    // console.log(`sum values`,values)

                    // console.log(`output->column.property`,column.property)

                    const divpercent = (colname1, colname2, number = 1, roundint = 2,) => {

                        const totalCopper = data.reduce((prev, curr) => prev + Number(curr[colname1]), 0);
                        const totalDiv = data.reduce((prev, curr) => prev + Number(curr[colname2]), 0);
                        if (totalDiv == 0) {
                            sums[index] = "/"
                        }
                        else {
                            sums[index] = (totalCopper / totalDiv * number).toLocaleString('en-US', { minimumFractionDigits: roundint });
                        }

                    }

                    const avg_nozero = (colname1, roundint = 2,) => {

                        const filteredData = data.filter(curr => Number(curr[colname1]) > 0);
                        // 计算非零值的总和
                        const totalCopper = filteredData.reduce((prev, curr) => prev + Number(curr[colname1]), 0);
                        // 计算平均值
                        const averageCopper = totalCopper / filteredData.length;
                        // 返回格式化后的平均值
                        return formatNumber(averageCopper, roundint);

                    }

                    const sum_nozero = (colname1, roundint = 2,) => {

                        const filteredData = data.filter(curr => Number(curr[colname1]) > 0);
                        // 计算非零值的总和
                        const totalCopper = filteredData.reduce((prev, curr) => prev + Number(curr[colname1]), 0);
                        // 计算平均值
                        const averageCopper = totalCopper ;
                        // 返回格式化后的平均值
                        return formatNumber(averageCopper, roundint);

                    }




                    if (!values.every(value => isNaN(value))) {
                        const sum = values.reduce((prev, curr) => prev + curr, 0);
                        // 按指定列计算平均值
                        if (['一期萃取_料液值',
                            '一期萃取_余液值',

                            '二期萃取_料液值',
                            '二期萃取_余液值',

                            '三期萃取_料液值',
                            '三期萃取_余液值',

                            '四期萃取_料液值',
                            '四期萃取_余液值',

                            '五期萃取_料液值',
                            '五期萃取_余液值',

                            '六期萃取_料液值',
                            '六期萃取_余液值',

                            '七期萃取_料液值',
                            '七期萃取_余液值',

                         
                        ].includes(column.property)) {
                            sums[index] = avg_nozero(column.property, 2)
                        }


                        else if ([
                            "萃取铜_一期",
                            "萃取铜_二期",
                            "萃取铜_三期",
                            "萃取铜_四期",
                            "萃取铜_五期",
                            "萃取铜_六期",
                            "萃取铜_七期",
                            '当天合计_萃取铜'
                       
                        ].includes(column.property)) {
                            sums[index] = sum_nozero(column.property, 2)
                        }

                       
                        else {
                            sums[index] = sum.toLocaleString('en-US', { minimumFractionDigits: 0 });
                        }
                    }


                    else {
                        sums[index] = '';
                    }


                });

                return sums;
            };

            const updateTime = () => {
                const now = new Date();
                currentTime.value = now.toLocaleString('en-US');
            };

            //导出功能

            const exportToExcel = () => {
                try {
                    const dataToExport = tableData.value;

                    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, '数据表');

                    XLSX.writeFile(workbook, `数据导出_${new Date().toLocaleDateString()}.xlsx`);

                    console.log(`成功导出 ${dataToExport.length} 条数据`);
                } catch (error) {
                    console.log(`错误导出数据`);
                }
            };

            //千分位
            const formatNumber = (value, roundint = 2, percent = 1) => {
                if (value === 0 || value === null) return '-';
                return (value * percent).toLocaleString('en-US', { minimumFractionDigits: roundint });
            }


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
                getSummaries,
                mincolwidths,
                exportToExcel,
                loading,
                handleMouseEnter,
                handleMouseLeave,
                rowClass,
                formatNumber


            };
        }
    }).use(ElementPlus).mount('#app');
