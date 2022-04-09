
# Chatting with an Astronaut 

Using the power of our chat engine you can simulate talking to a Astronaut!



![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Astronaut_(97576)_-_The_Noun_Project.svg/512px-Astronaut_(97576)_-_The_Noun_Project.svg.png)

## Authors

- [@John Elder](https://github.com/justchecking)
- Team
- [@Colin Pereira](https://github.com/ZuShi0)
- [@Harshal Patel](https://github.com/Harshal609)
- [@Jake Tyerman](https://github.com/jtyrmn)  
- [@Jarod Guigon](https://github.com/J10C3G7)


## Api used
- Google Flat Maps
- Google Maps Directions


## New Features:

### Photo from space:
You can use the phrase Take a photo of, to see what a area may look like from space! This will use the google static maps api to return an image of the selected area and return it to the user.

### Can you see to:
You can ask if the bot can see somewhere the chat bot can now tell you the exact position and location of the landmark. This uses google maps directions api to find directions and the location.


Sentiment Analysis Integration:

Sentiment Analysis allows the bot to determine if a user’s input has a friendly or condescending attitude. If the user’s input is overwhelmingly positive, the bot will respond with a specific message (“thank you!”, “I appreciate it!”, etc). Likewise, the bot will have a defensive message (‘stop being rude!”, etc).
Example of Improvement:
Previously, the bot would have the same responses for input that is extremely friendly or offensive like a robot that couldn’t recognize emotion in human speech. Now that the bot responds more naturally to sentimental input, it feels a lot more realistic and human (despite being a bot).

![Logo](https://i.imgur.com/rXmkJNj.jpg)



## Word2Vec Integration
Description of improvements:

From Google's Word2Vec project. This is used to help if there is very little information given. For example if the user only inputs Beans, This will match to no responses as we don't know the best output. 

Example of improvement:

Before with little information the bot would just reply with hello as there was not enough data to give a response. Now it can understand the meaning of single words and find the response that most closely matches the input, giving a response close to what the user may want.



![Logo](https://i.imgur.com/r23F6xn.jpg)


## POS Tagging Integration
POS (Part-of-Speech) Tagging was integrated so that we could have a way to categorize words. POS Tagging can be used to help the system better interpret what a user is saying, and potentially formulate more candid responses based on probability.   
Example of improvement
Previously the algorithm just matched words, with POS Tagging it also assigns a score based on matched words being identified as a noun or adjective, as these two types of words seem to most distinguish the different prompts. For instance, without POS tagging typing in "what are your opinions on aliens?" before would match up with "what is your name" and display it's response, now it matches with 'have you seen an alien' and displays it's response, which gives a more on point response.

## Porter Stemmer Algorithm
The Porter Stemmer Algorithm was integrated into our system with the intent of reducing the chance that a user’s input could be taken the wrong way. The algorithm works to remove any common inflexional endings from words in English. For example, cooking would turn into cook, when stemmed. By running the stemming algorithm on each word in the user’s input string, and on each word in the chatbot’s vocabulary string, we can have a more normalized comparison of both strings, which could give the system a higher chance of selecting the correct response. 
The initial stemming algorithm was later replaced by a stemming algorithm that was part of the library used for the POS Tagging system. 
Example of improvement:
    Due to the way that our selection algorithm works, there isn’t a good way to demonstrate the improvement. The stemming works to reduce any extra endings in tags from the POS system before the selection algorithm compares tags.

## Extra Agent Topic
The extra topic we chose to add to our system revolved around Stars, and facts about specific stars. Our original topic of Space correlates to Stars quite strongly, and we felt that it would be a fun and interesting addition to the chatbot’s repertoire. This improved the quality of the conversation through a wider variety of responses, and varying responses to certain questions. 
Example of improvement


![Logo](https://i.imgur.com/9TMCr3H.jpg)

## 5 Responses Outside 2 Topics
In addition to the extra topic, and the original topic, the chatbot can also respond in a more general sense to inputs that are outside of the scope of both topics. We’ve added responses that are generic enough that they could be seen as “natural” responses to things outside of its focus. 
Example of improvement
![logo](https://i.imgur.com/3SFdzGw.jpg)


## Client/Server Interaction via Node
In the previous iteration of this project, we hosted the program as a github.io site, which was perfectly fine for our previous application. In the current iteration, since we needed to integrate certain toolkits and Node modules, we decided to host the program via Node. This enabled us to freely use Node modules, and let us split input/output on the client side, and processing on the server side. 


Example of improvement

Before we hosted the website on a Node server, all of our logic was on the client. This is extremely limiting for multiple reasons. For example, it would be very difficult to use complex NLP frameworks and libraries that were necessary for the project. We would need CDNs (content distribution networks) to send the entire libraries to the browser every time someone would connect to the website, causing network stress on both the CDN and client. Using CDNs is beyond the scope of the project anyways. Another blockade would be that since an API wouldn’t exist, we wouldn’t be able to fulfill the specification of 5 API features. Since we decided to use Node, we were able to easily overcome all these major issues with minimal effort and time.




## License

[MIT](https://choosealicense.com/licenses/mit/)

## Setup
You must have `npm` and `nodejs` installed on your system. https://nodejs.org/en/download/

clone the project
```
git clone https://github.com/COSC-310-team-11/A3COSC310-Team11.github.io
````

install all the npm dependencies
```
npm install
```
you may need to install node fetch
```
npm install node-fetch@2
```
## Run
```
npm start
```
The site can be viewed at `http://localhost:4000/`
