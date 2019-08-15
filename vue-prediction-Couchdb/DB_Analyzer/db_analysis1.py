#This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE).
#Researched Cities: Victoria, AU
#Team member - id:
#Zhijia Lu         921715
#Jing Du           775074
#Chenyang Lu       951933
#Pengcheng Yao     886326
#Echo Gu           520042
import couchdb
import urllib.request
import urllib3
import json
import threading
import time
from collections import Counter

couch = couchdb.Server('http://admin:admin@localhost:5984')

negative_list = []
negative_list.append("negative_tweets_2014")
negative_list.append("negative_tweets_2015")
negative_list.append("negative_tweets_2016")
negative_list.append("negative_tweets_2017")
negative_list.append("negative_tweets_2018")
negative_list.append("negative_tweets_2019")

positive_list = []
positive_list.append("positive_tweets_2014")
positive_list.append("positive_tweets_2015")
positive_list.append("positive_tweets_2016")
positive_list.append("positive_tweets_2017")
positive_list.append("positive_tweets_2018")
positive_list.append("positive_tweets_2019")

def get_areas(boundary_filename):
    with open(boundary_filename, 'r', encoding='utf-8') as load_f2:
        area_list = json.load(load_f2)
        areas = list(area_list.keys())
        area_names = []
        for i in areas:
            name = i.replace(' ', '_').replace('-', '_').lower()
            area_names.append(name)
    return area_names


def update_db():
    area_list = get_areas('area1.json')
    for i in range(2014, 2020):
        name = "t_" + str(i)
        for j in area_list:
            db = couch[name]
            data = db[j]
            t_positive = get_positive(str(i), j)
            t_negative = get_negative(str(i), j)
            t_neutral = get_neutral(str(i), j)
            if not t_negative:
                t_negative = 0
            if not t_neutral:
                t_neutral = 0
            if not t_positive:
                t_positive = 0
            t_total = t_positive + t_negative + t_neutral
            if t_total == 0:
                p_rate = 0
                n_rate = 0
                t_average_score = 0
            else:
                p_rate = t_positive/t_total
                n_rate = t_negative / t_total
                t_average_score = get_score(str(i), j) / t_total

            data['total_positive_twitter_count'] = t_positive
            data['total_negative_twitter_count'] = t_negative
            data['total_twitter_post'] = t_total
            data['average_score'] = t_average_score
            data['positive_rate'] = p_rate
            data['negative_rate'] = n_rate
            data['angry_hashtag_list'] = get_hashtags(str(i), j)
            db.save(data)


def update_t_all():
    area_list = get_areas('area1.json')
    db = couch['twitter_all']
    data = db['twitter_all_1']
    t_dic = {}
    for i in area_list:
        d = {}
        t_positive = get_positive_all(i)
        t_negative = get_negative_all(i)
        t_total = get_total_twitter(i)
        if not t_negative:
            t_negative = 0
        if not t_positive:
            t_positive = 0

        if t_total == 0:
            p_rate = 0
            n_rate = 0
        else:
            p_rate = t_positive / t_total
            n_rate = t_negative / t_total
        d['total_positive_twitter_count'] = get_positive_all(i)
        d['total_negative_twitter_count'] = get_negative_all(i)
        d['total_twitter_post'] = get_total_twitter(i)
        d['average_score'] = get_total_average_score(i)
        d['positive_rate'] = p_rate
        d['negative_rate'] = n_rate
        d['angry_hashtag_list'] = get_total_hashtags(i)
        t_dic[i.replace('_', ' ')] = d
    data['t_inf'] = t_dic
    db.save(data)


def get_positive_all(area):
    s = 0
    for i in range(2014, 2020):
        http = urllib3.PoolManager()
        url = "http://admin:admin@localhost:5984/t_" + str(i) + "/" + area
        request = http.request('GET', url)
        res_data = str(request._body.decode('unicode-escape'))
        result = json.loads(res_data)
        result1 = result['total_positive_twitter_count']
        s = s + result1
    return s

def get_negative_all(area):
    s = 0
    for i in range(2014, 2020):
        url = "http://admin:admin@localhost:5984/t_" + str(i) + "/" + area
        http = urllib3.PoolManager()
        request = http.request('GET', url)
        res_data = str(request._body.decode('unicode-escape'))
        result = json.loads(res_data)
        result1 = result['total_negative_twitter_count']
        s = s + result1
    return s

