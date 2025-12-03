# coding=utf-8
from FileWebDataBase import WebDataBase


def get_fact_table():
    WebDataBase("球磨报表原表","/fact_table").out_file()
    WebDataBase("磨浮车间原表","/fact_table").out_file()
    WebDataBase("厂区化验原表", "/fact_table").out_file()
    WebDataBase("电力原表", "/fact_table").out_file()
    WebDataBase("浓密原表", "/fact_table").out_file()
    WebDataBase("硫酸一原表", "/fact_table").out_file()
    WebDataBase("硫酸二原表", "/fact_table").out_file()
    WebDataBase("电解萃取一原表", "/fact_table").out_file()
    WebDataBase("电解萃取二原表", "/fact_table").out_file()






if __name__ == '__main__':

    get_fact_table()