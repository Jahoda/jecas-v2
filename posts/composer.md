---
title: "Composer"
headline: "composer"
description: "composer"
date: "2019-05-06"
last_modification: "2019-05-06"
status: 0
tags: []
---

Instalace composeru na Windows
- stáhnout PHP: https://windows.php.net/download/#php-7.3-ts-VC15-x64
- stánhout Composer: https://getcomposer.org/download/
- rozbalit PHP
- v Composer instalaci najít php.exe
- vytvořit php.ini přejmenováním php.ini-production
- nastavit cestu k rozšířením extension_dir = "ext"
- povolit rozšíření pro ssl - extension=openssl

===

partner_workflow status nastavit na "PRODUCTION"

rm -rf var/cache
bin/console graphql:compile

docker ps

 winpty docker exec -it c60fcfb1de2c bash

cd cockpit-portal-api
make init-dev

zakomentovat ř. 27 v cockpit-poratal-api/docker-compose.yml

winpty docker exec -it &lt;ID php kontejneru> bash
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