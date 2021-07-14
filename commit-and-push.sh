#!/bin/sh

git add -A
git commit -m "$(date '+%Y-%m-%d %H:%M')"
git push -f origin master
