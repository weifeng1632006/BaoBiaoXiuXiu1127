import os.path

import pandas as pd

from base.config import *
from clear_table.qiumo.file_jingtong import Jingtong
from clear_table.qiumo.file_mofutable import MofuSizhong
from clear_table.qiumo.file_mofutable2 import MofuTable
from clear_table.qiumo.file_qiumo_other1 import Qiumodata1
from clear_table.qiumo.file_qiumo_other2 import Qiumodata2
from clear_table.qiumo.file_qiumo_sizhong import QiumoSizhong
def Xuankuang_fenchang():
    #第一张是45期磨矿表
    try:
        df_xk=Qiumodata2("/original_table/table",'四五期磨矿量.csv').df_mokuang()
        #拼接第二张
        df2=Qiumodata1("/original_table/table",'半自磨矿量.csv').df_mokuang()

        df_xk=pd.merge(df_xk,df2,on="格式日期",how='left',)

        #3期磨浮
        df3=MofuTable("/original_table/table",'磨浮磨矿.csv').df_mokuang()

        df_xk=pd.merge(df_xk,df3,on="格式日期",how='left',)
        #合计

        df_xk['白班折干']=df_xk["白班折干量45"]+df_xk["白班折干量12"]+df_xk["白班折干3"]
        df_xk['白班金属铜']=df_xk["白班金属铜45"]+df_xk["白班金属铜12"]+df_xk["白班氧化铜折铜3"]
        df_xk['白班平均氧化铜']=df_xk['白班金属铜']/df_xk['白班折干']


        df_xk['夜班折干']=df_xk["夜班折干量45"]+df_xk["夜班折干量12"]+df_xk["夜班折干3"]
        df_xk['夜班金属铜']=df_xk["夜班金属铜45"]+df_xk["夜班金属铜12"]+df_xk["夜班氧化铜折铜3"]
        df_xk['夜班平均氧化铜']=df_xk['夜班金属铜']/df_xk['夜班折干']

        #当天

        df_xk["当天折干"]=df_xk['白班折干']+df_xk['夜班折干']
        df_xk["当天金属铜"]=df_xk['白班金属铜']+df_xk['夜班金属铜']
        df_xk['当天平均氧化铜']=df_xk['当天金属铜']/df_xk['当天折干']

        #========================最后查看

        # df_last=df_xk.loc[df_xk['格式日期']>="2025-11-01"]
        # print(df_last)
        #
        # print(df_last.columns)

        #====================导出文件到指到目录



        filedir=os.path.join(sourcedata_dir_factory,"选矿分厂数据.csv")

        df_xk.to_csv(filedir)

        print("选矿分厂数据 获取成功！")

    except Exception as err:

        print("xuankuang_fenchang err",err)

if __name__ == '__main__':


    pass