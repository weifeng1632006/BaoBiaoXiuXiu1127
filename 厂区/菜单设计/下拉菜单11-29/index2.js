
const { createApp, ref, onMounted, reactive } = Vue;
//#region 初始化全局变量

// location.reload(true)

//****************************javascript ========================== */
createApp({
    setup() {

        const message="hello"

        const accordionf="true"

         const handleNodeClick = (data) => {
            console.log("我开始点击了------")
    //   console.log(data);
     if (!data.children || data.children.length === 0) {
        // 如果没有子节点，说明是第三级
        console.log('Third level node clicked:', data.label);
        console.log(`output->最后一个节点`)
        // 跳转到目标页面
        // router.push({ path: '/third-level', query: { label: data.label } });

        //  window.open (`https://www.google.com/`, '_blank')
        
        // 获取对应的 URL
        const url = labelToUrlMap[data.label];
        if (url) {
            window.open(url, '_blank');
        } else {
            console.log('没有找到对应的 URL');
        }


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

    const data =ref( [
      {
        label: '厂区-湿法分厂例',

         icon: "Edit", // 使用图标组件
 
        children: [
          {
            label: '磨矿石类',

            
            children: [
              {
                label: '45期球磨报表'

              },
            ],
          },
        ],
      },
      {
        label: '硫酸报表类',
        children: [
          {
            label: '-硫酸一工段',
            children: [
              {
                label: '--硫酸一产出报表',
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
      
      
    };

        


       
    }

    
}).use(ElementPlus).mount('#app')

