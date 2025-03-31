const express=require("express")
const app=express()
const cors=require("cors");
app.use(express.json());
const jwt=require("jsonwebtoken")
app.use(cors(
    {
        origin:"*"
    }
));
const sqlite3 = require('sqlite3')
const { open } =require('sqlite')


let db;
async function initialiseDB(){
    db=await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      phoneno TEXT
    )
  `);

}
initialiseDB()
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required",code:400 });
    }
    try {
        const user = await db.get(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password",code:401 });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid username or password",code:401 });
        }
        const userr= {
            id: user.id,
            username: user.username,
            name: user.name,
            phoneno: user.phoneno
        }
        const token=jwt.sign({userr},"123456789",{
            expiresIn:"15d"
        })

        console.log(token)
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:true,
            maxAge:5*24*60*60*1000,
            path:"/",
            sameSite:"none"
        }).status(200).json({
            message: "Login successful",
            code:200 ,
            userr
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error",code:500 });
    }
});
app.post("/register",async (req,res)=>{
    const {username,password,name,phoneno}=req.body
    try{
        await db.run(
            `INSERT INTO users (username, password, name, phoneno) VALUES (?, ?, ?, ?)`,
            [username, password, name, phoneno]
          );
        res.json({
            message:"registered successfully",
            code:200
        })
    }catch(e){
        res.json({
            message:"an error occured"+e,
            code:404
        })
    }
   
})
const port=5000
app.listen(port,()=>{
    console.log(`server running very well on ${port}`)
})