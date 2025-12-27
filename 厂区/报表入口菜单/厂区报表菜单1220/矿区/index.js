const { createApp, ref, reactive, onMounted, nextTick, defineComponent } = Vue;

const { ElTree, ElIcon, ElInput, ElForm, ElFormItem, ElRadioGroup, ElRadio, ElSwitch, ElTag } = ElementPlus;

const { Folder, Document, CircleCheck, CircleClose, Warning, Search, Setting, FolderOpened, InfoFilled, DCaret } = ElementPlusIconsVue;

// 添加事件监听器来捕获网络错误
// window.addEventListener('error', function (event) {
//     if (event.message.includes('404')) {
//         console.warn('404 Error ignored:', event.message);
//         event.preventDefault(); // 阻止默认的错误处理
//     }
// }, true);



//=======================================================================


const treedata =
{

    "矿区生产消耗": {
        label: '目录',
        type: 'fileroot',
        id: 10,
        children: [
            {
                label: '矿山排土表',
                type: "file",
                id: 101,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=8b9b9421de454163ad432bde587c2544"

            },
            {
                label: '矿山运矿统计表',
                type: "file",
                id: 102,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=08c2d4a4b4714664895e373380d02a6b"

            },
            {
                label: '矿山拉矿出车率统计',
                type: "file",
                id: 104,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7a3fa1ba2dda48b7a846e2aa76e7b16d"

            },
            {
                label: '矿山加油表统计',
                type: "file",
                id: 105,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7d9ac1280c7d43fda7e3cbee97ac0c2b"

            },
             {
                label: '矿山拉石渣统计',
                type: "file",
                id: 106,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=4f8c3e1146614babb67128e2ad2075be"

            },
            {
                label: '矿山矿石数据统计',
                type: "file",
                id: 107,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=4840f45d4fee40138b84318fcfcf1592"

            },

             {
                label: '矿山矿卡排土统计（月度）',
                type: "file",
                id: 108,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=d62cdbb9624246eb978a994da8067186"

            },


        ],
    },

    "运矿车队数据": {
        label: '目录',
        type: 'fileroot',
        id: 20,
        children: [
            {
                label: '运矿车辆运行周报',
                type: "file",
                id: 201,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=16ecda72412644f2bc7230cc91cdc0df"

            },
            {
                label: '运矿车辆轮胎消耗',
                type: "file",
                id: 202,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=93229157065f4c79a4a229ad386f1a26"

            },
              {
                label: '运矿材料消耗',
                type: "file",
                id: 203,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=9e606d44cb0144f99e416ae17fb80887"

            },
              {
                label: '运矿车辆运营统计（月度）',
                type: "file",
                id: 204,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=e1e847111e5e40d79a1fcef3e321e338"

            },
             
              {
                label: '运矿拉矿月报',
                type: "file",
                id: 205,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=3ef2fef1394b4b44bbacf02c078f0a72"

            },
           
            
        ],
    },

    "勘探数据": {
        label: '目录',
        type: 'fileroot',
        id: 30,
        children: [
            {
                label: '勘探统计表',
                type: "file",
                id: 301,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=ee05b7b2fb2740c38fc21cdb5f0c801c"

            },
            
         
            
        ],
    },

    "养路队数据": {
        label: '目录',
        type: 'fileroot',
        id: 40,
        children: [
            {
                label: '养路队消耗统计',
                type: "file",
                id: 401,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=4cd03d188fe14525a77d8dbedfd70e0f"

            },
            
        

        ],
    },

    

    "其他矿山报表": {
        label: '目录',
        type: 'fileroot',
        id: 60,
        children: [
            {
                label: '暂无',
                type: "file",
                id: 601,
                url: ""

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
        "dcarets": DCaret,

    },
    setup() {

        //function array object ---------------------------------

        //#region 定义标签到URL的映射，仅需要需要这里

        const data = ref(
            {
                "矿区生产消耗": {
                    "data_name": [treedata['矿区生产消耗']],
                    'treeref_name': ref({}),
                },

                "运矿车队数据": {
                    "data_name": [treedata['运矿车队数据']],
                    'treeref_name': ref({}),
                },
                "勘探数据": {
                    "data_name": [treedata['勘探数据']],
                    'treeref_name': ref({}),
                },

                "养路队数据": {
                    "data_name": [treedata['养路队数据']],
                    'treeref_name': ref({}),
                },

                "其他矿山报表": {
                    "data_name": [treedata['其他矿山报表']],
                    'treeref_name': ref({}),
                },


            }
        );


        const currentTime = ref(new Date())



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
                if (el) {
                    console.log("el no null-----------------");
                    el.toJSON = function () {
                        const cache = [];
                        return JSON.stringify(this, function (key, value) {
                            if (typeof value === 'object' && value !== null) {
                                if (cache.indexOf(value) !== -1) {
                                    return null; // 或者返回其他标识符
                                }
                                cache.push(value);
                            }
                            return value;
                        });
                    };
                    data.value[key].treeref_name.value = el;
                }
            };
        };

        // 在 index.js 的 setup() 函数内添加：

const toggleTreeCollapse = (key) => {
    // 获取对应分厂的树组件实例
    const treeInstance = data.value[key].treeref_name.value;
    if (treeInstance) {
        // 获取该树的第一个根节点（即分厂节点）
        const rootNode = treeInstance.store.root.childNodes[0];
        if (rootNode) {
            // 切换状态：如果当前是展开的则折叠，反之亦然
            const targetState = !rootNode.expanded;
            
            // 递归设置所有子节点的展开状态
            const traverseNodes = (node) => {
                node.expanded = targetState;
                if (node.childNodes) {
                    node.childNodes.forEach(child => traverseNodes(child));
                }
            };
            
            traverseNodes(rootNode);
        }
    }
};



        onMounted(() => {
            updateTime()
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
            currentTime,
            setTreeRef,
            toggleTreeCollapse
        };
    },
});

app.use(ElementPlus);
app.mount('#app');
