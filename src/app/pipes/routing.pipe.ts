import { Pipe, PipeTransform } from '@angular/core';
import { Ad } from '../model/ad';
import { AdRouting } from '../model/ad-routing';

@Pipe({
  name: 'routing'
})
export class RoutingPipe implements PipeTransform {

  transform(values: any, term?: string): any {
   
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
