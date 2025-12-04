from clear_table.base.file_table_clear import ClearTableData


class QiumoSizhong(ClearTableData):


    def __init__(self,sourcedir,filename,othercls=""):

        super().__init__(sourcedir,filename,othercls)

        # ===================以下为变量

        self.datename = "数据日期"

        self.ifbans = True

    def df_select(self, df):
        """
        这里是需要做定制
        :param df:
        :return:
        """
        df = df.loc[df['明细_项目'].isin(["1期半自磨磨矿湿重","2期半自磨磨矿湿重","4号磨机磨矿湿重","5号磨机磨矿湿重"])]
        sel_col = ["格式日期", "班次","明细_项目", "明细_数量", ]
        df = df[sel_col]
        print("select over")

        return df

    def df_clear(self, df):
        """
        这里需要定制
        :param df:
        :return:
        """
        # print(df)

        df = df.groupby(['格式日期','明细_项目'])['明细_数量'].sum().reset_index()

        df = df.pivot(index='格式日期', columns='明细_项目', values='明细_数量').fillna(0)
        # 重置索引，将日期变成普通列
        df.reset_index(inplace=True)

        df['一二期湿吨']=df['1期半自磨磨矿湿重']+df['2期半自磨磨矿湿重']
        df['四五期湿吨'] = df['4号磨机磨矿湿重'] + df['5号磨机磨矿湿重']


        # print(pivot_df)

        # print(df.loc[df['格式日期']=="2025-11-01"])

        return df

if __name__ == '__main__':

    qs=QiumoSizhong("/original_table/table",'球磨报表原表.csv')
    print(qs.make_df())
