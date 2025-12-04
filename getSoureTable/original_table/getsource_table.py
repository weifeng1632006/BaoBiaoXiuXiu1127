# coding=utf-8
from web.FileWebDataBase import WebDataBase
from web.getHuayan import getHuaYan


def get_original_table():
    WebDataBase("球磨报表原表","/original_table/table").out_file()
    WebDataBase("磨浮车间原表","/original_table/table").out_file()
    # WebDataBase("厂区化验原表", "/original_table/table").out_file()
    WebDataBase("电力原表", "/original_table/table").out_file()
    WebDataBase("浓密原表", "/original_table/table").out_file()
    WebDataBase("硫酸一原表", "/original_table/table").out_file()
    WebDataBase("硫酸二原表", "/original_table/table").out_file()
    WebDataBase("电解萃取一原表", "/original_table/table").out_file()
    WebDataBase("电解萃取二原表", "/original_table/table").out_file()

    #
    WebDataBase("磨浮磨矿", "/original_table/table").out_file()
    WebDataBase("半自磨矿量", "/original_table/table").out_file()
    WebDataBase("四五期磨矿量", "/original_table/table").out_file()

    WebDataBase("铜精矿计算表", "/original_table/table").out_file()

    #单独的厂区化验报表获取
    getHuaYan()




if __name__ == '__main__':

    # get_original_table()

    WebDataBase("厂区化验原表", "/original_table/table").out_file()