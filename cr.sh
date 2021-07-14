#!/bin/sh

for DIR in js style.js test.js
do
  echo "\n\e[1;32m$DIR/*.$DIR\e[0m\n"
  tokei -s code "$DIR"
  standard -v "$DIR"
  jscpd "$DIR"
done
