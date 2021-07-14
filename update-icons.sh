#!/bin/sh

TEMP=_temp

find "$TEMP" -mindepth 1 -maxdepth 1 -type d | \
while read -r USER
do
  USER=`basename "$USER"`
  find "$TEMP/$USER" -mindepth 1 -maxdepth 1 -type d | \
  while read -r REPO
  do
    REPO=`basename "$REPO"`
    echo -e "\n$USER/$REPO"
    cd "$TEMP/$USER/$REPO" || exit
    git fetch --prune
    git checkout -B master origin/master
    cd ../../..
  done
done
