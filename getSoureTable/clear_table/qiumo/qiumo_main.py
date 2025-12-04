import os

import pandas as pd

from base.config import sourcedata_dir_factory
from clear_table.qiumo.file_jingtong import Jingtong
from clear_table.qiumo.file_mofutable import MofuSizhong
from clear_table.qiumo.file_mofutable2 import MofuTable
from clear_table.qiumo.file_qiumo_other1 import Qiumodata1
from clear_table.qiumo.file_qiumo_other2 import Qiumodata2
from clear_table.qiumo.file_qiumo_sizhong import QiumoSizhong

def MokuanTotal():

       try:
              #第一张是磨浮湿吨
              df_mf = MofuSizhong("/original_table/table", '磨浮车间原表.csv').make_df()

              #第二个数据 浮磨报表其他数据
              df_mf2=MofuTable("/original_table/table",'磨浮磨矿.csv').make_df()

              df_mk=pd.merge(df_mf,df_mf2[["格式日期","三期干吨","三期氧化含铜量","三期折铜"]],on="格式日期",how='left')

              #第三个数据，一二四五期的湿吨

              df_sizhong=QiumoSizhong("/original_table/table",'球磨报表原表.csv').make_df()

              df_mk=pd.merge(df_mk,df_sizhong[["格式日期","一二期湿吨","四五期湿吨",]],on="格式日期",how='left',)
              #第四张表，一二期的数据
              df_qm12=Qiumodata1("/original_table/table",'半自磨矿量.csv').make_df()
              df_mk=pd.merge(df_mk,df_qm12[["格式日期","一二期干吨","一二期氧化含铜量","一二期折铜"]],on="格式日期",how='left',)
              #第五张表，四五期的数据
              df_qm45=Qiumodata2("/original_table/table",'四五期磨矿量.csv').make_df()
              df_mk=pd.merge(df_mk,df_qm45[["格式日期","四五期干吨","四五期氧化含铜量","四五期折铜"]],on="格式日期",how='left',)


              #第6张表，精铜的数据
              df_jt=Jingtong("/original_table/table",'铜精矿计算表.csv').make_df()
              df_mk=pd.merge(df_mk,df_jt[["格式日期","合计精铜湿吨","合计精铜干吨"]],on="格式日期",how='left',)
              #做合计

              df_mk['合计湿重']=df_mk['三期湿重']+df_mk['一二期湿吨']+df_mk['四五期湿吨']
              df_mk['合计干吨']=df_mk['三期干吨']+df_mk['一二期干吨']+df_mk['四五期干吨']
              df_mk['合计折铜']=df_mk['三期折铜']+df_mk['一二期折铜']+df_mk['四五期折铜']
              df_mk['平均氧化含铜']=df_mk['合计折铜']/df_mk['合计干吨']

              #做铜精矿

              #暂时先空着，后续左滔来再补上

              # col_sort=['格式日期', '三期湿重', '三期干吨', '三期氧化含铜量', '三期折铜', '一二期湿吨', '一二期干吨',
              #        '一二期氧化含铜量', '一二期折铜',  '四五期湿吨','四五期干吨', '四五期氧化含铜量', '四五期折铜',
              #        '合计湿重', '合计干吨','平均氧化含铜', '合计折铜','合计精铜湿吨', '合计精铜干吨',]
              #
              # df_mk=df_mk[col_sort]
              #========================最后查看
              # print(df_mk.loc[df_mk['格式日期']>="2025-11-01"])
              #
              # print(df_mk.columns)

              filedir = os.path.join(sourcedata_dir_factory, "总磨矿量数据.csv")

              df_mk.to_csv(filedir)

              print("总磨矿量数据 获取成功！")

       except Exception as err:

              print("MokuanTotal err:",err)


if __name__ == '__main__':

    pass