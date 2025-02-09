# Guide how to make this fullstack nextjs project with supabase and react query and web workers

1. Install nextjs and name the project 

```bash
npx create-next-app@latest
```
choose the name and then choose "YES" to use typescript, tailwind and app router, and "NO" to the rest. 

2. Now let's start with working on the Authentication. 

a. Install prisma for the auth files (refer to https://authjs.dev/)

```bash
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

b. Install next auth

```bash
npm install next-auth
```

c. Now create a new "lib" folder in the root directory and create a new file called "auth.ts" and "db.ts"

```bash
mkdir lib
touch lib/auth.ts
touch lib/db.ts
```

d. Now we need a new "prisma" folder in the root directory and create a new file called "schema.prisma" to define the database schema. But we just need to initialise prisma client and that will automatically create the "prisma" folder and the "schema.prisma" file.

```bash
npx prisma init
```

e. Copy the code from "db.ts". And after that make a api folder in the app directory, inside the api folder make a auth folder and then make a [...nextauth] folder and inside that make a "route.ts" file.

```bash
mkdir app/api/auth
touch app/api/auth/route.ts
```

f. Copy the auth.ts file and also make the docker-compose.yml file to run the database, and then copy the dockker compose file, maybe also try running that for testing purposes on your local machine.

g. Now lets write the auth.ts code, , make sure to download all the dependencies for the auth.ts file.
