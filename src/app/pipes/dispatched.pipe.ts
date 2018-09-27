import { Pipe, PipeTransform } from '@angular/core';
import { DispatchedAd } from '../model/dispatched-ad';

@Pipe({
  name: 'dispatched'
})
export class DispatchedPipe implements PipeTransform {

 
  transform(values: DispatchedAd[], term?: string): any {
   
    if(term === null) {return values ;}
    
    return values.filter(
    
      ad =>{
        
        let search = ad.orderNumber + ' '+
                     ad.substrate + ' '+
                     ad.levels + ' '+
                     ad.advertiser + ' '+
                     ad.adSize;

        return search.toLowerCase().includes(term.toLowerCase());
      }

    );
  }
}
