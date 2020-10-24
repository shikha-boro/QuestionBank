import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  

  getRange(noOfDigits:number):object{
    
    let result={
      upperRange:this.getUpperRange(noOfDigits),
      lowerRange:this.getLowerRange(noOfDigits)
    };
    
    return result;

  }
  getLowerRange(noOfDigits){
   let x=[];
   x.push(1);
   for(let i=0;i<noOfDigits-1;i++)
   {
    x.push(0);
   }
   return parseInt(x.join(''));
  }


  getUpperRange(noOfDigits){
    let x=[];
    for(let i=0;i<noOfDigits;i++)
    {
      x.push('9');
    }
    return parseInt(x.join(''));
  }


}
