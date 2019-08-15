#This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE).
 #Researched Cities: Victoria, AU
 #Team member - id:
 #Zhijia Lu	921715
 #Jing Du	775074
 #Chenyang Lu	951933
 #Pengcheng Yao	886326
 #Echo Gu	520042

import json


def extract_user(file_name, user_list = 'unprocessed_user_list.json'):
    with open(user_list, 'a', encoding='utf-8') as load_f1:
        with open(file_name, 'r', encoding='utf-8') as load_f2:
            for twitter_l in load_f2:
                try:
                    if twitter_l[-2:-1] == ',':
                        twitter_d = json.loads(twitter_l[:-2])
                    else:
                        twitter_d = json.loads(twitter_l[:-1])
                except Exception:
                    continue
                if twitter_d.get('doc'):
                    if len(twitter_d['doc']['entities']["user_mentions"]) > 0:
                        for user in twitter_d['doc']['entities']["user_mentions"]:
                            line = {'id' : user['id_str']}
                            load_f1.write(json.dumps(line) + '\n')
            load_f2.close()
        load_f1.close()

# all user from university's database have been extracted before
# if __name__ == '__main__':
#     try:
#         extract_user('twitter_2014_7-12.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2015_1-6.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2015-7-12.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2016-12.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2016_1-6.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2017-6.json')
#     except:
#         print('no file')
#     try:
#         extract_user('twitter_2017-7.json')
#     except:
#         print('no file')





