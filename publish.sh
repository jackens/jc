#!/bin/sh

if [ "$1" = jc ]
then
  git status -s
  git checkout --orphan temp_branch
  git add -A
  git commit -m "$(date '+%Y-%m-%d %H:%M')"
  git branch -D master
  git branch -m master
  git push -f origin master
  git gc --force
fi
