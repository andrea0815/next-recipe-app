## Start the project locally

1) first start the ngrok server so supabase can connect to that

ngrok http 3001     

2) Start the project

npm run dev

## update prisma when database changes

1) pull from superbase

npx prisma db pull

2) generate prisma client

npx prisma generate