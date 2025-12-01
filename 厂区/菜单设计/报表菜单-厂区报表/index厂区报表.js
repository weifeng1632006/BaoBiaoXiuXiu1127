const { createApp, ref, reactive, onMounted, nextTick } = Vue;

const { ElTree, ElIcon, ElInput, ElForm, ElFormItem, ElRadioGroup, ElRadio, ElSwitch, ElTag } = ElementPlus;

const { Folder, Document, CircleCheck, CircleClose, Warning, Search, Setting, FolderOpened, InfoFilled } = ElementPlusIconsVue;

// 添加事件监听器来捕获网络错误
window.addEventListener('error', function (event) {
    if (event.message.includes('404')) {
        console.warn('404 Error ignored:', event.message);
        event.preventDefault(); // 阻止默认的错误处理
    }
}, true);


const 生产系统报表 = {
    label: '生产统计报表',
    type: 'folder',
    id: 1,
    children: [
        {
            type: 'file',
            id: 11,
            label: '生产系统报表01',
            url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7706304077a24c5ab25abfa43756c9c2',

        },

        {
            type: 'file',
            id: 12,
            label: '生产系统报表02',

        },
        {
            type: 'file',
            id: 13,
            label: '生产系统报表03',

        },
        {
            type: 'file',
            id: 14,
            label: '生产系统报表04',

        },
        {
            type: 'file',
            id: 15,
            label: '生产系统报表05',

        },
        {
            type: 'file',
            id: 16,
            label: '生产系统报表06',

        },
    ],


}
const 电解铜统计 = {
    label: '电解铜统计',
    type: 'folder',
    id: 2,
    children: [
        {
            label: '电解铜产量表',
            type: "file",
            id: 21,
            url:"https://www.yunzhijia.com/maco-platform/view/report.do?reportId=2e23d3d7f7a7471d9aa35d2df4d35463"

        },
        {
            label: '电解铜进销存',
            type: "file",
            id: 22,
            url:"https://www.yunzhijia.com/maco-platform/view/report.do?reportId=5f156c08264e4f2d9a8a5773287f8f5c"

        },
    ],
}
const 铜精矿统计 = {
    label: '铜精矿统计',
    type: 'folder',
    id: 3,
    children: [
        {
            label: '铜精矿产量计算表',
            type: "file",
            id: 31,

        },
        {
            label: '铜精矿进销存表',
            type: "file",
            id: 32,

        },
    ],
}

const 硫酸厂统计 = {
    label: '硫酸厂统计',
    type: 'folder',
    id: 4,
    children: [
        {
            label: '硫酸一工段报表',
            type: "folder",
            id: 41,

            children: [
                {
                    label: '硫酸1生产报表',
                    type: "file",
                    id: 411,

                },
                {
                    label: '硫酸1供销存',
                    type: "file",
                    id: 412,

                }


            ]

        },
        {
            label: '硫酸二工段报表',
            type: "folder",
            id: 42,

            children: [
                {
                    label: '硫酸2生产报表',
                    type: "file",
                    id: 421,

                },
                {
                    label: '硫酸2供销存',
                    type: "file",
                    id: 422,

                }


            ]

        },

        {
            label: '硫磺供销存报表',
            type: "fiel",
            id: 43,

        },
    ],
}
const 球磨报表类 = {
    label: '球磨报表类',
    type: 'folder',
    id: 5,
    children: [
        {
            label: '半自磨磨矿量表（1、2期）',
            type: "file",
            id: 51,

        },
        {
            label: '磨浮磨矿量表（3期）',
            type: "file",
            id: 52,

        },
        {
            label: '铜矿磨矿量表（4、5期）',
            type: "file",
            id: 53,

        },
    ],
}

const 萃取报表类 = {
    label: '萃取报表类',
    type: 'folder',
    id: 6,
    children: [
        {
            label: '萃取1报表',
            type: "file",
            id: 61,

        },
        {
            label: '萃取2报表',
            type: "file",
            id: 62,

        },

    ],
}

