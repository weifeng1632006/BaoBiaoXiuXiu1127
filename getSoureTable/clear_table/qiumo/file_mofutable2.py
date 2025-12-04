from clear_table.base.file_table_clear import ClearTableData


class MofuTable(ClearTableData):


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

        print("select over")

        return df

    def df_clear(self, df):
        """
        这里需要定制
        :param df:
        :return:
        """
        # print(df.info())

        df['三期干吨']=df['白班折干']+df['夜班折干']
        df['三期氧化含铜量']=(df['白班氧化铜折铜']+df['夜班氧化铜折铜'])/df['三期干吨']
        df['三期折铜']=df['电解铜矿']


        return df


    def df_mokuang(self):
        df = self._set_date(self.df)

        print(df.columns)

        df=df[['格式日期', '白班氧化铜折铜',  '夜班折干',
       '白班氧化铜', '夜班氧化铜折铜',  '夜班氧化铜', '白班折干', ]]

        df["白班氧化铜"]=df['白班氧化铜折铜']/df['白班折干']
        df["夜班氧化铜"] = df['夜班氧化铜折铜'] / df['夜班折干']

        df=df.rename(columns={
            "白班折干":"白班折干3",
            "夜班折干": "夜班折干3",
            "白班氧化铜折铜": "白班氧化铜折铜3",
            "夜班氧化铜折铜": "夜班氧化铜折铜3",
            "白班氧化铜": "白班氧化铜3",
            "夜班氧化铜": "夜班氧化铜3",
        })

        df=df.fillna(0)
        # print(df)
        return df


if __name__ == '__main__':


    mf=MofuTable("/original_table/table",'磨浮磨矿.csv')

    print(mf.df_mokuang().columns)

    print(mf.df_mokuang())
