#!/bin/bash
cd /home/kavia/workspace/code-generation/wavelog-18552-733a18ff/wave_log
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

