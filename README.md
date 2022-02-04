# Encode-text-in-images--Steganographic-web-app
Steganography is the practise of concealing information in everyday objects. This particular web application can encode text form information into any image. After the process ends another picture is returned and prepared for download. When examined by naked eye no differences can be spotted which ensures that image will not attract attention and the message stays hidden. After the chosen person receives the image, he/she can decode the message with the same application.  

### Try it out:
If you want you can try it out [here](https://oliver81594.github.io/Encode-text-in-images--Steganographic-web-app/)

### How it works:
#### *Encoding:*
For easier storing, the message is converted as follows: message => characters => ASCI codes => binary  
After the image is uploaded it is drawn into a canvas from which the picture information is extracted by javascript function *getImageData*. 
Then each pixels rgb values are changed either to 0 or 1 based on binary message. I tried to change the alpha value as well but it resulted in image correction which destroyed the message.  
The first and last rgb values (before and after message) are 5. This makes it easier to decode because then javascript will not try to decode things that aren't messages.  

#### *Decoding:*  
Decoding works very similarly. Image is uploaded, sent into canvas, *getImageData*...  
Then I cycle through all rgb values and after I encounter one ending with 5 I start recording binary numbers. After another 5 appears I stop and convert binary into message.

### Compatibility and limitations:
#### *Compatibility:*  
This is web-based application which means that it will run on any device that has internet browser. As far as implemented features go, all up to date browser should work just fine. As for image types all common ones such as .jpg, .png or .gif should be supported. 
#### *Limitations:*  
Since not all characters take up the same amount of space it is impossible to calculate maximum length of message beforehand. You can calculate the approximate number of free bits like this: (will be added soon) where x and y are width and height of the image. 

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
