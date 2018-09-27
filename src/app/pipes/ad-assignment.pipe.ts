import { Pipe, PipeTransform } from '@angular/core';
import { Ad } from '../model/ad';
import { AdAssignment } from '../model/ad-assignment';

@Pipe({
  name: 'adAssignment'
})
export class AdAssignmentPipe implements PipeTransform {

  transform(values: AdAssignment[], term?: string): any {
   
    if(term === null) {return values ;}
    
    return values.filter(
    
      adAssignment =>{
        let ad = adAssignment.ad;

        let search = ad.orderNumber + ' '+
                     ad.substrate + ' '+
                     ad.levels + ' '+
                     ad.advertiser + ' '+
                     ad.adSize + ' '
                     adAssignment.artist.name+' '+
                     adAssignment.dp.name+' '
                     adAssignment.qa.name+' ';

        return search.toLowerCase().includes(term.toLowerCase());
      }

    );
  }

}
