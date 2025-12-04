# coding=utf-8
from clear_table.XuanKuangFenChang.xuankuangfc_main import Xuankuang_fenchang
from clear_table.qiumo.qiumo_main import MokuanTotal
from original_table.getsource_table import get_original_table
import os



def main():
    #第一步，从web 下载原始报表
    print("1.获取原始数据.....")
    get_original_table()

    #第二步，清洗表并推送到指定目录
    print("2.清洗数据.....")
    MokuanTotal()

    Xuankuang_fenchang()


    print("数据运行完毕==================================")




if __name__ == '__main__':

    main()