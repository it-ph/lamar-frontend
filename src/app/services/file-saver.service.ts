import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor() { }



  saveFile(b64Data:string, contentType: string, fileName:string){
    let blob = new Blob([this.base64ToArrayBuffer(atob(b64Data))],{type: contentType});
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    
    setTimeout(function(){
        console.log('timer starting');
        //window.URL.revokeObjectURL(url);  
        document.body.removeChild(a);
    }, 2000); 
  }

  private base64ToArrayBuffer(b64String: string){
    let buffer = new ArrayBuffer(b64String.length);
    let view = new Uint8Array(buffer);
    for(let i=0; i < b64String.length; i++){
      view[i] = b64String.charCodeAt(i) & 0xFF;
    }
    return view;
  }
}
