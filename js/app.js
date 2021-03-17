'use strict';

const nameP= ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
const imageSection=document.getElementById('mainSection');
const leftImage=document.getElementById('leftImage');
const centerImage=document.getElementById('centerImage');
const rightImage=document.getElementById('rightImage');
let imgObject = [];
let productViewsArray = [];
function Product(productName){
  this.productName=productName;
  this.votes=0;
  this.views=0;
  this.path=`./Image/${productName}.jpg`; //${ImgExc}
}

for(let i  = 0;i < nameP.length;i++){
  imgObject.push(new Product(nameP[i]));
}

let allImgs = [22,22,22];

function showImage(){
  let i = 0;
  let leftPic=imagNumber(0,imgObject.length-1);

  while (i < 1){
    if (allImgs.includes(leftPic)){
      leftPic = imagNumber(0,imgObject.length-1);
    }else{
      allImgs[0] = leftPic;
      imgObject[leftPic].views +=1;
      i = 1;
    }
  }
  leftImage.src=imgObject[leftPic].path;
  leftImage.title=imgObject[leftPic].productName;
  leftImage.alt=imgObject[leftPic].productName;

  i = 0;

  let centerPic=imagNumber(0,imgObject.length-1);

  while (i < 1){
    if (allImgs.includes(centerPic) || centerPic === leftPic){
      centerPic = imagNumber(0,imgObject.length-1);
    }else{
      allImgs[1] = centerPic;
      imgObject[centerPic].views +=1;
      i = 1;
    }
  }
  centerImage.src=imgObject[centerPic].path;
  centerImage.title=imgObject[centerPic].productName;
  centerImage.alt=imgObject[centerPic].productName;

  i = 0;

  let rightPic=imagNumber(0,imgObject.length-1);

  while (i < 1){
    if (allImgs.includes(rightPic) || rightPic === leftPic || rightPic === centerPic){
      rightPic = imagNumber(0,imgObject.length-1);
    }else{
      allImgs[2] = rightPic;
      imgObject[rightPic].views +=1;
      i = 1;
    }
  }
  rightImage.src=imgObject[rightPic].path;
  rightImage.title=imgObject[rightPic].productName;
  rightImage.alt=imgObject[rightPic].productName;
}

// function addEveryThing (){
imageSection.addEventListener('click',clickHandler);
let maxTrials=25;

function clickHandler(event){
  maxTrials-=1;
  if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage'){
    for(let i=0;i<imgObject.length;i++){
      if (imgObject[i].productName === event.target.title){
        imgObject[i].votes++;
      }
    }

    showImage();
  }if(maxTrials===0){
    imageSection.removeEventListener('click',clickHandler);
    localStorage.setItem('imgObject',JSON.stringify(imgObject));
    for (let j  = 0;j<imgObject.length;j++){
      productViewsArray.push(imgObject[j].views);
    }
    makeChart();
  }

}
// }


function imagNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
showImage();
let productVotesArray=[];
function makeChart(){
  for (let i=0;i<imgObject.length;i++){
    productVotesArray.push(imgObject[i].votes);
  } // console.table(productVotesArray); Votes data array

  // console.log(localStorage.getItem('ProuductVotes') );



  let myChart = document.getElementById('myChart').getContext('2d');

  let dataBase={
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
      labels:nameP,
      datasets: [{
        label: 'Votes',
        backgroundColor: '#2c061f',
        borderColor: '#caf7e3',
        data: productVotesArray
      },{
        label:'Views',
        backgroundColor: '#ff577f',
        borderColor: '#caf7e3',
        data: productViewsArray
      }
      ]
    },


    options: {}
  };

  let barChart = new Chart(myChart,dataBase);


}
showImage();

function getData(){
  let getItem=JSON.parse(localStorage.getItem('imgObject'));
  if( JSON.parse(localStorage.getItem('imgObject'))=== null){
    console.log('hello');
  }
  else{
    imgObject=getItem;
  }
}

getData();
