import os

import pandas as pd

from base.config import PROJECT_BASE_DIR
from web.FileWebDataBase import WebDataBase


def getHuaYan():
    """
    :return:
    """
    """
    1.取单个报表
    2.拼接报表
    3.导出报表
    
    """

    names=["厂区化验原表90天内","厂区化验原表90天2","厂区化验原表90天3","厂区化验原表90天4","厂区化验原表90天5","厂区化验原表90天6","厂区化验原表90天7",]

    df=pd.DataFrame()
    for name in names:
        try:
            df1=WebDataBase(name, "/original_table/table").get_df()

            df=pd.concat([df,df1])
        except Exception as err:

            print("厂区化验原表90天内 err",err)
    try:
        filedir=os.path.join(PROJECT_BASE_DIR+"/original_table/table","厂区化验报表拼接两年内.csv")
        df.to_csv(filedir)

    except Exception as err:

        print(err)








if __name__ == '__main__':


    getHuaYan()