import os

#============web

WEBDATA_FORM_URL = "https://www.yunzhijia.com/maco-platform/view/report/metadata/modelquery2.do"

WEBDATA_FORM_HEADERS = {
    'Ajax-method': 'AjaxMethodFactory',
    'Connection': 'keep-alive',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'Origin': 'https://www.yunzhijia.com',
    'Referer': 'https://www.yunzhijia.com/maco-platform/view/report.do?reportId=45c31c8c22374114a760b2515f11bf02',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'toweibologin=login; uuid_ce3d5ef0-6836-11e6-85a2-2d5b0666fd02=b292465a-3ccd-48e0-985b-9c3c208f2c59; Hm_lvt_45f5f201f5af9cfeffd1f82177d2cceb=1727508114; accessId=ce3d5ef0-6836-11e6-85a2-2d5b0666fd02; href=https%3A%2F%2Fwww.yunzhijia.com%2Fhome%2F%3Fm%3Dopen%26a%3Dlogin%26redirectUrl%3D%252Fyzj-layout%252Fhome%252F; pageViewNum=6; Hm_lvt_a96914087b350d1aa86c96cdbf56d5e5=1727508114,1727516721,1727524945; Hm_lpvt_a96914087b350d1aa86c96cdbf56d5e5=1727524945; HMACCOUNT=7162CC7A6A37DA6F; cd=yunzhijia.com; cn=5ddc906ee4b0813cbce48fdc; cu=668facd7e4b0af426c3cff98; at=7f74b3bb-5aa9-4cb4-82aa-96966f5b248d; __loginType=; uuid=8c016884-a6e3-4a9d-b8ea-bbc332da037e; redirectIndexUrl=/yzj-layout/home; webLappToken="RTXcirUwxXc0shueO%2Fj44WqsE%2FP6rx9kl9NznSu8ugBKz5X3XEY9zWAqUE8fircaXrUHmxB0H3L1%2BC%2BRL0NCkvpSG%2BWO4TJb2zc0CvGFMNw%3D"; sync_networkid=5ddc906ee4b0813cbce48fdc; sync_userid=668facd7e4b0af426c3cff98; MACOJSESSIONID=d18effb7-4892-4718-91b7-c1d7ef47263a'
}

sourcedata_dir="E:\MyWork\BaoBiaoXiuXiu1127\DjangoProject251201\myproject1202\sourdata"

