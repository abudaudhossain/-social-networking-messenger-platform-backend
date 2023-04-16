# Social Networking Platform System

### Features

**User registration and login:** 
- Users can create new accounts and log in to the platform.
- Passwords were encrypted and stored securely.
- Users can edit and manage their profile information.

**Profiles Management:**
- Users will create a new profile, including a
- profile picture, bio, and links to their other social media accounts.
- Users  can view other user's profile 

**Posts Management:**
- Users can create new posts, which will include text and images.
- Users will be able to like, comment on, and share posts.
- Users will be able to search for posts by keyword.

**Connections Management:**
- Users will be connected with other users and view their
- posts in a feed.
- Users will be able to see a list of their connections and manage
their connections.

## Tech Stack

**Back-End:** 
- Node.js
- Express

**Database:** 
- MongoDB
- Mongoose

**NPM Package:**
- jsonwebtoken
- bcrypt
- cros
- dotenv
- md5
- multer
- nodemon


### Part 2: Using NPM
Start working with the Social Networking Platform System
1. Clone Git Repo
```
git clone https://github.com/abudaudhossain/social-networking-platform.git
```
2. Install Dependency
```
npm install
```

3. Run on development 
```
npm start
```


## File Structure
Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:
```

social-networking-platform
  ├── App
  │    ├── controllers
  │    │    ├── auth.js
  │    │    ├── comment.js
  │    │    ├── fileUploader.js
  │    │    ├── post.js
  │    │    ├── profile.js
  │    │    └── welcome.js
  │    ├── exceptions
  │    │    ├── DeviceInfoError.js
  │    │    ├── handlers.js
  │    │    ├── NotAcceptableError.js
  │    │    ├── NotFountError.js
  │    │    ├── UnauthorizedError.js
  │    │    └── ValidationError.js
  │    ├── helpers  
  │    │    ├── native.js
  │    │    ├── postRes.js
  │    │    ├── userRes.js
  │    │    ├── utility.js
  │    │    └── utils.js
  │    ├── middleware  
  │    │    └── userAuth.js
  │    ├── models  
  │    │    └── core
  │    │        ├── Comment.js
  │    │        ├── Post.js
  │    │        ├── Profile.js
  │    │        └── User.js
  │    ├── services
  │    │    ├── comment.js
  │    │    ├── post.js
  │    │    ├── profile.js
  │    │    └── user.js
  │    ├── validation  
  │    │    └── validationHelpers
  │    │        └── validationHelper.js
  │    ├── routes
  │    │    └── api.js
  │    ├── storage
  │    │    └── image.png
  ├── .env
  ├── .gitignore
  ├── index.js
  ├── package-lock.json
  ├── package.json
  └── README.md
```