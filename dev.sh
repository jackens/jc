#!/bin/sh

node --inspect=9229 js/dev-ws-fs.js 12345 &

node --inspect=9221 js/dev-ws-mariadb.js 13306 &
node --inspect=9222 js/dev-ws-mariadb.js 23306 &
node --inspect=9223 js/dev-ws-mariadb.js 33306 &

cd ../jackens.github.io || exit 1

esbuild --serve=:80 --servedir=.

pkill --parent $$
