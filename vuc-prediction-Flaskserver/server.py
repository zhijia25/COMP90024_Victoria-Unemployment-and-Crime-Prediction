#This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE).
#Researched Cities: Victoria, AU
#Team member - id:
#Zhijia Lu    921715
#Jing Du    775074
#Chenyang Lu    951933
#Pengcheng Yao    886326
#Echo Gu    520042
import urllib3
import json
from flask import Flask, jsonify, abort, request, make_response, url_for
from flask_cors import CORS


app = Flask(__name__, static_url_path="")
CORS(app, supports_credentials=True)


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)



def make_public_task(task):
    new_task = {}
    for field in task:
        new_task[field] = task[field]
    return new_task

def get_crime(task_id):
    url = "http://user:pass@172.26.38.189:5984/crime_" + str(task_id) + "/crime_" + str(task_id)
    http = urllib3.PoolManager()
    request = http.request('GET',url)
    content= str(request._body.decode('unicode-escape'))
    result_c = json.loads(content)
    #request.release_conn()
    #req = urllib.request.Request(url)
    #res_data = urllib.request.urlopen(req)
    #result_c = json.loads(res_data.read())
    answer = result_c['c_inf']
    return answer


def get_crimes():
    crime_times = [2012, 2013, 2014, 2015, 2016]
    crimes = {}
    for i in crime_times:
        crimes[i] = get_crime(i)
    return crimes


def get_twitter(task_id):
    answer = {}
    url = "http://user:pass@172.26.38.189:5984/t_" + str(task_id) + "/_design/docs/_view/new_view?"
    # area_list = get_areas('geoserver-GetFeature.json')
    # for area_name in area_list:
    # url = "http://admin:admin@172.26.37.254:5984/t_" + str(task_id) + "/" + area_name
    
    http = urllib3.PoolManager()
    request = http.request('GET', url)
    content = str(request._body.decode('unicode-escape'))
    result = json.loads(content)
    
    #req = urllib.request.Request(url)
    result_list = {}
    #res_data = urllib.request.urlopen(req)
    #result = json.loads(res_data.read())
    result_t = result["rows"]
    for i in result_t:
        key = i['value']['_id'].replace('_', ' ')
        i['value'].pop('_id')
        value = i['value']
        result_list[key] = value
    #print(result_list)
    return result_list


def get_twitters():
    twitter_time = [2014, 2015, 2016, 2017, 2018, 2019]
    twitters = {}
    for i in twitter_time:
        twitters[i] = get_twitter(i)
    return twitters


def get_ga_boundary():
    answer = {}
    http = urllib3.PoolManager()
    request = http.request('GET', "http://user:pass@172.26.38.189:5984/boundary/boundary")
    res_data = str(request._body.decode('unicode-escape'))
    #req = urllib.request.Request("http://user:pass@172.26.38.189:5984/boundary/boundary")
    #res_data = urllib.request.urlopen(req)
    result_m = json.loads(res_data)
    answer = result_m['b_inf']
    return answer

def get_unemployment():
    answer = {}
    http = urllib3.PoolManager()
    request = http.request('GET', "http://user:pass@172.26.38.189:5984/unemployment/unemployment")
    content = str(request._body.decode('unicode-escape'))
    #req = urllib.request.Request("http://user:pass@172.26.38.189:5984/unemployment/unemployment")
    #res_data = urllib.request.urlopen(req)
    result_m = json.loads(content)
    answer = result_m['e_inf']
    return answer

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

def get_twitter_all():
    answer = {}
    result_t = {}
    for i in range(3):
        http = urllib3.PoolManager()
        request = http.request('GET', "http://user:pass@172.26.38.189:5984/twitter_all/twitter_all_"+str(i+1))
        content = str(request._body.decode('unicode-escape'))
        temp = json.loads(content)['t_inf']
        result_t = merge(result_t,temp)
    #url = "http://user:pass@172.26.38.189:5984/twitter_all/twitter_all"
    #req = urllib.request.Request(url)
    #res_data = urllib.request.urlopen(req)
    
    answer = result_t
    return answer


def get_crime_all():
    http = urllib3.PoolManager()
    request = http.request('GET', "http://user:pass@172.26.38.189:5984/crime_all/crime_all")
    content = str(request._body.decode('unicode-escape'))
    #url = "http://user:pass@172.26.38.189:5984/crime_all/crime_all"
    #req = urllib.request.Request(url)
    #res_data = urllib.request.urlopen(req)
    result_c = json.loads(content)
    answer = result_c['c_inf']
    return answer


def get_unemployment_all():
    answer = {}
    http = urllib3.PoolManager()
    request = http.request('GET', "http://user:pass@172.26.38.189:5984/unemployment_all/unemployment_all")
    content = str(request._body.decode('unicode-escape'))
    #req = urllib.request.Request("http://user:pass@172.26.38.189:5984/unemployment_all/unemployment_all")
    #res_data = urllib.request.urlopen(req)
    result_m = json.loads(content)
    answer = result_m['e_inf']
    return answer



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
        name = i.replace(' ', '_').lower()
        area_names.append(name)
    return area_names


def refresh():
    
    results = [{"id": "boundary",
               "value": get_ga_boundary()},
               {"id": "twitter",
               "value": get_twitters()},
               {"id": 'crime',
               "value": get_crimes()},
               {"id": "unemployment",
               "value": get_unemployment()},
               {"id": "unemployment_all",
               "value": get_unemployment_all()},
               {"id": "twitter_total",
               "value": get_twitter_all()},
               {"id": "crime_all",
               "value": get_crime_all()}
               ]
    return results


@app.route('/crimitter/api/tasks', methods = ['GET'])
def get_tasks():
    tasks[0]['value'] = get_ga_boundary()
    tasks[1]['value'] = get_twitters()
    tasks[2]['value'] = get_crimes()
    tasks[3]['value'] = get_unemployment()
    tasks[4]['value'] = get_unemployment_all()
    tasks[5]['value'] = get_twitter_all()
    tasks[6]['value'] = get_crime_all()
    return jsonify( { 'tasks': list(map(make_public_task, tasks)) } )


@app.route('/crimitter/api/tasks/<string:task_id>', methods = ['GET'])
def get_task(task_id):
    if task_id.split('-')[0] == "boundary":
        tasks[0]["value"] = get_ga_boundary()
    if task_id.split('-')[0] == "twitter":
        if (task_id.split('-')[1] == "all"):
            tasks[1]["value"] = get_twitters()
        else:
            tasks[1]["value"] = get_twitter(task_id.split('-')[1])
    if task_id.split('-')[0] == "crime":
        if (task_id.split('-')[1] == "all"):
            tasks[1]["value"] = get_crimes()
        else:
            tasks[1]["value"] = get_crime(task_id.split('-')[1])
    if task_id.split('-')[0] == "unemployment":
        tasks[3]['value'] = get_unemployment()
    if task_id.split('-')[0] == "unemployment_all":
        tasks[4]['value'] = get_unemployment_all()
    if task_id.split('-')[0] == "twitter_total":
        tasks[5]['value'] = get_twitter_all()
    if task_id.split('-')[0] == "crime_all":
        tasks[6]['value'] = get_crime_all()
    task = list(filter(lambda t: t['id'] == task_id.split('-')[0], tasks))
    if len(task) == 0:
        abort(404)
    result = make_public_task(task[0])['value']
    answer = json.dumps(result)
    #result = jsonify( make_public_task(task[0]))
    #print(result)
    #print(answer)
    return answer


if __name__ == '__main__':
    tasks = refresh()
    app.run("localhost", "8080", debug=True)

