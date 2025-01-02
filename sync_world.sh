#!/bin/bash

cd /home/u376121138/domains/athoscraft.com/public_html/uploads/Worlds/Current 
wget ftp://Webmaster.Athoscraft.1718234:TheFamily4TW!@9439.node.apexhosting.gdn/default/ACS6_V1.0.zip -O ACS6.zip
unzip -o ACS6.zip -d .
cd worlds/ACS6_V1.0
zip -0prm ../ACS6.mcworld.new * --exclude=sync_world.sh
mv -f ../ACS6.mcworld.new /home/u376121138/domains/athoscraft.com/public_html/uploads/Worlds/Current/ACS6.mcworld
rm -rf /home/u376121138/domains/athoscraft.com/public_html/uploads/Worlds/Current/worlds
rm -rf /home/u376121138/domains/athoscraft.com/public_html/uploads/Worlds/Current/ACS6.zip
