#!/bin/sh

echo Building LightDM Webkit theme Neodymium v$(cat version)...
echo

rm lightdm-webkit-theme-neodymium-$(cat version).tar.gz
npm install
rm -r dist/
npm run-script build
pushd dist && tar zcvf ../lightdm-webkit-theme-neodymium-$(cat ../version).tar.gz ./* && popd
