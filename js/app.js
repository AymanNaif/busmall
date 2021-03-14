'use strict';

const nameP= [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];
const imageSection=document.getElementById('mainSection');
const leftImage=document.getElementById('leftImage');
const centerImage=document.getElementById('centerImage');
const rightImage=document.getElementById('rightImage');

function Product(productName){
  this.productName=productName;
  this.votes=0;
  this.views=0;
  this.path=`./Image/${productName}.jpg`; //${ImgExc}
  Product.array.push(this);
}
Product.array=[];


for(let i=0;i<nameP.length;i++){
  new Product(nameP[i]);

}

function showImage(){
  const leftPic=imagNumber(0,Product.array.length-1);
  const leftPicProduct=Product.array[leftPic];
  leftImage.src=leftPicProduct.path;
  leftImage.title=leftPicProduct.productName;
  leftImage.alt=leftPicProduct.productName;

  const centerPic=imagNumber(0,Product.array.length-1);
  const centerPicProduct=Product.array[centerPic];
  centerImage.src=centerPicProduct.path;
  centerImage.title=centerPicProduct.productName;
  centerImage.alt=centerPicProduct.productName;

  const rightPic=imagNumber(0,Product.array.length-1);
  const rightPicProduct=Product.array[rightPic];
  rightImage.src=rightPicProduct.path;
  rightImage.title=rightPicProduct.productName;
  rightImage.alt=rightPicProduct.productName;
}

let resultArray=[];
imageSection.addEventListener('click',clickHandler);
function clickHandler(event){
  if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage'){
    for(let i=0;i<Product.array.length;i++){
      if (Product.array[i].productName === event.target.title){
        Product.array[i].votes++;
        Product.array[i].views++;
        resultArray.push(Product.array[i]);
      }
    }console.log(resultArray);
    showImage();
  }
}

function imagNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
showImage();



