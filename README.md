# PROJECT SETUP

Clone this repository using command git clone https://github.com/kunal021/blog.git or download the .zip file
(Make sure you have git and NodeJs installed in your system.)

## Front-End

First navigate to folder named client(cd client)
Run command npm install to all required dependencies
Run comman npm run dev to run it locally. Navigate to http://localhost:5173/ in your browser.

(Front-End Uses ReactJs(with Vite), Tailwind CSS, Shadcn UI)
(Front-End is deployed on Cloudfare Pages https://readnote.pages.dev/)

## Back-End

First navigate to folder named server(cd server)
Run command npm install to all required dependencies
Add necessay environment variables in .env file(.env should be present in root of server folder)

DATABASE_URI=YOUR_MONGODB_CONNECTION_URL(Choose Drivrer as mongoose)
EXPRESS_APP_SUPABASE_URL=YOUR_SUPABASE_URL
EXPRESS_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY  
JWT_SECRET=YOUR_JWT_SCRETE

Create an storage bucket in supabase and name it "zuai-blog" make it public bucket
Configure the policy of bucket and select all policy as public

Run command npm run dev to start server locally(it run's on port 5000)
(Back-End uses NodeJs(with ExpressJs) for server, MongoDB for database, Supabase for storage, JWT for authentication)
(Back-End is deployed on Render)
