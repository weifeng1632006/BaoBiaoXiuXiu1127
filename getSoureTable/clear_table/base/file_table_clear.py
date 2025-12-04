import os
import pandas as pd
from base.baseClass import BaseClass
from base.baseFunction import date_df, date_df_bans
from base.config import *

class ClearTableData(BaseClass):

    def __init__(self,sourcedir,filename,othercls=""):

        super().__init__()

        self.filedir=filename

        self.sour_filedir=sourcedir

        self.othercls=othercls

        self.fdir=os.path.join(PROJECT_BASE_DIR+sourcedir, filename)

        print(f"{self.fdir=}")

        self.df = pd.read_csv(self.fdir)
        #===================以下为变量

        self.datename="数据日期"

        self.ifbans=True




    def df_select(self,df):
        """
        这里是需要做定制
        :param df:
        :return:
        """


        print("select over")

        return df

    def df_clear(self,df):
        """
        这里需要定制
        :param df:
        :return:
        """

        return df


    def _set_date(self,df):

        df[self.datename] = pd.to_datetime(df[self.datename])
        # 使用 .dt.date 将 '数据日期' 列转换为仅包含日期的格式
        df['格式日期'] = df[self.datename].dt.date

        df['格式日期'] = pd.to_datetime(df['格式日期'])

        df = self._set_date_bans(df)

        return df


    def _set_date_bans(self,df):

        if self.ifbans:
            df_date = date_df_bans()
            df1 = df_date.merge(df, on=["格式日期", '班次'], how='left')
            df1.fillna(0, inplace=True)

        else:
            df_date = date_df()
            df1 = df_date.merge(df, on=["格式日期"], how='left')
            df1=df1.fillna(0)

        # print(df1)

        return df1



    def make_df(self):
        df = self._set_date(self.df)
        df = self.df_select(df)
        df = self.df_clear(df)

        return df


if __name__ == '__main__':
    mf = ClearTableData("/original_table/table", '磨浮车间原表.csv')

    print(mf.make_df())


