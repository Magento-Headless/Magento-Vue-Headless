#!/bin/bash

echo "\n================================== Install and configure yarn - Install yarn packages - Start  ==================================" 
yarn install
echo "\n================================== Install and configure yarn - Install yarn packages - End   =================================="

echo "\n================================== Build pwa resource - Start  =================================="
yarn build
echo "\n================================== Build pwa resource - End  =================================="

echo "\n================================== Create magento pwa theme - Start  =================================="
yarn create:theme --n Magento --t headless
echo "\n================================== Create magento pwa theme - End  =================================="
