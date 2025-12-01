
const { createApp, ref, onMounted, reactive } = Vue;







createApp({
    setup() {

        const message = ref('Hello Vue 3 + ElementPlus');
        const pycode=`
        print("Hello, world!")
        
        `

      

       const Main = async () => { //主函数入口

             

            const pycdoes=await getGitHubFileContent("pythoncode/testpy1201/testpy.py")

            await runpy(pycdoes)

             const pycdoes2=await getGitHubFileContent("pythoncode/testpy1201/testpy2.py")

            await runpy(pycdoes2)


            //取出py文件里的变量
            const pythonGlobals = window.pyodide.globals;
            const names_js = pythonGlobals.get('name');
            const myname=pythonGlobals.get('myname1');
            console.log(`output->names_js`,names_js)
            console.log(`output->myname`,myname)

        
        };


//********************************************************设置pyodide环境********** */
//#region 导入pyodide ,配置pyodede 程序在Main方法里

    async function getGitHubFileContent(filePath) {//取出github文件内容
            const username = 'weifeng1632006';
            const repo = 'BaoBiaoXiuXiu1127';
            const branch = 'main';
            // const filePath = 'pythoncode/testpy1201/testpy.py';

            const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}?ref=${branch}`;

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`API请求失败: ${response.status}`);
                }

                const data = await response.json();

                // GitHub API返回的内容是Base64编码的
                const fileContent = atob(data.content);

                // console.log('获取的文件内容:', fileContent);
                return fileContent;

            } catch (error) {
                console.error('获取文件失败:', error);
                throw error;
            }
        }
      const runpy = async (python_code) => {

            await window.pyodide.runPythonAsync(
                python_code
            )

        }
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

       

        onMounted(async () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

            const initPyodideAndRun = () => {
                return new Promise((resolve, reject) => {
                    script.onload = async () => {
                        try {
                            console.log('1.Pyodide 加载完成');
                            await initPyodide(); // 假设 initPyodide 返回 Promise
                            // await getdata() //请求数据
                            console.log('2.Pyodide 初始化完成');

                            //main

                            await Main()

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
//#endregion=================





        return { message, };
    }


}).use(ElementPlus).mount('#app')

