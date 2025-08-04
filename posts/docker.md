---
title: "Docker"
headline: "Docker"
description: ""
date: "2019-06-21"
last_modification: "2019-06-21"
status: 0
tags: []
---

```
partner_workflow status nastavit na "PRODUCTION"

rm -rf var/cache
bin/console graphql:compile

docker ps

 winpty docker exec -it c60fcfb1de2c bash

cd cockpit-portal-api
make init-dev

zakomentovat ř. 27 v cockpit-poratal-api/docker-compose.yml

winpty docker exec -it  bash
php bin/console ...

Smazat
docker rm $(docker ps -aq) -r
docker system prune -a

Instalace Composer:
composer install --ignore-platform-reqs

Nahodit:
- docker pull: make docker-pull
- docker up: make docker-up-force

Nahodit po pádu
docker start $(docker ps -aq)

URL v config.js

apiBaseUrl: 'http://127.0.0.69:8000/v1',
graphqlBaseUrl: 'http://127.0.0.69:8000/graphql',
```