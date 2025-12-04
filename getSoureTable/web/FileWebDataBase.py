import os
import pandas as pd
from base.baseClass import BaseClass
from base.config import WEBDATA_FORM_URL, WEBDATA_FORM_HEADERS, PROJECT_BASE_DIR
from web.WebPostDict import list_web_post
import requests


class  WebDataBase(BaseClass):
    def __init__(self,dict_name,tofiledir="./"):
        super().__init__()
        self.name=str(list_web_post[dict_name]["name"])

        self.dict_name=dict_name

        self.table_name=self.name

        self.tofiledir=tofiledir



    def get_df(self):
        try:
            df=self._get_web_data()
            df=self._clear_df(df)

            print(f"取出{self.name}数据成功！")
            return df
        except Exception as err:
            print(f"取出{self.name} 网页数据后清洗 失败",err)

            return pd.DataFrame()


    def out_file(self,):

        try:
            df = self.get_df()

            # print(df)
            current_path = os.getcwd()
            print("当前工作目录:", current_path)
            filedir1=self.tofiledir
            filedir=os.path.join(PROJECT_BASE_DIR+filedir1, self.table_name + ".csv")

            print(filedir)
            df.to_csv(filedir)
            print(f"{self.table_name}.csv 导出df文件到{self.tofiledir}成功!")
            print("")

        except Exception as e:

            print(f"Fail**************{self.name} 导出df文件失败!",e)


    def clear_df(self, df):

        return df


    def _get_web_data(self,):
        """
        作用：取出网页上的原始数据
        """
        try:
            HTML = requests.post(url=WEBDATA_FORM_URL, headers=WEBDATA_FORM_HEADERS, data=list_web_post[self.dict_name]["post"])
            htmltext = HTML.json()
            datadict = htmltext['data']
            datanumber = datadict['data']
            df = pd.DataFrame(datanumber)
            return df

        except Exception as err:

            print(f"取出{self.name} 网页数据失败",err)

            return pd.DataFrame()

    def _clear_df(self,df):

        try:
            df=self.clear_df(df)
            return df
        except Exception as err :
            messages = f"df 清洗 {self.name} 失败:" + str(err)
            print(messages)

            return pd.DataFrame()



if __name__ == '__main__':


    wd=WebDataBase('电解铜周报')

    print(wd.get_df())