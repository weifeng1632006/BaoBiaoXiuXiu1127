
const { createApp, ref, onMounted, reactive } = Vue;
//#region 初始化全局变量

console.warn = function () { };
//web post data

window.test_post = {
    'content': 'eyJkZWJ1ZyI6ImZhbHNlIiwiYXBwSWQiOiI5Njc3OWM2YjM0NmM5MzIwOGQ4YWU3OWNmMTQ3ODI1YSIsInJlcG9ydElkIjoiNjdlMzQ2NzBiZGNlNDEzMDg3ZTZjODBmMGMwOWQxYzkiLCJ0YWJsZUtleSI6Iuehq+mFuOWRqOaKpSIsImRpbWVuc2lvbnMiOlsi5Y+W5pWw5pel5pyfIl0sIm1lYXN1cmVzIjpbIuacrOaciOWkqeaVsCIsIuehq+mFuOS4gOS6p+WHuueZveePrTIiLCLnoavphbjkuIDkuqflh7rlpJznj60yIiwi56Gr6YW45LiA56Gr56O655m954+tMiIsIuehq+mFuOS4gOehq+ejuuWknOePrTIiLCLnoavphbjkuozkuqflh7rlpJznj60yIiwi56Gr6YW45LqM56Gr56O655m954+tMiIsIuehq+mFuOS6jOehq+ejuuWknOePrTIiLCLnoavphbjkuIDnlKjnlLXnmb3nj60yIiwi56Gr6YW45LiA55So55S15aSc54+tMiIsIuehq+mFuOS6jOeUqOeUteeZveePrTIiLCLnoavphbjkuoznlKjnlLXlpJznj60yIiwi6Ieq5Y+R55S16YePMiIsIuehq+mFuOS4gOeZveePreajgOa1i+aAu+aVsDIiLCLnoavphbjkuIDlpJznj63mo4DmtYvmgLvmlbAyIiwi56Gr6YW45LiA55m954+t5qOA5rWL5ZCI5qC8MiIsIuehq+mFuOS4gOWknOePreajgOa1i+WQiOagvDIiLCLnoavphbjkuozkuqflh7rnmb3nj60yIiwi56Gr6YW45LqM55m954+t5qOA5rWL5oC75pWwMiIsIuehq+mFuOS6jOWknOePreajgOa1i+aAu+aVsDIiLCLnoavphbjkuoznmb3nj63mo4DmtYvlkIjmoLwyIiwi56Gr6YW45LqM5aSc54+t5qOA5rWL5ZCI5qC8MiIsIuihjOe0r+iuoeaVsCJdLCJwYWdlU3RhcnQiOjAsInBhZ2VMZW5ndGgiOi0xLCJjaGFydERpbWVuc2lvbkNvdW50IjoxLCJxdWVyeUNvbmRpdGlvbkRpbWVuc2lvbnMiOnRydWUsInBhcmFtS2V5cyI6WyLlj5bmlbDml6XmnJ8iXSwicGFyYW1WYWx1ZXMiOlsiMjAyNS0wMy0yNiJdLCJmaWx0ZXJLZXlzIjpbXSwiZmlsdGVyVmFsdWVzIjpbXSwiZGltRmlsdGVyS2V5cyI6W10sImRpbUZpbHRlclZhbHVlcyI6W10sImZpbHRlckxpbWl0IjowLCJzb3J0S2V5cyI6W10sInNvcnRWYWx1ZXMiOltdLCJzb3J0SGVqaVNxbEV4cCI6bnVsbCwiZnVuY3Rpb25LZXlzIjpbXSwiZnVuY3Rpb25WYWx1ZXMiOltdLCJzdW1LZXlzIjpbXSwiYmV0d2VlbktleXMiOltdLCJiZXR3ZWVuVmFsdWVzIjpbXSwiaW5LZXlzIjpbXSwiaW5WYWx1ZXMiOltdLCJkaW1Tb3J0U3FsRXhwIjpudWxsLCJyYW5nZUNlbnRlciI6bnVsbH0=',
    'reportId': '67e34670bdce413087e6c80f0c09d1c9'
};


window.datatest=""
//#endregion 初始化全局变量


// #region python code------------------------------------------------

const def_funcs = `
async def get_web_df(post):
      
        print("调用func  get_df ================================")

         # 从 globalThis 中访问 Rdata 对象

        data=await js.getdata(post)

        data=data.to_py()

        #data = js.testdata.to_py()

        df = pd.DataFrame(data)

        return df

`


const py_TongZhougBao = `

import json
import js 
import pandas as pd

class TongZhougBao:
  
    def __init__(self):

        print("TongZhougBao init")

    async def get_df(self):
        
        df=await get_web_df(js.test_post)

        print("tongzhougbao getdf===============")

        #print(df)

        return df
       
`

// window.sdata = scope



const python_main = `
    import js
    from js import document, console, JSON
    tb=TongZhougBao()
    df=await tb.get_df()

    df_json = df.to_json(orient='records', force_ascii=False)
    js.datatest=df_json




`
// #endregion python main 

// location.reload(true)




//****************************javascript ========================== */
createApp({
    setup() {

        const message="hello"
        const datatest_f=ref("")
        // main---------所有程序的入口在这里

        const _init_ = async () => { //这里是初始化 方法
            await runpy(def_funcs)
            await runpy(py_TongZhougBao)
        };

        const myname=ref("")

        const Main = async () => { //主函数入口

            // await runpy(python_main)//这里就相当于用python把变量传递给了js的变量中

            // //后面可以直接使用js变量了
            // datatest_f.value=window.datatest
            // console.log(`datatest->`,window.datatest)

         



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

        async function getGitHubFileContent(filePath) {
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

                console.log('获取的文件内容:', fileContent);
                return fileContent;

            } catch (error) {
                console.error('获取文件失败:', error);
                throw error;
            }
        }


        window.getdata = async (post, return_data = null) => {
            try {
                const url = "https://www.yunzhijia.com/maco-platform/view/report/metadata/modelquery2.do";
                const headers = {
                    'Ajax-method': 'AjaxMethodFactory',
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept-Language': 'zh-CN,zh;q=0.9',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };

                const response = await axios.post(url, post, { headers });
                const datas = response.data.data.data; // 添加 const 声明
                // console.log(`response.data.data.data->`, datas);

                console.log(`成功取出WEB 数据=======================`);

                return_data = datas

                return datas; // 明确返回数据
            } catch (error) {
                if (error.response) {
                    console.error('服务器返回错误:', error.response.status, error.response.data);
                } else if (error.request) {
                    console.error('未收到响应:', error.request);
                } else {
                    console.error('请求设置错误:', error.message);
                }
                throw error; // 重新抛出错误以便上层捕获
            }
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
                            // await getdata() //请求数据
                            console.log('2.Pyodide 初始化完成');
                            await _init_();
                            console.log('3.init_ 代码执行完成');
                            console.log('4.onMounted over *************************************************');

                            //程序入口在此处=====================
                            console.log('5.Main begin *************************************************  ');
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



        return { message,datatest_f,myname};
    }

    
}).use(ElementPlus).mount('#app')

