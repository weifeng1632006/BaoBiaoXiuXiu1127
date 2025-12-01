
const { createApp, ref, onMounted, reactive } = Vue;
//#region 初始化全局变量





//****************************javascript ========================== */
createApp({
    setup() {

   
        const myname=ref("")

        const Main = async () => { //主函数入口

            // await runpy(python_main)//这里就相当于用python把变量传递给了js的变量中

            // //后面可以直接使用js变量了
            // datatest_f.value=window.datatest
            // console.log(`datatest->`,window.datatest)
            const urls="https://raw.githubusercontent.com/weifeng1632006/BaoBiaoXiuXiu1127/refs/heads/main/%E7%94%A8python%2Bjs/12-1/python_code/testpy.py?token=GHSAT0AAAAAADQLM7QTOCAFP4VRJZPVM3KQ2JNJNUA"
            await runpy(await (await fetch(urls)).text())
            console.log(`Main run over ===================->  `,)

           
            const pythonGlobals = window.pyodide.globals;

             const names_js = pythonGlobals.get('name');

             console.log(`output->names_js`,names_js)

             myname.value=names_js



        };

        //************************************************************************************************ */

        //#region 初始化 Pyodide================================================================================

        window.pyodide = null;
        const initPyodide = async () => {
            //作用，初化 pyodide 环境 导入numpy pandas 
            const output = ref('');
            const error = ref('');
            const loading = ref(true);

            window.pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
                stdout: (msg) => {
                    output.value += msg;
                    console.log(msg);  // 关键：同步到控制台
                },
                stderr: (msg) => {
                    error.value += msg;
                    console.error(msg);
                }
            });
            await window.pyodide.loadPackage(['numpy', 'pandas',]);


            // 初始化常用函数
            // 定义 Python 方法
            const myJsNamespace = {
                greet: function (name) {
                    return `Hello, ${name}!`;
                },
                version: "1.0"
            };

            // 3. 在 Pyodide 加载完成后注册模块
            window.pyodide.registerJsModule("my_js_namespace", myJsNamespace);
            // 注册JS模块

            loading.value = false;
        };

        const runpy = async (python_code) => {

            await window.pyodide.runPythonAsync(
                python_code
            )

        }
        onMounted(async () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

            const initPyodideAndRun = () => {
                return new Promise((resolve, reject) => {
                    script.onload = async () => {
                        try {
                            console.log('1.Pyodide 加载完成');
                            await initPyodide(); // 假设 initPyodide 返回 Promise
                         
                            console.log('2.Pyodide 初始化完成');
                         
                            //程序入口在此处=====================
                            console.log('3.Main begin *************************************************  ');
                            await Main();
                            resolve();
                        } catch (error) {
                            console.error('初始化或执行失败:', error);
                            reject(error);
                        }
                    };
                    script.onerror = () => {
                        console.error('Pyodide 加载失败');
                        reject(new Error('Failed to load Pyodide'));
                    };
                    document.head.appendChild(script);
                   
                });
            };

            try {
                await initPyodideAndRun();
            } catch (error) {
                console.error('初始化流程失败:', error);
            }
        });

        //#endregion 初始化 Pyodide================================================================================over


        // 抛出 公用字段



        return { myname};
    }

    
}).use(ElementPlus).mount('#app')

