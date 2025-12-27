const { createApp, ref, reactive, onMounted, nextTick } = Vue;

const { ElTree, ElIcon, ElInput, ElForm, ElFormItem, ElRadioGroup, ElRadio, ElSwitch, ElTag } = ElementPlus;

const { Folder, Document, CircleCheck, CircleClose, Warning, Search, Setting, CirclePlus, Money, Files, DCaret
    , FolderOpened, InfoFilled, Plus, circleplus, Add } = ElementPlusIconsVue;

// 添加事件监听器来捕获网络错误
// window.addEventListener('error', function (event) {
//     if (event.message.includes('404')) {
//         console.warn('404 Error ignored:', event.message);
//         event.preventDefault(); // 阻止默认的错误处理
//     }
// }, true);
//<el-icon><DocumentAdd /></el-icon>




const treedata =
{
    "生产系统报表": {
        label: '生产统计报表',
        type: 'fileroot',
        id: 1,
        children: [
            {
                type: 'folder',
                id: 11,
                label: '硫酸报表',
                children: [

                    {
                        type: 'file',
                        id: 111,
                        label: '硫酸单耗统计表',
                        url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=0252e733caf2443a8764c0786cc1faf2'

                    },

                    {
                        type: 'file',
                        id: 112,
                        label: '硫酸全厂库存表',
                        url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=bdb02438f3704e4ea2cbf0c2148fde64'

                    },
                    {
                        type: 'file',
                        id: 113,
                        label: '硫酸一工段库存表',
                        url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=cea33775bfd24dcdaeef52a62db53dc4'

                    },
                    {
                        type: 'file',
                        id: 114,
                        label: '硫酸二工段库存表',
                        url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=98da5d467d0c4f49a9802c4c9ccca1b5'

                    },

                ]

            },

            {
                type: 'folder',
                id: 12,
                label: '湿法分厂报表',
                children: [

                    {
                        type: 'file',
                        id: 121,
                        label: '湿法分厂萃取统计表',
                        url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=1936b912a0a14910bd32d0a058cc3181"

                    },

                    {
                        type: 'file',
                        id: 122,
                        label: '湿法分厂电积统计表',
                        url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=b6d2b760b3264f9a865e265b82e14628'

                    },


                ]


            },



            {
                type: 'file',
                id: 13,
                label: '总磨矿量表',
                url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=f767ba38bcd64fa09638edbaa55d66b6',

            },

            {
                type: 'file',
                id: 14,
                label: '光伏储能供电统计表',
                url: 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=369caef378f24658bf4288220f51da07',

            },


            {
                type: 'file',
                id: 15,
                label: '选矿分厂统计表',
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=8f05712624d244a4aacb1b1d723b7751"
            },

            {
                type: 'file',
                id: 15,
                label: '铜精矿产量计算表',
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=96cca17ac9814e8cb0153a21e1c068bd"

            },

        ],


    },
    "电解铜统计": {
        label: '电解铜统计',
        type: 'folder',
        id: 2,
        children: [
            {
                label: '电解铜产量表',
                type: "file",
                id: 21,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=2e23d3d7f7a7471d9aa35d2df4d35463"

            },
            {
                label: '电解铜进销存',
                type: "file",
                id: 22,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=5f156c08264e4f2d9a8a5773287f8f5c"

            },
        ],
    },

}







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
        InfoFilled,
        Plus,
        Money,
        "dcarets": DCaret,
        Files,
        "acircleplus": CirclePlus
    },
    setup() {

        //function array object ---------------------------------

        //#region 定义标签到URL的映射，仅需要需要这里

        const data = ref(
            {
                "生产系统报表": {
                    "data_name": [treedata['生产系统报表']],
                    'treeref_name': ref({}),
                },
                "电解铜统计": {
                    "data_name": [treedata['电解铜统计']],
                    'treeref_name': ref({

                    }),
                },

            }
        );

        const currentTime = ref(new Date())


        //#endregion-------------------------

        //*************************************搜索用的函数***************** */
        const message = "hello";
        const accordionf = "true";


        const searchText = ref('');
        const searchMode = ref('fuzzy');
        const enableHighlight = ref(true);
        const autoExpand = ref(false);
        const matchedCount = ref(0);
        const expandedKeys = ref([]);
        const expanda_word = ref(false)
        //treefef1

        const treeRefs = ref({});

        const treeRef1 = ref(null);
        const treeRef2 = ref(null);



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
            console.log('这里开始搜查----------------');
            matchedCount.value = 0;
            // 遍历 data 对象
            for (const key in data.value) {
                console.log("key=", key);

                console.log("keyvalue=", data.value[key]);
                if (data.value.hasOwnProperty(key)) {
                    const treeref_name = data.value[key]['treeref_name'];
                    console.log("treeref", treeref_name);
                    if (treeref_name && treeref_name.value) {
                        const treeref = treeref_name;
                        // console.log("treeref", treeref);
                        const dataName = data.value[key].data_name[0];
                        // console.log("dataName", dataName);
                        search_func(treeref, data.value[key].data_name[0]);

                    }
                    else {
                        console.log("treeref_name is null or undefined for key:", key);
                    }

                }
            }
        };



        const search_func = (treeRefs, data_col) => {

            if (treeRefs.value) {
                treeRefs.value.filter(searchText.value);
                if (autoExpand.value && searchText.value) {
                    expandMatchedNodes(data[data_col].value);
                }
            }
        }


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
            const value = true; // 或者根据需要动态设置
            console.log(`output->value`, value);

            // 遍历 data 对象
            for (const key in data.value) {
                if (data.value.hasOwnProperty(key)) {
                    const treeref_name = data.value[key].treeref_name;
                    console.log("key=", key);
                    console.log("keyvalue=", data.value[key]);
                    console.log("treeref_name", treeref_name);

                    if (treeref_name && treeref_name.value) {
                        const tree = treeref_name.value;
                        console.log("tree", tree);
                        const allNodes = tree.store._getAllNodes();
                        console.log("allNodes", allNodes);

                        if (value) {
                            // 展开所有节点
                            allNodes.forEach(node => {
                                node.expanded = true;
                            });
                            expandedKeys.value = allNodes.map(node => node.data.id);
                            console.log(`output->expandedKeys.value`, expandedKeys.value);
                        } else {
                            // 折叠所有节点
                            allNodes.forEach(node => {
                                node.expanded = false;
                            });
                            expandedKeys.value = [];
                        }
                    } else {
                        console.log("treeref_name is null or undefined for key:", key);
                    }
                }
            }

            nextTick(() => {
                // 可以在这里添加其他逻辑
                // calculateStats();
            });
        };


        const handleAutoExpand2 = () => {
            const value = false; // 或者根据需要动态设置
            console.log(`output->value`, value);

            // 遍历 data 对象
            for (const key in data.value) {
                if (data.value.hasOwnProperty(key)) {
                    const treeref_name = data.value[key].treeref_name;
                    console.log("key=", key);
                    console.log("keyvalue=", data.value[key]);
                    console.log("treeref_name", treeref_name);

                    if (treeref_name && treeref_name.value) {
                        const tree = treeref_name.value;
                        console.log("tree", tree);
                        const allNodes = tree.store._getAllNodes();
                        console.log("allNodes", allNodes);

                        if (value) {
                            // 展开所有节点
                            allNodes.forEach(node => {
                                node.expanded = true;
                            });
                            expandedKeys.value = allNodes.map(node => node.data.id);
                            console.log(`output->expandedKeys.value`, expandedKeys.value);
                        } else {
                            // 折叠所有节点
                            allNodes.forEach(node => {
                                node.expanded = false;
                            });
                            expandedKeys.value = [];
                        }
                    } else {
                        console.log("treeref_name is null or undefined for key:", key);
                    }
                }
            }

            nextTick(() => {
                // 可以在这里添加其他逻辑
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

        const updateTime = () => {
            const now = new Date();
            currentTime.value = now.toLocaleString('zh-CN');
        };
        const setTreeRef = (key) => {
            return (el) => {
                // console.log("el", el);
                if (el) {
                    console.log("el no null-----------------");
                    treeRefs.value[key] = el;
                    data.value[key].treeref_name.value = el;
                    // console.log("data.value[key].treeref_name.value", data.value[key].treeref_name.value);
                }
            };
        };

        onMounted(() => {
            updateTime()
            console.log('Tree component mounted');

            console.log("===========================");
        });





        return {
            message,
            data,
            defaultProps,
            handleNodeClick,
            accordionf,

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
            currentTime,
            treeRef1,
            treeRef2,
            setTreeRef


        };
    },
});

app.use(ElementPlus);
app.mount('#app');
