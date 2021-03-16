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


imageSection.addEventListener('click',clickHandler);
let maxTrials=5;

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

    for (let j  = 0;j<imgObject.length;j++){
      productViewsArray.push(imgObject[j].views);
    }
    makeChart();
  }
}

function imagNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
showImage();


function makeChart(){
  let productVotesArray=[];
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

    // Configuration options go here
    options: {}
  };

  let barChart = new Chart(myChart,dataBase);

  // var newData = productVotesArray;
  // function saveData(){
  //   if(localStorage.getItem('ProuductVotes') === null){
  //     localStorage.setItem('ProuductVotes',productVotesArray);
  //     console.log('im new data'+newData);
  //   }
  // }saveData();
  // function viewData(){

  //   var oldData=localStorage.getItem('ProuductVotes');
  //   console.log('im old data'+oldData);

  //   oldData.push(newData);
  //   localStorage.setItem('ProuductVotes',JSON.stringify(oldData));
  //   if(localStorage.getItem('ProuductVotes') !== null){
  //     document.getElementById('dataStorage').innerHTML=localStorage.getItem('ProuductVotes');
  //     console.log(JSON.parse(localStorage.getItem('ProuductVotes')));
  //   }
  // }viewData();

  const ul = document.getElementById('dataStorage');
  const dataVotes= JSON.parse(localStorage.getItem('ProuductVotes'));
  function createLi(text){
    const li = document.createElement('li');
    li.textContent= text;
    ul.appendChild(li);
    if(localStorage.getItem('ProuductVotes') === null){
      localStorage.setItem('ProuductVotes',JSON.stringify(productVotesArray));

    }
  }
  for (let a=0;a<nameP.length;a++){
    createLi('The Votes for '+nameP[a]+' is ' +dataVotes[a]);
  }
  const ulV = document.getElementById('views');
  const dataView= JSON.parse(localStorage.getItem('ProuductVotes'));
  function createLiV(text){
    const li = document.createElement('li');
    li.textContent= text;
    ulV.appendChild(li);
    if(localStorage.getItem('ProuductVotes') === null){
      localStorage.setItem('ProuductVotes',JSON.stringify(productViewsArray));

    }
  }
  for (let a=0;a<nameP.length;a++){
    createLiV('The Views for '+nameP[a]+' is ' +dataView[a]);
  }




}
showImage();
// makeChart();




