## Start the project locally

1) first start the ngrok server so supabase can connect to that
Port sollte dem npm run dev port machen, hier zb. localhost:3000 wäre dann:

ngrok http 3000     

2) Start the project

npm run dev

## update prisma when database changes

1) pull from superbase

npx prisma db pull

2) generate prisma client

npx prisma generate