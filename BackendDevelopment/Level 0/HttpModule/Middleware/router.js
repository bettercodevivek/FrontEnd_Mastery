// Toh yaar apan ab bana rahe hai ek custom router to understand how routing works in express js , behind the scenes.

// sabse pehle hum ek router class banayenge, jisme hum apne required methods likh sakte hai

class Router{
    constructor(){
        this.routes = [];
    }

    // ab yaha humne upar simply humne ek routes array banadiya, jisme every http method is stored.

    // method to register GET routes

    get(path,handler){
        this.routes.push({
            method:'GET',
            path,
            handler,
        });
    }

    // method to register POST routes

    post(path,handler){
        this.routes.push({
         method:"POST",
         path,
         handler,
        });
    }

    // method to register PUT routes

    put(path,handler){
        this.routes.push({
            method:"PUT",
            path,
            handler,
        })
    }

    // method to register DELETE routes

    delete(path,handler){
        this.routes.push({
            method:"DELETE",
            path,
            handler,
        })
    }


    // matchRoute method  = yeh method incoming requests ko existing registered routes se match karta hai.

    matchRoute(req){
        const {url,method} = req;   // destructuring assignment of variable, basically, property name ko hi as a variable name use karlia to make assignment easier.

        // loop through registered routes to find a match

        for(let route of this.routes){
            if(route.method === method && route.path === url){
               // this means registered route hai, match hogya , return its handler function
               return route.handler;
            }
        }
        return null; // agar match na mile
    }

    // yeh main function  hai, jo createServer ke andar call kara jaayega 

    handle(req,res){
      
      const handler = this.matchRoute(req);
      
      if(handler){
       // agar handler function mil gaya toh simply call it na

       handler(req,res);
      }
      else{
         res.writeHead(404,{'content-type':'application/json'});
         res.end(JSON.stringify({error:"Handler function for this route not found !"}))
      }

    }
}

module.exports = Router;