const 浓密报表类 = {
    label: '浓密报表类',
    type: 'folder',
    id: 7,
    children: [
        {
            label: '浓密报表',
            type: "file",
            id: 71,

        },


    ],
}
const 成本消耗统计表 = {
    label: '成本消耗统计表',
    type: 'folder',
    id: 8,
    children: [

          {
            label: '湿法分厂消耗统计',
            type: "folder",
            id: 83,
            children: [
                {
                    label: '浓密浸出工段-月度',
                    type: "file",
                    id: 831,

                },
                {
                    label: '萃取电积消耗-月度',
                    type: "file",
                    id: 832,

                },
                {
                    label: '尾矿料液消耗-月度',
                    type: "file",
                    id: 833,

                }


            ]

        },
        {
            label: '破碎球磨工段消耗统计',
            type: "file",
            id: 81,

        },
        {
            label: '磨浮压滤工段消耗统计',
            type: "file",
            id: 82,

        },

      
        {
            label: '硫酸工段消耗统计',
            type: "file",
            id: 84,

        },
        {
            label: '磨浮材料消耗分配表',
            type: "file",
            id: 85,

        },



    ],
}
const treedata = [
    生产系统报表,
    电解铜统计,
    铜精矿统计,
    硫酸厂统计,
    球磨报表类,
    萃取报表类,
    浓密报表类,
    成本消耗统计表

]


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
        ElInput,
        ElForm,
        ElFormItem,
        ElRadioGroup,
        ElRadio,
        ElSwitch,
        ElTag,
        Search,
        Setting,
        FolderOpened,
        InfoFilled




    },
    setup() {

        //function array object ---------------------------------

        //#region 定义标签到URL的映射，仅需要需要这里

        const data = ref(
            treedata

        );


        //#endregion-------------------------

        //*************************************搜索用的函数***************** */
        const message = "hello";
        const accordionf = "true";
        const treeRef = ref(null);
        const searchText = ref('');
        const searchMode = ref('fuzzy');
        const enableHighlight = ref(true);
        const autoExpand = ref(false);
        const matchedCount = ref(0);
        const expandedKeys = ref([]);
        const expanda_word = ref(false)


        const defaultProps = {
            children: 'children',
            label: 'label',
        };

        const handleNodeClick = (data, node,) => {
            console.log("我开始点击了------");
            console.log(data);

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
                console.log(`output->最后一个节点`);
                // const url = labelToUrlMap[data.label];

                const url = data.url

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



        const filterNode = (value, data, node) => {
            if (!searchText.value) {
                matchedCount.value = 0;
                return true;
            }

            const label = data.label || '';
            let isMatch = false;

            if (searchMode.value === 'exact') {
                isMatch = label.includes(value);
            } else {
                isMatch = label.toLowerCase().includes(value.toLowerCase());
            }

            if (isMatch) {
                matchedCount.value++;
            }

            return isMatch;
        };
        const handleSearch = () => {
            matchedCount.value = 0;
            if (treeRef.value) {
                treeRef.value.filter(searchText.value);

                if (autoExpand.value && searchText.value) {
                    expandMatchedNodes(treeData.value);
                }
            }
        };

        const clearSearch = () => {
            matchedCount.value = 0;
            expandedKeys.value = [];
        };

        const expandMatchedNodes = (nodes) => {
            const expandKeys = [];

            const traverse = (nodeList, parentKeys = []) => {
                nodeList.forEach(node => {
                    const currentKeys = [...parentKeys, node.id];

                    const label = node.label || '';
                    let isMatch = false;

                    if (searchMode.value === 'exact') {
                        isMatch = label.includes(searchText.value);
                    } else {
                        isMatch = label.toLowerCase().includes(searchText.value.toLowerCase());
                    }

                    if (isMatch) {
                        expandKeys.push(...currentKeys);
                    }

                    if (node.children) {
                        traverse(node.children, currentKeys);
                    }
                });
            };

            traverse(nodes);
            expandedKeys.value = [...new Set(expandKeys)];
        };

        const handleAutoExpand = () => {

            const value = true
            console.log(`output->value`, value)

            console.log(`output->treeRef.value`, treeRef.value)
            if (!treeRef.value) return;

            console.log(`output->----------------`,)

            const allNodes = treeRef.value.store._getAllNodes();

            if (value) {
                // 展开所有节点
                allNodes.forEach(node => {
                    node.expanded = true;
                });
                expandedKeys.value = allNodes.map(node => node.data.id);
                console.log(`output->expandedKeys.value`, expandedKeys.value)
            } else {
                // 折叠所有节点
                allNodes.forEach(node => {
                    node.expanded = false;
                });
                expandedKeys.value = [];
            }

            nextTick(() => {
                // calculateStats();
            });
        };

        const handleAutoExpand2 = () => {

            const value = false
            console.log(`output->value`, value)

            console.log(`output->treeRef.value`, treeRef.value)
            if (!treeRef.value) return;

            console.log(`output->----------------`,)

            const allNodes = treeRef.value.store._getAllNodes();

            if (value) {
                // 展开所有节点
                allNodes.forEach(node => {
                    node.expanded = true;
                });
                expandedKeys.value = allNodes.map(node => node.data.id);
                console.log(`output->expandedKeys.value`, expandedKeys.value)
            } else {
                // 折叠所有节点
                allNodes.forEach(node => {
                    node.expanded = false;
                });
                expandedKeys.value = [];
            }

            nextTick(() => {
                // calculateStats();
            });
        };
        const highlightText = (text) => {
            if (!searchText.value || !enableHighlight.value) return text;

            const regex = new RegExp(`(${searchText.value})`, 'gi');
            return text.replace(regex, '<span class="highlight-node">$1</span>');
        };

        const getTagType = (type) => {
            const typeMap = {
                category: 'primary',
                framework: 'success',
                library: 'warning',
                version: 'info',
                language: '',
                database: 'danger',
                tool: '',
                editor: '',
                runtime: 'success'
            };

            return typeMap[type] || '';
        };

        onMounted(() => {
            console.log('Tree component mounted');
        });


        return {
            message,
            data,
            defaultProps,
            handleNodeClick,
            accordionf,
            treeRef,
            searchText,
            searchMode,
            enableHighlight,
            autoExpand,
            matchedCount,
            expandedKeys,
            expanda_word,

            defaultProps,
            filterNode,
            handleSearch,
            clearSearch,
            handleAutoExpand,
            highlightText,
            getTagType,
            handleAutoExpand2,
        };
    },
});

app.use(ElementPlus);
app.mount('#app');
