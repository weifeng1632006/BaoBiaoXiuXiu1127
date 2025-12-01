const { createApp, ref, onMounted, reactive } = Vue;
const { ElTree, ElIcon, ElTag } = ElementPlus;
const { Folder, Document, CircleCheck, CircleClose, Warning } = ElementPlusIconsVue;

const app = createApp({
    components: {
        ElTree,
        ElIcon,
        ElTag,
        Folder,
        Document,
        CircleCheck,
        CircleClose,
        Warning
    },
    setup() {
        const message = "hello";
        const accordionf = "true";

        const treeRef = ref(null); // 引用 el-tree 组件

        const handleNodeClick = (data, node, component) => {
            console.log("我开始点击了------");
            console.log(data);
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
                treeRef.value.toggleNodeExpansion(node.data);
            }
        };

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

        const defaultProps = {
            children: 'children',
            label: 'label',
        };

        return {
            message,
            data,
            defaultProps,
            handleNodeClick,
            accordionf,
            treeRef, // 导出 treeRef
        };
    }
});

app.use(ElementPlus);
app.mount('#app');
