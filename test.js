let Natural = require('natural');
var str = 'hi';
var vocabulary = [
    ['hi', ['hello', 'greetings', 'hey there']],
    ['good morning', 'Good morning, I can see the sun from up in space!'],
    ['good night', 'Good night, looks like its a full moon today!'],
    ['who are you', 'I am Cosmo, who are you?'],
    ['how are you', ['I am good', 'I am fine', 'I am doing well']],
    ['what is your name', 'I am Cosmo, an Astronaut'],
    ['what is your favorite color', 'I prefer white, like my spacesuit'],
    ['what is space like', ['Extremely cold', 'big', 'lonely']],
    ['have you seen an alien', 'Not yet, but I hope I can meet one soon'],
    ['do you like space', ['Space is a beautiful, but lonely place', 'space is empty but it is quite beautiful']],
    ['when did you become an astronaut', 'I have been an Astronaut since the first Apollo mission'],
    ['how fast is a space ship', 'Leaving the Earth\'s atmostphere takes a tremendous amount of energy'],
    ['what time is it', ['Time in space is relative to the current time on Earth and distance from Earth', 'I wish I knew, I left my watch in the airlock']],
    ['where are you', 'In space, but specifically the Andromeda galaxy'],
    ['is it hard to become an astronaut', 'Becoming an Astronaut requires lots of physical training, as well as a lot of education'],
    ['can regular people travel to space', 'In time, everyone will be able to travel through space'],
    ['what do you do in space', ['On a daily basis, I check the equipment on the spaceship, and perform tests on items from space', 'I perform maintenance and testing on this spacecraft']],
    ['what do you eat', 'Food in space is usually freeze dried and nutrient heavy blocks. Astronauts can also request things like Pizza and Ice Cream'],
    ['when are you coming back', 'Usually, I spend between 1-3 years in space before coming back to Earth. Resource limitations are the main reason why I need to return.'],
    ['how long have you been there', 'Currently I have spent a total of 40 years in space'],
    ['where do you live', 'Each Astronaut on this ship has a room that they can stay in'],
    ['what is your favorite food', 'On Earth, Carbonara, but in space, Beef Stew'],
    ['what is your hobby', 'I like to pass my time by drawing my surroundings in a notebook'],
    ['how old are you', 'I am 65 years old'],
    ['how far are you', 'From Earth, I am 2.537 Million light years away'],
    ['what is your favorite star', 'The Pleiades is my favorite'],
    ['tell me more about the pleiades', 'It is a cluster of 7 stars known as The Seven Sisters'],
    ['where is pleiades', 'The Pleiades cluster is about 444 light years away from Earth'],
    ['have you seen a black hole', 'Not in person, and I am not sure of what the outcome would be if that was the case'],
    ['is space scary', 'Space can be terrifying at times, due to the isolation and unkown aspects'],
    ['goodbye', ['Thank you for spending time with me', 'I appreciated the chat', 'enjoy your day']],
    ['have a nice day', ['Enjoy the rest of yours', 'you too', 'I will, thank you']],
    ['see you later', ['Another time then', 'thank you for the chat', 'hope to see you again']]
];
var porterStemmer = Natural.PorterStemmer;
var temp = posTagger(vocabulary[6][0].toLowerCase());
for (var i = 0; i < temp.length; i++){
	temp[i].token = porterStemmer.stem(temp[i].token);
}

console.log(temp);
var temp2 = temp[0].token;
console.log(temp2);
// Tokenizes a string and creates 
function posTagger(input){
		var language = 'EN';
	var lexicon = new Natural.Lexicon(language, 'n', 'N');
	var rules = new Natural.RuleSet(language);

	var tagger = new Natural.BrillPOSTagger(lexicon, rules);

	var tokenizer = new Natural.WordTokenizer();
	// var porterStemmer = Natural.PorterStemmer;

	var tokens = tokenizer.tokenize(input);
	
	// for (var i = 0; i < tokens.length; i++){
	// 	tokens[i] = porterStemmer.stem(tokens[i]);
	// }
	return tagger.tag(tokens).taggedWords;
}