# Encode-text-in-images--Steganographic-web-app
This project is a responsive web app that can encode (decode too, if it was encoded the same way) a message/text into a picture.  

### What does it do:
The main function of this app is to hide or uncover, encode or decode any information in form of text into an image. Once the information is encoded it is impossible to tell the difference
between original and edited picture. In the end of this README you will find two images, original and one with hidden message.

### Try it out:
If you want you can try it out [click here](https://oliver81594.github.io/Encode-text-in-images--Steganographic-web-app/)

### How it works:
#### *Encoding:*
For easier storing, the message is converted as follows: message => characters => ASCI codes => binary  
After the image is uploaded it is drawn into a canvas from which the picture information is extracted by javascript function *getImageData*. 
Then each pixels rgb values are changed either to zero or 1 based on binary message. I tried to change the alpha value as well but it resulted in image correction which destroyed the message.  
The first and last rgb values (before and after message) are 5. This makes it easeier to decode because then javascript will not try to decode things that aren't messages.  

#### *Decoding:*  
Decoding works very similarly. Image is uploaded, sent into canvas, *getImageData*...  
Then I cycle through all rgb values and after I encounter one ending with 5 I start recording binary numbers. After another 5 appears I stop and convert binary into message.

### Examples:
*Before image:*  
<img src="./examples/original1.jpg">  
*After image:*  
<img src="./examples/edited1.png">  
*Message:*  
Nearly than 3500 lines of Illiad (by Word line counting)  
*Conclusion:*
As you can see there are no visible changes which means that no one is able to say if a picture hides any information in it. The only way to find out is to try to decode it.


### Things to do:  
1. Show how much more space you have for your text based on image size
2. Encryption
3. Password protection

If you have any ideas, see any bugs or want to contribute please contact me via email on: olimail111@gmail.com
