from datetime import datetime
import json

import pandas as pd


def tran_json(df):

    json_data = df.to_json(orient='records')
    # 将 JSON 字符串解析为 Python 字典，以便 Django 可以处理它
    data_dict = json.loads(json_data)

    return data_dict


def date_df():
    start_date = '2024-01-01'
    # 获取当前日期
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)
    date_range = pd.date_range(start=start_date, end=end_date)

    df = pd.DataFrame({'格式日期': date_range})
    return df


import pandas as pd
from datetime import datetime


def date_df_bans():
    start_date = '2024-01-01'
    # 获取当前日期
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)
    date_range = pd.date_range(start=start_date, end=end_date)

    # 创建一个包含所有日期和班次的列表
    dates = []
    shifts = []
    for date in date_range:
        dates.append(date)
        shifts.append('白班')
        dates.append(date)
        shifts.append('夜班')

    # 将列表转换为DataFrame
    df = pd.DataFrame({'格式日期': dates, '班次': shifts})
    return df


# 调用函数并打印结果
# print(date_df_bans())
