import express, { Request, Router } from "express";
import { adminService, adminwaplogin } from "../service/adminService";
import { User } from "../model/user";
// import session from "express-session";

export const adminRouter : Router = express.Router();
//add in start.ts
// adminRouter.use(session({
//     secret: 'your_secret_key', // Change this to a strong and secure secret
//     resave: false,
//     saveUninitialized: true
//   }));

const admService = new adminService(); 

interface RegisterRequest extends Request {
    params : {},
    body : { username : string, password : string }
}
// curl --header "Content-Type: application/json"   --request POST   --data '{"username":"xyxz","password":"xyz"}'   http://localhost:8080/api/login/register
adminRouter.post("/register", async (
    req: RegisterRequest,
    res
) => {
    try {
        if (typeof(req.body.username) !== "string" || typeof(req.body.password) !== "string" || req.body.username === "" || req.body.password === "") {
            res.status(400).send("Invalid username or password")
        }
        
        const newUser : User = {
            username : req.body.username,
            password : req.body.password
        }
        if (await admService.register(newUser)) {
            res.status(200).send("Registered")
        } else {
            res.status(409).send("User name" + req.body.username + " already exists");
        }
    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

interface LoginRequest extends Request {
    params : {},
    session: any,
    body : { username : string, password : string }
}

// curl --header "Content-Type: application/json"   --request POST   --data '{"username":"xyxz","password":"xyz"}'   http://localhost:8080/api/login
adminRouter.post("/", async (
    req: LoginRequest, 
    res
    ) => {
    try {
        console.log("we have come this far");
        console.log(req.session);
        if (typeof(req.body.username) !== "string" || typeof(req.body.password) !== "string" || req.body.username === "" || req.body.password === "") {
            console.log("User or password was empty or invalid");
            return res.status(400).send("Invalid password or username");
        }
        const loginUser : User = {
            username : req.body.username,
            password : req.body.password
        }
        const val = (await admService.findUser(loginUser))
        console.log(val);
        if (!val) {
            console.log("Username or password is invalid");
            console.log("Hejhej");
            return res.status(401).send("Username or password is invalid");
            
        }
        console.log("Logged In! " + req.body.username)
        console.log(req.sessionID);
        console.log(req.session);
        // Ensure that req.session is initialized before assigning properties
        if (!req.session.user) {
            req.session.user = req.body.username;
        }
        req.session.user = req.body.username;
        req.session.save();
        console.log("User stored in session")
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: req.session.user,
          });
        console.log(req.session);
    } catch (e : any) {
        return res.status(500).send(e.message);
    }
});