#This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE).
#Researched Cities: Victoria, AU
#Team member - id:
#Zhijia Lu         921715
#Jing Du           775074
#Chenyang Lu       951933
#Pengcheng Yao     886326
#Echo Gu           520042
import couchdb
import json

couch = couchdb.Server('http://admin:admin@localhost:5984')


def get_areas(boundary_filename):
    with open(boundary_filename, 'r', encoding='utf-8') as load_f2:
        area__list = json.load(load_f2)
        boundaries = {}
        for feature in area__list['features']:
            if feature.get('geometry'):
                area_name = feature['properties']['vic_lga__3'].split(" (")[0]
                boundaries[area_name] = feature['geometry']['coordinates']
        load_f2.close()

    area_names = []

    for i in boundaries.keys():
        name = i.replace(' ', '_').replace('-', '_').lower()
        area_names.append(name)

    return area_names


db_list = []

db_list.append("negative_tweets_2014")
db_list.append("negative_tweets_2015")
db_list.append("negative_tweets_2016")
db_list.append("negative_tweets_2017")
db_list.append("negative_tweets_2018")
db_list.append("negative_tweets_2019")
db_list.append("neutral_tweets_2014")
db_list.append("neutral_tweets_2015")
db_list.append("neutral_tweets_2016")
db_list.append("neutral_tweets_2017")
db_list.append("neutral_tweets_2018")
db_list.append("neutral_tweets_2019")
db_list.append("positive_tweets_2014")
db_list.append("positive_tweets_2015")
db_list.append("positive_tweets_2016")
db_list.append("positive_tweets_2017")
db_list.append("positive_tweets_2018")
db_list.append("positive_tweets_2019")


db_date_list = []

db_date_list.append("t_2014")
db_date_list.append("t_2015")
db_date_list.append("t_2016")
db_date_list.append("t_2017")
db_date_list.append("t_2018")
db_date_list.append("t_2019")


db_crime_list = []
db_crime_list.append("crime_2012")
db_crime_list.append("crime_2013")
db_crime_list.append("crime_2014")
db_crime_list.append("crime_2015")
db_crime_list.append("crime_2016")



def delete_all_DBs():
    dbs = db_list + db_crime_list + db_date_list + \
          ["boundary", "unemployment", "unemployment_all", "crime_all", "twitter_all"]
    for db_name in dbs:
        couch.delete(db_name)

delete_all_DBs()


map_reduce_view_count = {
    "_id": "_design/count",
    "language": "javascript",
    "views": {
    "new_view": {
        "map": "function(doc) { emit([doc.area,doc._id], 1); }",
        "reduce": "function(keys, values, combine) { return sum(values); }"
    }
  }
}

map_reduce_view_sum = {
    "_id": "_design/sum",
    "language": "javascript",
    "views": {
    "new_view": {
        "map": "function(doc) { emit([doc.area,doc._id], doc.point); }",
        "reduce": "function(keys, values, combine) { return sum(values); }"
    }
  }
}



map_reduce_view_hashtags = {
    "_id": "_design/tags",
    "language": "javascript",
    "views": {
    "new_view": {
        "map": "function(doc) { emit([doc.area], doc.hashtags); }",
        "reduce": "function(keys, values, combine) { return set().union(values); }"
    }
  }
}

map_reduce_view_docs = {
    "_id": "_design/docs",
    "language": "javascript",
    "views": {
    "new_view": {
        "map": "function (doc) {emit(doc._id, doc);}",
    }
  }
}



for db_name in db_list:
    couch.create(db_name)
    couch[db_name].save(map_reduce_view_hashtags)
    map_reduce_view_hashtags.pop('_rev')
    couch[db_name].save(map_reduce_view_count)
    map_reduce_view_count.pop('_rev')
    couch[db_name].save(map_reduce_view_sum)
    map_reduce_view_sum.pop('_rev')


areas = get_areas('geoserver-GetFeature.json')
for db_name in db_date_list:
    couch.create(db_name)
    couch[db_name].save(map_reduce_view_docs)
    map_reduce_view_docs.pop('_rev')
    db = couch[db_name]
    for a_name in areas:
        doc = {'_id': a_name}
        db.save(doc)


couch.create("boundary")
db = couch['boundary']
with open('geoserver-GetFeature.json', 'r', encoding='utf-8') as load_f2:
    area_list = json.load(load_f2)
    doc = {'_id': "boundary"}
    db.save(doc)
    data = db["boundary"]
    data['b_inf'] = area_list
    db.save(data)


for db_name in db_crime_list:
    path = db_name + ".json"
    with open(path, 'r', encoding='utf-8') as load_f3:
        crime_list = json.load(load_f3)
        couch.create(db_name)
        db = couch[db_name]
        doc = {'_id': db_name, 'c_inf': crime_list}
        db.save(doc)


couch.create("unemployment")
db = couch['unemployment']
with open('unemployment_data.json', 'r', encoding='utf-8') as load_f4:
    em_list = json.load(load_f4)
    doc = {'_id': "unemployment",'e_inf': em_list}
    db.save(doc)

couch.create("unemployment_all")
db = couch['unemployment_all']
with open('unemployment_all.json', 'r', encoding='utf-8') as load_f5:
    em_list = json.load(load_f5)
    doc = {'_id': "unemployment_all",'e_inf': em_list}
    db.save(doc)


couch.create("crime_all")
db = couch['crime_all']
with open('crime_all.json', 'r', encoding='utf-8') as load_f6:
    c_list = json.load(load_f6)
    doc = {'_id': "crime_all",'c_inf': c_list}
    db.save(doc)


couch.create("twitter_all")
db = couch['twitter_all']
doc = {'_id': "twitter_all",'t_inf': {}}
db.save(doc)












