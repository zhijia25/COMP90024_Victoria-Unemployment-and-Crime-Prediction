#! /bin/bash
sudo echo "proxy= 'http://wwwproxy.unimelb.edu.au:8000'" >> /etc/environment
sudo echo "proxy= 'https://wwwproxy.unimelb.edu.au:8000'" >> /etc/environment

python3 crawler3.py
python3 writer.py