#!/bin/bash

echo "== Add nodes to cluster =="
curl -X POST -H "Content-Type: application/json" http://user:pass@172.26.38.189:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "user", "password":"pass", "port": 5984, "node_count": "3", "remote_node": "172.26.37.223", "remote_current_user": "user", "remote_current_password": "pass" }'
curl -X POST -H "Content-Type: application/json" http://user:pass@172.26.38.189:5984/_cluster_setup -d '{"action": "add_node", "host":"172.26.37.223", "port": 5984, "username": "user", "password":"pass"}'

curl -X POST -H "Content-Type: application/json" http://user:pass@172.26.38.189:5984/_cluster_setup -d '{"action": "finish_cluster"}'