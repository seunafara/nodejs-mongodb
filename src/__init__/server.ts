import express from "express"

class Server {
    port: number;
    app: any;

    constructor(PORT: number){
        this.port = PORT
    }

    create(){
        this.app = express()
        return this
    }

    connectDB(){}

    register(options: Array<String>){
        
        if(options.includes('middleware')) console.log('We have middleware to register');
        if(options.includes('cron')) console.log('We have cron jobs to register');
        
        return this
    }

    start(): void{
        this.app.listen(this.port, () => console.log(`Express is working on port ${this.port}`))
    }
}

export default Server
