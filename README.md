# She Forum
  

Project: https://devpost.com/software/womenly
<br/><br/>
<img src="https://i.ibb.co/Z89schN/hackviolet1.png" alt="hackviolet1" border="0">

## Test login (as a user)
Email: user1@example.com  
Password: pass1

## Inspiration ✨
  
Women are known for delivering multiple roles effortlessly per day, and they are considered the backbone of every society. The inspiration is to build a platform exclusively for women to help them fly even higher!  
Economic times study says that in West Bengal, India 73.5 percent of the women who are currently not working would be interested in taking up job opportunities.  
Road seems easier if we know someone has walked and been successful. So we connect women to successful individuals to mentor them.  
There is a lot that a woman can discuss or share with other women, and there are very few women exclusive forums.  

## What it does 🚀
This is a platform exclusively for Women  
We have a discussion forum where women can ask questions and discuss topics. Mentors and other women can engage in discussion by replying to the post.  
There is a different login for Companies where they can post jobs for women, and women can see them after they log in!  
We have mentors on our platform, women can schedule a meet with them, ask questions, get guidance.  
Scheduled Meetings can happen on our video calling platform built using Twilio.  
Once the user request a time slot, the mentor gets an option to either accept or reject the requests. If the mentor accepts the requests, the platform generates a unique meeting link automatically which can be accessed on the Mentorship page.  

## Prize Categories 🏆
1. Best Overall  
2. Best Hack to Support Women  
3. Best Use of Cloud Resources: AWS S3 buckets is used for storing and retrieving static files, whereas AWS is used with postgreSQL for storing data.  
4. Best Web App  
5. Best Creative Use of Twilio: Twilio's video API is used for making video calling services  
  
## How we built it  ⚒️
Frontend: Kshitij, Dhruv, Harsh  
Backend: Anubhav  
  
The backend is built using Django while the frontend is made using React. Authentication is made possible using JWT. Django serves/gets data to/from React by making API calls. Video services are made possible using Twilio. AWS S3 bucket is used for storing static files like images. Backend is deployed to Heroku while Frontend is deployed to Vercel
  
## Challenges we ran into 🏢
1. Integrating Django backend with React frontend  
2. Authentication using JWT  
3. Using Twilio's video API and going through its detailed docs  
4. Working with S3 buckets for static files  
5. Configuring CORS and dealing with deployment  
6. Designing the models for backend  
   
## Accomplishments that we're proud of  
1. We followed good software engineering principles like creating a Figma design first. Separating reusable components in the code.  
2. Building a complete web app in 24 hours.  
3. Our webapp is deployed in production!  
  
## What we learned  
1. We were pretty new to UI design using Figma. We learned how to make great designs!  
2. We were new to react too. The entire frontend of the website is built using React.  
3. Integrating Django backend with React frontend  
4. Working with s3 buckets and dealing with it's security   
5. Using Twilio's video API and integrating it's frontend with our Django backend   

## What's next for SheForum
1. Contact mentors
2. Improved UI/CSS
3. Verified users and verified login
4. Adding scheduled meeting's to google calender using Oauth


## Team: 💪🏻

<a href = "https://github.com/anubhav06/hackViolet22/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=anubhav06/hackViolet22"/>
</a>
