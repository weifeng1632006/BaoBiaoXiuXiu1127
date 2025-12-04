from clear_table.base.file_table_clear import ClearTableData


class MofuSizhong(ClearTableData):


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
        df = df.loc[(df['明细_项目'] == "3期半自磨磨矿量湿重") & (df['明细_所属项目'] == "磨浮矿石")]
        sel_col = ["格式日期", "班次","明细_项目", "明细_数量", "明细_所属项目"]
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
        grouped_df = df.groupby(['格式日期', '班次'])['明细_数量'].sum().reset_index()
        # 使用 pivot 方法将数据重新格式化
        pivot_df = grouped_df.pivot(index='格式日期', columns='班次', values='明细_数量').fillna(0)
        # 重置索引，将日期变成普通列
        pivot_df.reset_index(inplace=True)
        # 重新设置列名，以便更直观
        pivot_df.columns = ['格式日期', '夜班_数量', '白班_数量']
        # 添加总数列
        pivot_df['总数'] = pivot_df['夜班_数量'] + pivot_df['白班_数量']
        pivot_df.rename(columns={"总数":"三期湿重"},inplace=True)
        retdf=pivot_df[["格式日期","三期湿重"]]

        return retdf


if __name__ == '__main__':


    mf=MofuSizhong("/original_table/table",'磨浮车间原表.csv')

    print(mf.make_df())
