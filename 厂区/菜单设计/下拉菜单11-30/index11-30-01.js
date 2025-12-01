const { createApp, ref, reactive,watch } = Vue;

const { ElTree, ElIcon, ElTag ,ElInput,  } = ElementPlus;

const { Folder, Document, CircleCheck, CircleClose, Warning } = ElementPlusIconsVue;

// 添加事件监听器来捕获网络错误
window.addEventListener('error', function (event) {
    if (event.message.includes('404')) {
        console.warn('404 Error ignored:', event.message);
        event.preventDefault(); // 阻止默认的错误处理
    }
}, true);

const cataloguev1 = {
    components: {
        ElTree,
        ElIcon,
        Folder,
        Document,
        ElInput
    },
    props: [

         "calName",
        "data",
        "defaultProps",
        "soure_url",
        "treeRefname",

        "filterNode"
        // 确保这个属性被声明
    ]
       
    ,
    setup(props) {
        const handleNodeClick = (data, node) => {
            console.log("我开始点击了------");
            console.log(data);
            console.log(`props->`,props)

            // console.log(`labelToUrlMap->`, props.urlToLabelMap);
            // console.log(`output->name`,props.soure_url['45期球磨报表'])

            // 检查 data 是否为 undefined
            if (!data) {
                console.error("data 是 undefined");
                return;
            }

            // 检查 data.label 是否为 undefined
            if (!data.label) {
                console.error("data.label 是 undefined");
                return;
            }

            if (!data.children || data.children.length === 0) {
                console.log('Third level node clicked:', data.label);
                console.log("output->最后一个节点");
                const url = props.soure_url[data.label];
                if (url) {
                    window.open(url, '_blank');
                } else {
                    console.log('没有找到对应的 URL');
                }
            } else {
                // 手动切换节点展开状态
                // if (treeRef.value) {
                //     treeRef.value.toggleNodeExpansion(node.data);
                // } else {
                //     console.error("treeRef.value 未正确挂载");
                // }
            }
        };

        return {
            handleNodeClick
        };
    },
    template: `
        <div>
            <span>厂区查询报表</span>
            <el-input
            v-model="filterText"
            class="w-60 mb-2"
            placeholder="Filter keyword"
            />
            <p></p>
            <el-tree
                :data="data"
                ref="treeRef"
                :props="defaultProps"
                @node-click="handleNodeClick"
                class="filter-tree"
                :filter-node-method="filterNode"
            >
                <template #default="{ node, data }">
                    <span class="custom-node">
                        <el-icon v-if="data.type === 'folder'" class="custom-icon folder-icon">
                            <Folder />
                        </el-icon>
                        <el-icon v-else class="custom-icon document-icon">
                            <Document />
                        </el-icon>
                        <span>{{ node.label }}</span>
                    </span>
                </template>
            </el-tree>
        </div>
    `
};



const app = createApp({
    components: {
        ElTree,
        ElIcon,
        ElTag,
        Folder,
        Document,
        CircleCheck,
        CircleClose,
        Warning,
        "cataloguev1":cataloguev1
    },
    setup() {

        const filterText = ref('')
        const treeRef = ref(null);
        const message = "hello";

        const soure_url=ref({
            "45期球磨报表": 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7706304077a24c5ab25abfa43756c9c2',
            "硫酸一产出报表": 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=d10a9a8696de463bbdb29c6685968b0f',

        })

          watch(filterText, (val) => {
          treeRef.value.filter(val)
        })

         const filterNode = (value, data) => {
          if (!value) return true
          return data.label.includes(value)
        }

        const data = ref([
            {
                label: '厂区-湿法分厂例',
                type: 'folder',
                children: [
                    {
                        label: '磨矿石类',
                        type: 'folder',
                        children: [
                            {
                                label: '45期球磨报表',
                                type: 'file',
                            },
                        ],
                    },
                ],
            },
            {
                label: '硫酸报表类',
                type: 'folder',
                children: [
                    {
                        label: '-硫酸一工段',
                        type: 'folder',
                        children: [
                            {
                                label: '--硫酸一产出报表',
                                type: 'file',
                            },
                        ],
                    },
                    {
                        label: 'Level two 2-2',
                        children: [
                            {
                                label: 'Level three 2-2-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 3',
                children: [
                    {
                        label: 'Level two 3-1',
                        children: [
                            {
                                label: 'Level three 3-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 3-2',
                        children: [
                            {
                                label: 'Level three 3-2-1',
                            },
                        ],
                    },
                ],
            },
        ]);

        const defaultProps = ref({
            children: 'children',
            label: 'label',
        });

        return {
            message,
            data,
            defaultProps,
            treeRef,
            soure_url,
            filterNode,
        };
    },
});

app.use(ElementPlus);
app.mount('#app');
