import json


def tran_json(df):

    json_data = df.to_json(orient='records')
    # 将 JSON 字符串解析为 Python 字典，以便 Django 可以处理它
    data_dict = json.loads(json_data)

    return data_dict