def get_total_twitter(area):
    s = 0
    for i in range(2014, 2020):
        url = "http://admin:admin@localhost:5984/t_" + str(i) + "/" + area
        http = urllib3.PoolManager()
        request = http.request('GET', url)
        res_data = str(request._body.decode('unicode-escape'))
        result = json.loads(res_data)
        result1 = result['total_twitter_post']
        s = s + result1
    return s

def get_total_average_score(area):
    s = 0
    for i in range(2014, 2020):
        url = "http://admin:admin@localhost:5984/t_" + str(i) + "/" + area
        http = urllib3.PoolManager()
        request = http.request('GET', url)
        res_data = str(request._body.decode('unicode-escape'))
        result = json.loads(res_data)
        result1 = result['average_score']
        s = s + result1
    s = s/6
    return s

def merge(a, b):
    if not a:
        a = {}
    if not b:
        b = {}
    #print(type(a))
    #print(type(b))
    c = {}
    c = a
    for (k, v) in b.items():
        if k in c.keys():
            c[k] = c[k]+v
        else:
            c[k] = v
    return c

def get_total_hashtags(area):
    s = {}
    return s



def get_positive(date, area):
    url_part1 = "http://admin:admin@localhost:5984/positive_tweets_" + date
    url_part2 = "/_design/count/_view/new_view?group_level=1"
    url = url_part1 + url_part2

    http = urllib3.PoolManager()
    request = http.request('GET', url)
    res_data = str(request._body.decode('unicode-escape'))
    result = json.loads(res_data)

    result_list = result['rows']
    for d in result_list:
        if not d['key'][0]:
            continue
        if d['key'][0].replace(' ', '_').replace('-', '_').lower() == area :
            return d['value']


def get_negative(date, area):
    url_part1 = "http://admin:admin@localhost:5984/negative_tweets_" + date
    url_part2 = "/_design/count/_view/new_view?group_level=1"
    url = url_part1 + url_part2
    http = urllib3.PoolManager()
    request = http.request('GET', url)
    res_data = str(request._body.decode('unicode-escape'))
    result = json.loads(res_data)
    result_list = result['rows']
    for d in result_list:
        if not d['key'][0]:
            continue
        if d['key'][0].replace(' ', '_').replace('-', '_').lower() == area :
            return d['value']


def get_neutral(date, area):
    url_part1 = "http://admin:admin@localhost:5984/neutral_tweets_" + date
    url_part2 = "/_design/count/_view/new_view?group_level=1"
    url = url_part1 + url_part2
    http = urllib3.PoolManager()
    request = http.request('GET', url)
    res_data = str(request._body.decode('unicode-escape'))
    result = json.loads(res_data)
    result_list = result['rows']
    for d in result_list:
        if not d['key'][0]:
            continue
        if d['key'][0].replace(' ', '_').replace('-', '_').lower() == area :
            return d['value']


def get_score(date, area):
    db_list = []
    db_list.append("positive")
    db_list.append("negative")
    db_list.append("neutral")
    sun_score = 0
    for i in db_list:
        url_part1 = "http://admin:admin@localhost:5984/" + i + "_tweets_" + date
        url_part2 = "/_design/sum/_view/new_view?group_level=1"
        url = url_part1 + url_part2

        http = urllib3.PoolManager()
        request = http.request('GET', url)
        res_data = str(request._body.decode('unicode-escape'))
        result = json.loads(res_data)
        result_list = result['rows']
        for d in result_list:
            if not d['key'][0]:
                continue
            if d['key'][0].replace(' ', '_').replace('-', '_').lower() == area :
                sun_score = sun_score + d['value']
    return sun_score


def get_hashtags(date, area):
    s = {}
    return s


def get_boundaries(boundary_filename):
    with open(boundary_filename, 'r', encoding='utf-8') as load_f2:
        area_list = json.load(load_f2)
        areas = list(area_list.keys())
        #print(areas)
    return areas




def timer():
    while 1:
        update_db()
        update_t_all()
        time.sleep(3600)


if __name__ == '__main__':
    t = threading.Thread(target=timer)
    t.start()
