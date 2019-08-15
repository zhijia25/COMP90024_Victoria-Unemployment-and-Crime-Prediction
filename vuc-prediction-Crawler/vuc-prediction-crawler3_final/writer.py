#This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE).
 #Researched Cities: Victoria, AU
 #Team member - id:
 #Zhijia Lu	921715
 #Jing Du	775074
 #Chenyang Lu	951933
 #Pengcheng Yao	886326
 #Echo Gu	520042

from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
import json
import couchdb
import fileinput
import time


couch = couchdb.Server('http://user:pass@172.26.38.189:5984')


def erase_first_line(file_name):
    for line in fileinput.input(file_name, inplace=1):
        if not fileinput.isfirstline():
            print(line.replace('\n', ''))


def motion_classifier(text):
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    analyser = SentimentIntensityAnalyzer()
    score = analyser.polarity_scores(text)
    return score['compound']


def get_boundaries(boundary_filename):
    with open(boundary_filename, 'r', encoding='utf-8') as load_f2:
        area__list = json.load(load_f2)
        boundaries = {}
        for feature in area__list['features']:
            if feature.get('geometry'):
                area_name = feature['properties']['vic_lga__3'].split(" (")[0]
                boundaries[area_name] = feature['geometry']['coordinates']
        load_f2.close()
    return boundaries


def allocate_tweet(twee_x, twee_y, boundaries):
    point = Point(twee_x, twee_y)
    for area in boundaries:
        boundary = []
        for coord in boundaries[area][0]:
            boundary.append((coord[0], coord[1]))
        polygon = Polygon(boundary)
        if polygon.contains(point):
            return area
    return None


def write_into_db(file, line):
    with open(file, 'r+', encoding='utf-8') as old_file:
        dic = json.loads(line)
        twi_dict = {"_id": str(dic["_id"]),
                    "x_coord": dic["x_coord"],
                    "y_coord": dic["y_coord"],
                    "time": dic["time"],
                    "text": dic["text"],
                    "area": dic["area"],
                    "point": motion_classifier(dic["text"]),
                    "hashtags": dic["hashtags"]
                    }
        if motion_classifier(dic["text"]) <= -0.05:
            if twi_dict["time"] is not None and int(twi_dict["time"][-4:]) >= 2014 and int(
                    twi_dict["time"][-4:]) <= 2019:
                try:
                    name = "negative_tweets_" + str(twi_dict["time"][-4:])
                    couch[name].save(twi_dict)
                except:
                    print('duplicate tweet')
        if motion_classifier(dic["text"]) >= 0.05:
            if twi_dict["time"] is not None and int(twi_dict["time"][-4:]) >= 2014 and int(
                    twi_dict["time"][-4:]) <= 2019:
                try:
                    name = "positive_tweets_" + str(twi_dict["time"][-4:])
                    couch[name].save(twi_dict)
                except:
                    print('duplicate tweet')
        else:
            if twi_dict["time"] is not None and int(twi_dict["time"][-4:]) >= 2014 and int(
                    twi_dict["time"][-4:]) <= 2019:
                try:
                    name = "neutral_tweets_" + str(twi_dict["time"][-4:])
                    couch[name].save(twi_dict)
                except:
                    print('duplicate tweet')
    old_file.close()


def given_data_writer(file, db_pos, db_neu, db_neg, map):
    count = 0
    number = 0
    with open(file, 'r', encoding='utf-8') as load_f2:
        for twitter_l in load_f2:
            number +=1
            try:
                if twitter_l[-2:-1] == ',':
                    twitter_d = json.loads(twitter_l[:-2])
                else:
                    twitter_d = json.loads(twitter_l[:-1])
            except Exception:
                continue
            if twitter_d.get('doc'):
                if twitter_d['doc'].get('coordinates'):
                    if twitter_d['doc']['coordinates'].get('coordinates'):
                        twi_dict_x = twitter_d['doc']['coordinates']['coordinates'][0]
                        twi_dict_y = twitter_d['doc']['coordinates']['coordinates'][1]
                    else:
                        twi_dict_x = None
                        twi_dict_y = None
                else:
                    twi_dict_x = None
                    twi_dict_y = None

                if twitter_d['doc'].get('text'):
                    if twitter_d['doc']['lang'] == 'en':
                        twi_dict_t = twitter_d['doc']['text']
                    else:
                        twi_dict_t = None
                else:
                    twi_dict_t = None
            else:
                twi_dict_x = None
                twi_dict_y = None
                twi_dict_t = None
            if twi_dict_x is not None and twi_dict_y is not None and twi_dict_t is not None and allocate_tweet(
                            twi_dict_x, twi_dict_y, map) is not None:
                twi_dict = {"_id": twitter_d['doc'].get('_id'),
                            "x_coord": twi_dict_x,
                            "y_coord": twi_dict_y,
                            "time": twitter_d['doc']["created_at"],
                            "text": twi_dict_t,
                            "area": allocate_tweet(twi_dict_x, twi_dict_y, map),
                            "point": motion_classifier(twi_dict_t),
                            "hashtags": twitter_d['doc']["entities"]["hashtags"]
                            }
                if allocate_tweet(twi_dict_x, twi_dict_y, map) is not None:
                    if motion_classifier(twi_dict_t) <= -0.05:
                        try:
                            couch[db_neg].save(twi_dict)
                            count += 1
                        except:
                            print('duplicate tweet')
                    if motion_classifier(twi_dict_t) >= 0.05:
                        try:
                            couch[db_pos].save(twi_dict)
                            count += 1
                        except:
                            print('duplicate tweet')
                    else:
                        try:
                            couch[db_neu].save(twi_dict)
                            count += 1
                        except:
                            print('duplicate tweet')
        load_f2.close()
    print(number)
    return 'totally ' + str(count) + ' tweets added'


if __name__ == '__main__':
    f = open('tweet_recent.json', 'a', encoding='utf-8')
    f.close()
    while 1:
        count = 0
        try:
            f = open('tweet_recent.json', 'r+', encoding='utf-8')
            line = f.readline()
            f.close()
            while count < 300 and line:
                write_into_db('tweet_recent.json', line)
                count += 1
                erase_first_line('tweet_recent.json')
                f = open('tweet_recent.json', 'r+', encoding='utf-8')
                line = f.readline()
                f.close()
            print('sleep for 5 mins')
            time.sleep(300)
        except:
            continue

