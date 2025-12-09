
const { createApp, ref, onMounted, reactive, computed, defineComponent } = Vue;


/**
 * 用 element plus 用单个html,制作一个表格，要求有日期筛选起止日期到结束日期，日期筛选有两个独立输入，要求表要有线条，背景颜色，表列可以手动调，最后一行有合计数。表格边框颜色为红色，表格列自动填充满个表格，日期筛选默认为起止本月第一天，结束日期为今天，表格行高要设置为30px
 * 
 */



const ksname_1 = defineComponent({

    methods: {

        round: (value, r = 2) => {
            var number = parseFloat(value).toFixed(r)
            var numberAsNum = parseFloat(number);
            var number2 = numberAsNum.toLocaleString();
            return number2

        },

    },

    props: [
        "first_title",
        "second_title",
        "propname1",
        "clname1",
        "propname2",
        "clname2",
        "propname3",
        "clname3",
        "propname4",
        "clname4",
        "mincolwidth"

    ],

    setup(props) {

        // console.log(`props`, props)

        // console.log(`output->props['first_title']`, props['first_title'])


    },

    /**
     * <template #default="scope">
                    {{ scope.row[propname1] === 0 || scope.row[propname1] === null ? '-' : scope.row[propname1].toFixed(0) }}
                </template>
     * 
     */

    template:
        `   


     <el-table-column :label="second_title">
        <el-table-column :prop="propname1" :label="clname1" sortable resizable :min-width="mincolwidth">
            <template #default="scope">
                {{ scope.row[propname1] === 0 || scope.row[propname1] === null ? '-' : scope.row[propname1].toFixed(0) }}
            </template>
        </el-table-column>
        <el-table-column :prop="propname2" :label="clname2" sortable resizable :min-width="mincolwidth" hight="30">
            <template #default="scope">
                {{ scope.row[propname2] === 0 || scope.row[propname2] === null ? '-' : scope.row[propname2].toFixed(2) }}
            </template>
        </el-table-column>
        <el-table-column :prop="propname3" :label="clname3" sortable resizable :min-width="mincolwidth">
            <template #default="scope">

             {{ scope.row[propname3] === 0 || scope.row[propname3] === null ? '-' : (scope.row[propname3]*100).toFixed(2) }}%
              
            </template>
        </el-table-column>
        <el-table-column :prop="propname4" :label="clname4" sortable resizable :min-width="mincolwidth">
            <template #default="scope">
                 {{ scope.row[propname4] === 0 || scope.row[propname4] === null ? '-' : scope.row[propname4].toFixed(2) }}
            </template>
        </el-table-column>
    </el-table-column>
      

   

    `
})

const ksname_2 = defineComponent({

    methods: {

        round: (value, r = 2) => {
            var number = parseFloat(value).toFixed(r)
            var numberAsNum = parseFloat(number);
            var number2 = numberAsNum.toLocaleString();
            return number2

        },

    },

    props: [
        "first_title",
        "second_title",
        "propname1",
        "clname1",
        "propname2",
        "clname2",
        "propname3",
        "clname3",
        "propname4",
        "clname4",
        "mincolwidth",


    ],

    setup(props) {

        // console.log(`props`, props)

        // console.log(`output->props['first_title']`, props['first_title'])


    },

    template:
        `   
    

     <el-table-column :label="second_title">
        <el-table-column :prop="propname1" :label="clname1" sortable resizable :min-width="mincolwidth">
            <template #default="scope">
              {{ scope.row[propname1] === 0 || scope.row[propname1] === null ? '-' : scope.row[propname1].toFixed(0) }}
            </template>
        </el-table-column>
        <el-table-column :prop="propname2" :label="clname2" sortable resizable :min-width="mincolwidth">
            <template #default="scope">
                {{ scope.row[propname1] === 0 || scope.row[propname1] === null ? '-' : scope.row[propname2].toFixed(2) }}
            </template>
        </el-table-column>
   
         </el-table-column>
      

    

    `
})

createApp(

    {
        components: {
            "ksname_1": ksname_1,

            "ksname_2": ksname_2,


        },



        setup() {
            const startDate = ref('');
            const endDate = ref('');
            const currentTime = ref('');

           

            const tableData = ref([

            ]);

            const mincolwidths = ref("50")

            const base_urls = "https://119.91.70.22/"



            const fetchData = async (outvalue, api) => {

                await axios.get(base_urls + api)
                    .then(response => {
                        // 假设API返回的数据可以直接用于显示
                        outvalue.value = response.data;

                        // console.log(`output->data`,data)
                    })
                    .catch(error => {
                        console.error('There was an error fetching the data!', error);
                    });
            }

            fetchData(tableData, "factdata/scbb/mokuang")

            // console.log(`output->tableData`, tableData)

        


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

                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            // console.log(`output->value`, value)
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0).toFixed(2);


                        if (["三期氧化含铜量", "一二期氧化含铜量", "四五期氧化含铜量", "平均氧化含铜"].includes(column.property)) {
                            sums[index] = (sums[index] / data.length * 100).toFixed(2) + "%";

                        }


                        if (['三期湿重', '三期干吨',

                            '一二期湿吨',
                            '四五期湿吨', '一二期干吨',

                            '四五期干吨',

                            '合计精铜湿吨', '合计精铜干吨',
                            '合计湿重', '合计干吨',
                        ].includes(column.property)) {
                            sums[index] = (sums[index] / 1).toFixed(0);
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
                currentTime.value = now.toLocaleString('zh-CN');
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
                exportToExcel
                
            };
        }
    }).use(ElementPlus).mount('#app');
