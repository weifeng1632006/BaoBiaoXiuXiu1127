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


        //function array object ---------------------------------

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
                const url = labelToUrlMap[data.label];
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

        // 定义 label 到 URL 的映射
        const labelToUrlMap = {
            '45期球磨报表': 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=7706304077a24c5ab25abfa43756c9c2',
            '硫酸一产出报表': 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=d10a9a8696de463bbdb29c6685968b0f',
            'Level three 2-2-1': 'https://www.example.com/page3',
            'Level three 3-1-1': 'https://www.example.com/page4',
            'Level three 3-2-1': 'https://www.example.com/page5',
        };

        const data = ref([
            {
                label: '厂区-湿法分厂例',
                type: 'folder',
                id:1,
                children: [
                    {
                        type: 'folder',
                        id:2,

                         label: '厂区-湿法分',
                       
                        children: [
                            {
                                label: '45期球磨报表',
                                type: 'file',
                                 id:3,
                            },
                        ],
                    },
                ],
            },
            {
                label: '硫酸报表类',
                type: 'folder',
                 id:4,
                children: [
                    {
                        type: 'folder',
                        id:5,
                        type: 'folder',
                        children: [
                            {
                                label: '--硫酸一产出报表',
                                type: 'file',
                                 id:6,
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

        //*************************************搜索用的函数***************** */



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
            
            const value=true
            console.log(`output->value`,value)

            console.log(`output->treeRef.value`,treeRef.value)
            if (!treeRef.value) return;

            console.log(`output->----------------`,)

            const allNodes = treeRef.value.store._getAllNodes();

            if (value) {
                // 展开所有节点
                allNodes.forEach(node => {
                    node.expanded = true;
                });
                expandedKeys.value = allNodes.map(node => node.data.id);
                console.log(`output->expandedKeys.value`,expandedKeys.value)
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
            
            const value=false
            console.log(`output->value`,value)

            console.log(`output->treeRef.value`,treeRef.value)
            if (!treeRef.value) return;

            console.log(`output->----------------`,)

            const allNodes = treeRef.value.store._getAllNodes();

            if (value) {
                // 展开所有节点
                allNodes.forEach(node => {
                    node.expanded = true;
                });
                expandedKeys.value = allNodes.map(node => node.data.id);
                console.log(`output->expandedKeys.value`,expandedKeys.value)
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
