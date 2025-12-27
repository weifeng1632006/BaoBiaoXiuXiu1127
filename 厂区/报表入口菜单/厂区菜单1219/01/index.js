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

    "选矿分厂": {
        label: '目录',
        type: 'fileroot',
        id: 10,
        children: [
            {
                label: '选矿分厂统计表',
                type: "file",
                id: 101,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=8f05712624d244a4aacb1b1d723b7751"

            },
            {
                label: '总磨矿量表',
                type: "file",
                id: 102,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=f767ba38bcd64fa09638edbaa55d66b6"

            },
            {
                label: '1、2期半自磨磨矿量表',
                type: "file",
                id: 104,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=03458b6771be41868ebd4ac06b79c02a"

            },
            {
                label: '4、5球磨机磨矿量表',
                type: "file",
                id: 105,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=13fed4184cf34d988a2eb873d78335d1"

            },
             {
                label: '球磨磨矿量表',
                type: "file",
                id: 106,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7706304077a24c5ab25abfa43756c9c2"

            },
            {
                label: '磨浮磨矿量表',
                type: "file",
                id: 107,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=45c31c8c22374114a760b2515f11bf02"

            },

             {
                label: '磨浮材料分配表',
                type: "file",
                id: 108,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=4794dcb0cfbc490dba2e360f97de57db"

            },



            {
                label: '破碎球磨消耗统计（月度）',
                type: "file",
                id: 109,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=db28eaf6aa9748c88ec6a94e5362fa21"

            },
             {
                label: '磨浮压滤消耗统计（月度）',
                type: "file",
                id: 110,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=8384eafc5c8c45c888cf01aa7529b7d2"

            },
        ],
    },

    "湿法分厂": {
        label: '目录',
        type: 'fileroot',
        id: 20,
        children: [
            {
                label: '电解铜产量表',
                type: "file",
                id: 201,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=2e23d3d7f7a7471d9aa35d2df4d35463"

            },
            {
                label: '湿法萃取统计表',
                type: "file",
                id: 202,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=1936b912a0a14910bd32d0a058cc3181"

            },
              {
                label: '湿法电积统计表',
                type: "file",
                id: 203,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=b6d2b760b3264f9a865e265b82e14628"

            },
              {
                label: '浓密报表',
                type: "file",
                id: 204,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=b4c005d6ff1748c796dd979ba4d0e5fc"

            },
             
              {
                label: '铜精矿产量计算表',
                type: "file",
                id: 205,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=96cca17ac9814e8cb0153a21e1c068bd"

            },
           
             {
                label: '湿法分厂消耗统计（月度）',
                type: "file",
                id: 206,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=fb7aaa560f884f9bbd21bf536fac5fd1"

            },
        ],
    },

    "硫酸分厂": {
        label: '目录',
        type: 'fileroot',
        id: 30,
        children: [
            {
                label: '硫酸单耗统计表',
                type: "file",
                id: 301,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=0252e733caf2443a8764c0786cc1faf2"

            },
            {
                label: '硫酸全厂库存表',
                type: "file",
                id: 302,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=bdb02438f3704e4ea2cbf0c2148fde64"

            },
             {
                label: '硫酸工段一生产报表',
                type: "file",
                id: 303,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=d10a9a8696de463bbdb29c6685968b0f"

            },
             {
                label: '硫酸工段一库存表',
                type: "file",
                id: 304,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=cea33775bfd24dcdaeef52a62db53dc4"

            },
        

             {
                label: '硫酸工段二生产报表',
                type: "file",
                id: 305,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=9b4f046886a9417c8d3453c54b2862a7"

            },
            
             {
                label: '硫酸工段二库存表',
                type: "file",
                id: 306,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=98da5d467d0c4f49a9802c4c9ccca1b5"

            },
             
             {
                label: '硫酸工段消耗统计（月度）',
                type: "file",
                id: 306,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=44dcce9a41f241af96cd77ee3e5aadef"

            },
            
        ],
    },

    "发电分厂": {
        label: '目录',
        type: 'fileroot',
        id: 40,
        children: [
            {
                label: '电力报表分类统计',
                type: "file",
                id: 401,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=a51bf19fd1764d748de035641419edef"

            },
            {
                label: '电力成本分析总表',
                type: "file",
                id: 402,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=c8d60900f19349be972b2ecf1f71a46a"

            },

             {
                label: '光伏储能供应统计表',
                type: "file",
                id: 403,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=369caef378f24658bf4288220f51da07"

            },



        ],
    },

    "动力设备分厂": {
        label: '目录',
        type: 'fileroot',
        id: 50,
        children: [
            {
                label: '暂无',
                type: "file",
                id: 11,
                url: ""

            },
          
        ],
    },

    "其他生产报表": {
        label: '目录',
        type: 'fileroot',
        id: 60,
        children: [
            {
                label: '工艺指标完成情况表',
                type: "file",
                id: 601,
                url: "https://www.yunzhijia.com/maco-platform/view/report.do?reportId=3c2ae105f2444eb4a71be2dab2204860"

            },
            {
                label: '轻云填报统计（供参考）',
                type: "file",
                id: 602,
                url: "https://www.yunzhijia.com/connecterp-web-nodejs/report/biDetail/66fe2a38b4ec17000163d76a/2"

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
                "选矿分厂": {
                    "data_name": [treedata['选矿分厂']],
                    'treeref_name': ref({}),
                },

                "湿法分厂": {
                    "data_name": [treedata['湿法分厂']],
                    'treeref_name': ref({}),
                },
                "硫酸分厂": {
                    "data_name": [treedata['硫酸分厂']],
                    'treeref_name': ref({}),
                },

                "发电分厂": {
                    "data_name": [treedata['发电分厂']],
                    'treeref_name': ref({}),
                },

                "动力设备分厂": {
                    "data_name": [treedata['动力设备分厂']],
                    'treeref_name': ref({}),
                },

                "其他生产报表": {
                    "data_name": [treedata['其他生产报表']],
                    'treeref_name': ref({}),

                }



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
            setTreeRef
        };
    },
});

app.use(ElementPlus);
app.mount('#app');
