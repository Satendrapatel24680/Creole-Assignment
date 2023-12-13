
// Importing express module
const express=require("express")
const router=express.Router()
const connection = require('../connection/connection');
const port = 3000;
const cluster = require("cluster");
const os = require('os');


const { userModel }= require('../model/product')
  
// Handling request using router
router.get("/cluster",async (req,res,next)=>{
    if (cluster.isPrimary) {
        console.log(`Number of CPUs is ${os.cpus().length}`);
        console.log(`Primary ${process.pid} is running`);
       
        // Fork workers.
        for (let i = 0; i < os.cpus().length; i++) {
          cluster.fork();
          console.log('fork ', process.pid)
        }
       
        cluster.on("exit", (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
          console.log("Let's fork another worker!");
          cluster.fork();
        });
      } else {
        const app = express();
        console.log(`Worker ${process.pid} started`);
       
        app.get("/", (req, res) => {
          res.send("Hello World!");
        });
       
        app.get("/api/:n", function (req, res) {
          let n = parseInt(req.params.n);
          let count = 0;
       
          if (n > 5000000000) n = 5000000000;
       
          for (let i = 0; i <= n; i++) {
            count += i;
          }
       
          res.send(`Final count is ${count}`);
        });
       
        app.listen(port, () => {
          console.log(`App listening on port ${port}`);
        });
      }
})

// NOTE : we are not using JWS token 
router.post("/login",async (req,res,next)=>{
    let {email, password} = req.body;
    let isExist = await userModel.findOne({email: email, password: password})
    if(isExist){
        res.status(200).json({message:'Login success.', data:isExist})
    }else{
        res.status(400).json({message: "Invalid credential"})
    }
})
  
// Importing the router
module.exports=router