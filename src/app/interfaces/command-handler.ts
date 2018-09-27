import { QueueListener } from "./queue-listener";

export class CommandHandler{

    private listener: QueueListener;
    setListener(listener: QueueListener):void{
        this.listener = listener;
    }
    getListener(): QueueListener{
        return this.listener;
    }

    
}