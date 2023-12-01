<img src="https://github.com/FreQll/Usof-DevTalk/assets/62791316/5ed8a668-7ffc-4a41-801f-6e770432e046" alt="devtalk_logo" style="width:300px;"/>

____

### What is it? | [DevTalk in Action](https://www.youtube.com/watch?v=0AhMtMo64Us&ab_channel=FreQl)

**DevTalk** is a dynamic and user-friendly forum web application built with React for the frontend part, leveraging the Node.js + Express as a REST API for the backend. This platform provides developers with a collaborative space to engage in insightful discussions, seek assistance, and share their expertise within the vibrant developer community. With a sleek and intuitive interface, DevTalk seamlessly integrates React's key concepts, including components, JSX, props and state management, the component API, and various component types. Users can explore a diverse range of topics, contribute to discussions, and stay up-to-date with the latest trends in the ever-evolving world of software development. DevTalk is not just a forum; it's a hub for fostering knowledge exchange and building connections among developers.

____
### Setup

1. Firstly download project from this page, something like this and move to folder:

```bash
git clone https://github.com/FreQll/Usof-DevTalk.git
cd Usof-DevTalk
```

2. Then you need to setup **backend part**, for this:
   
    - Go to backend folder and install packages for it
      ``` bash
      cd API
      npm i
      ```
    - Install MySQL if you dont have it, and then install database
      ```bash
      mysql -u root -p < db.sql
      ```
    - Run server
      ```bash
      node index.js
      ```

3. Then you need to setup **frontend part**, for this:
   - In project folder install all packages
     ```bash
     npm i
     ```
   - Run React application
     ```bash
     npm start
     ```

____
### Technology Stack

- #### FrontEnd Part

    [![FrontEnd](https://skillicons.dev/icons?i=react,mui,redux,css&perline=4)](https://skillicons.dev)

    *And also React-Router and Axios.*

- #### BackEnd Part

    [![BackEnd](https://skillicons.dev/icons?i=js,nodejs,express,mysql&perline=4)](https://skillicons.dev)

    *And also JWT for authorization, Nodemailer and Postman for testing API.*

____
### API Documentation 

Full Documentation for DevTalk API you can find [here](https://github.com/FreQll/Usof-DevTalk/tree/main/API)
