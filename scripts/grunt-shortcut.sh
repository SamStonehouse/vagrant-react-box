#!/bin/bash

# Go to our source directory and run grunt with the arguments we just passed it
(cd /var/src/ && grunt "$@")
