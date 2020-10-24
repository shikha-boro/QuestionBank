import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/utility.service';
import html2canvas from 'html2canvas'
import pdfmake from 'pdfmake'
//import { UtilityService } from '../utility.service';

//declare var html2canvas;
declare var jsPDF;

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.scss']
})
export class MultiplicationComponent implements OnInit {

  questionsByPage = []
  questions = [];
  upperRowDigit = '';
  lowerRowDigit = '';
  upperDigit: any = 3;
  lowerDigit: any = 2;
  noOfQuestion: any = 50;


  constructor(private utilityService: UtilityService) { }

  ngOnInit() {

  }
  lowerDigitChanged() {

    setTimeout(_ => {

      if (parseInt(this.lowerDigit) > parseInt(this.upperDigit)) {
        this.lowerDigit = parseInt(this.upperDigit);
      }
      console.log(this.lowerDigit)

    }, 0)
  }
  // xyz(){
  //this.title= Math.random();
  // console.log('clicked ')
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  generateQuestions() {
    this.questionsByPage = [];

    this.questions = [];   //to avoid repeatation  we have to keep the array empty
    for (let i = 0; i < this.noOfQuestion; i++) {
      let singleQuestion = this.generateSingleProblem();
      this.questions.push(singleQuestion);

      if ((i + 1) % 20 == 0) {

        this.questionsByPage.push(this.questions);
        this.questions = [];

      }

    }

    console.log(this.questionsByPage);

  }


  generateSingleProblem() {

    //to get the lower range and upper range based on number of digits
    let range: any = this.utilityService.getRange(this.upperDigit);
    //to get the random number based on the given range
    let firstRow = this.randomNumber(range.lowerRange, range.upperRange)

    //to get the lower range and upper range based on number of digits
    range = this.utilityService.getRange(this.lowerDigit);
    //to get the random number based on the given range
    let secondRow = this.randomNumber(range.lowerRange, range.upperRange);

    //to convert number to Array
    let firstArray = [];
    firstArray = firstRow.toString().split('');



    let secondArray = [];
    secondArray = secondRow.toString().split('');
    for (let i = 0; i < secondArray.length; i++) {
      firstArray.unshift('')
    }





    let secondArrayOriginal = [...secondArray]

    secondArray.unshift('x');
    //to match the size of both array
    while (secondArray.length != firstArray.length) {
      secondArray.unshift('');
    }

    let result: any = {};
    result.firstNumber = firstRow;
    result.secondNumber = secondRow;
    result.answer = result.firstNumber * result.secondNumber;
    result.firstNumberAsArray = firstArray;

    result.secondNumberAsArray = secondArray;
    result.secondNumberAsOriginalArray = secondArrayOriginal;


    return result;

  }


  convertCanvas() {
    console.log(html2canvas)

    let x = document.querySelector("#questionsPlayground");

    this.generateImage(x)
    /*  html2canvas(, <any>{
 
       scale: 2,
       quality: .99
     }).then(canvas => {
 
 
 
       let docDefinition = {
         pageSize: {
           width: 590,
           height: 'auto'
         },
         pageMargins: [2, 2, 2, 2],
         content: [
           {
             image: canvas.toDataURL('image/jpeg'),
             width: 590,
 
           },
 
         ]
       };
 
 
 
        pdfmake.createPdf(docDefinition).download();;
 
 
 
     });
  */
  }

  generateImage(questionsPlayground: any) {

    let foo = function (resolve) {

      html2canvas(questionsPlayground, <any>{
        scale: 2,
        quality: .99
      }).then(canvas => {
        let image = canvas.toDataURL('image/jpeg');

        return resolve(image);
      });

    }
    let x = new Promise(foo);
    return x;



  }

}
