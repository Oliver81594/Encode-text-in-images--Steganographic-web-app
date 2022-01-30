# Encode-text-in-images--Steganographic-web-app
This project is a responsive web app that can encode a message/text into a picture. It changes only the last digit of rgb value of each pixel. 

### How it works:
#### Encoding:
For easier storing, the message is converted as follows: message => characters => ASCI codes => binary
After the image is uploaded it is drawn into a canvas from which the picture information is got by javascript function getImageData. 
Than each pixels rgb values are changed either to zero or 1 based on binary message. I tried to change the alpha value as well but it resulted in image correction which destroyed the message.
The message begins and ends with 5s so it wouldn't try to decode image withot message.
