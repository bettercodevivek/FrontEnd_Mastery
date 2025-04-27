const http = require('http')
const fs = require('fs/promises')
const {parse} = require('url');


// helper function to fetch all data of the json file

async function getAllData(){
    const data = await fs.readFile('data.json','utf-8');
    return JSON.parse(data || '[]');
}

async function saveData(data){
    const allData = await getAllData();
    allData.push(data);
    await fs.writeFile("data.json",JSON.stringify(allData,null,2),'utf-8');
}

async function UpdatePutData(updatedData){
    const data = await getAllData();
    const updatedFileData=data.map(d=>{
        if(d.id === updatedData.id){
            return updatedData;
        }
        else{
            return d;
        }
    })
    await fs.writeFile("data.json",JSON.stringify(updatedFileData,null,2),'utf-8');
}

const server = http.createServer(async (req,res)=>{

      const path = parse(req.url).pathname;
      const method = req.method ;

     if(path === '/' && method === 'GET'){
        res.writeHead(200,{'content-type':'text/plain'});
        res.end("Welcome to Homepage of testing server !")
     }
     else if(path === '/data' && method === 'GET'){
        const data = await getAllData();
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(data));
     }
     else if(path === '/data' && method === 'POST'){
        let body = ' ';
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        })

        req.on("end",async()=>{
            try{
                const data = JSON.parse(body);
                await saveData(data);
                res.writeHead(200,{'content-type':'application/json'})
                res.end(JSON.stringify({message:"New Data Added Successfully !"}))
            }
            catch{
                res.writeHead(404,{'content-type':'application/json'})
                res.end(JSON.stringify({error:"Error while adding new data !"}))
            }
        })
     }
     else if(path.startsWith('/data/') && method === 'GET'){
        const id = path.split('/')[2];
        const data = await getAllData();
        const smallData = data.find(d=> d.id === Number(id));
        if(smallData){
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(smallData))
        }
        else{
            res.writeHead(404,{'content-type':'application/json'})
            res.end(JSON.stringify({error:"An error occurred"}))
        }
     }
     else if(path.startsWith('/notes/') && method === 'PUT'){
        const id = path.split('/')[2];
        const data = await getAllData();
        let body = '';
        const mainData = data.find(d=>d.id === Number(id));
        if(mainData){
            req.on("data",(chunk)=>{
                body+=chunk.toString();
            })
            req.on("end",async()=>{
              const updatedData = JSON.parse(body);
              updatedData.id = Number(id)
              await UpdatePutData(updatedData);
              res.writeHead(200,{'content-type':'application/json'});
              res.end(JSON.stringify({message:"Resource Replaced Successfully !"}))
            })
        }
        else{
            res.writeHead(404,{'content-type':'application/json'})
            res.end(JSON.stringify({error:"Data not Found !"}))
        }
     }
})


server.listen(8080,()=>{
    console.log("Server Started at port:8080")
})