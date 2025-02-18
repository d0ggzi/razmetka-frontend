echo "building app"
npm run build

echo "deploying files to server"
scp -r dist/* root@${server-ip}:/var/www/${server-ip}/

echo "done"