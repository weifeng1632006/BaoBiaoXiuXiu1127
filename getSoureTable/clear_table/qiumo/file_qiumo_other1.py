from clear_table.base.file_table_clear import ClearTableData


class Qiumodata1(ClearTableData):


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
        print(df)

        print(df.columns)

        df['一二期干吨']=df['白班折干量']+df['夜班折干量']
        df['一二期折铜'] = df['白班金属铜'] + df['夜班金属铜']
        df['一二期氧化含铜量'] = df['一二期折铜'] / df['一二期干吨']


        # print(pivot_df)

        # print(df.loc[df['格式日期']=="2025-11-01"])

        return df
    def df_mokuang(self):
        df = self._set_date(self.df)

        df=df[['格式日期', '白班折干量', '夜班折干量', '白班金属铜', '夜班金属铜', '白班含铜量',  '夜班含铜量', ]]

        df["白班含铜量"]=df['白班金属铜']/df['白班折干量']
        df["夜班含铜量"] = df['夜班金属铜'] / df['夜班折干量']

        df=df.rename(columns={
            "白班折干量":"白班折干量12",
            "夜班折干量": "夜班折干量12",
            "白班金属铜": "白班金属铜12",
            "夜班金属铜": "夜班金属铜12",
            "白班含铜量": "白班含铜量12",
            "夜班含铜量": "夜班含铜量12",

        })

        df=df.fillna(0)
        # print(df)
        return df






    def make_df(self):
        df = self._set_date(self.df)
        df = self.df_select(df)
        df = self.df_clear(df)

        return df

if __name__ == '__main__':

    qs=Qiumodata1("/original_table/table",'半自磨矿量.csv')
    df=qs.df_mokuang()
    print(df.columns)
