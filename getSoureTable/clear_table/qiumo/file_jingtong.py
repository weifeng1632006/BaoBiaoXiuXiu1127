from clear_table.base.file_table_clear import ClearTableData


class Jingtong(ClearTableData):


    def __init__(self,sourcedir,filename,othercls=""):

        super().__init__(sourcedir,filename,othercls)

        # ===================以下为变量

        self.datename = "取数日期"

        self.ifbans = False

    def df_select(self, df):
        """
        这里是需要做定制
        :param df:
        :return:
        """


        return df

    def df_clear(self, df):
        """
        这里需要定制
        :param df:
        :return:
        """
        # print(df)

        df['合计精铜湿吨']=df['精铜原矿数量']
        df['合计精铜干吨'] = df['精铜矿折干']



        # print(pivot_df)

        # print(df.loc[df['格式日期']=="2025-11-01"])

        return df

if __name__ == '__main__':

    qs=Jingtong("/original_table/table",'铜精矿计算表.csv')
    print(qs.make_df())
