import { Pipe, PipeTransform } from '@angular/core';
import { Ad } from '../model/ad';

@Pipe({
  name: 'ad'
})
export class AdPipe implements PipeTransform {

  transform(values: Ad[], term?: string): any {
   
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
