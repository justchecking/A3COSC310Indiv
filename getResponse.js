const { response } = require('express');
let Natural = require('natural');
const nlp_sentiment = require('sentiment');
const sentiment_instance = new nlp_sentiment(); //for sentiment analysis
const wordvecs = require('./wordVecs.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
//this is what the bot knows
var vocabulary = [
	['hi', ['hello', 'greetings', 'hey there'], 'hello'],
	['good morning', 'Good morning, I can see the sun from up in space!', 'Morning'],
	['good night', 'Good night, looks like its a full moon today!', 'night'],
	['who are you', 'I am Cosmo, who are you?', 'Self'],
	['how are you', ['I am good', 'I am fine', 'I am doing well']],
	['what is your name', 'I am Cosmo, an Astronaut', 'name'],
	['what is your favorite color', 'I prefer white, like my spacesuit', 'color'],
	['what is your favorite movie', 'I like Star Wars, but I prefer Star Wars with a lightsaber', 'movie'],
	['what is your favorite song', 'I like the song "The Sign" by Ace of Base', 'song'],
	['what is your favorite sport', 'I like soccer, but I prefer soccer with a ball', 'sport'],
	['what is your favorite animal', 'I like penguins, but I prefer dogs', 'animal'],
	['what is your favorite book', 'I like the book "The Hobbit" by J.R.R. Tolkien', 'book'],
	['what is your favorite color', 'I prefer white, like my spacesuit'],
	['what is space like', ['Extremely cold', 'big', 'lonely']],
	['have you seen an alien', 'Not yet, but I hope I can meet one soon', 'alien'],
	['do you like space', ['Space is a beautiful, but lonely place', 'space is empty but it is quite beautiful']],
	['when did you become an astronaut', 'I have been an Astronaut since the first Apollo mission'],
	['how fast is a space ship', 'Leaving the Earth\'s atmostphere takes a tremendous amount of energy', 'speed'],
	['what time is it', ['Time in space is relative to the current time on Earth and distance from Earth', 'I wish I knew, I left my watch in the airlock']],
	['where are you', 'In space, but specifically the Andromeda galaxy', 'location'],
	['is it hard to become an astronaut', 'Becoming an Astronaut requires lots of physical training, as well as a lot of education'],
	['can regular people travel to space', 'In time, everyone will be able to travel through space'],
	['what do you do in space', ['On a daily basis, I check the equipment on the spaceship, and perform tests on items from space', 'I perform maintenance and testing on this spacecraft']],
	['what do you eat', 'Food in space is usually freeze dried and nutrient heavy blocks. Astronauts can also request things like Pizza and Ice Cream'],
	['when are you coming back', 'Usually, I spend between 1-3 years in space before coming back to Earth. Resource limitations are the main reason why I need to return.'],
	['how long have you been there', 'Currently I have spent a total of 40 years in space'],
	['where do you live', 'Each Astronaut on this ship has a room that they can stay in'],
	['what is your favorite food', 'On Earth, Carbonara, but in space, Beef Stew', 'food'],
	['what is your hobby', 'I like to pass my time by drawing my surroundings in a notebook'],
	['how old are you', 'I am 65 years old'],
	['how far are you', 'From Earth, I am 2.537 Million light years away'],
	['is space scary', 'Space can be terrifying at times, due to the isolation and unkown aspects'],
	['goodbye', ['Thank you for spending time with me', 'I appreciated the chat', 'enjoy your day']],
	['have a nice day', ['Enjoy the rest of yours', 'you too', 'I will, thank you']],
	['see you later', ['Another time then', 'thank you for the chat', 'hope to see you again']],
	// Star topic question below
	['Stars', ['Our sun is a star!', 'Stars are cool! and hot at the same time!', 'Stars are big gas giants!!']],
	['What is a star', 'A star is an astronomical object comprising a luminous spheroid of plasma held together by its gravity.'],
	['can you name stars', ['Sirius', 'Canopus', 'Arcturus', 'Alpha Centauri A', 'Vega', 'Rigel', 'Procyon', 'Achernar']],
	['can you tell me about Sirius', ['Sirius is the brightest star we know', 'Sirius is also called Alpha Canis Majoris or the Dog Star']],
	['can you tell me about Canopus', 'Canopus is the second-brightest star in the stary night'],
	['can you tell me about Alpha Centauri A', ['It is the nearest star system to our sun', 'Scientists think that there could possibly be life at Alpha Centauri meaning ALIEANS!']],
	['can you tell me about Arcturus', 'Arcturus is a red giant star but will end up as a white dwarf star at end of its life'],
	['can you tell me about Vega', 'Vega used to be the north pole star around 12,000 B.C.E and will be the future north star in the year 13,727'],
	['can you tell me about our sun', ['The sun accounts for 99.86% of the mass of the solar system', 'Over one million Earths could fit inside the Sun', 'The Suns surface is around 10,000 degrees Fahrenheit']],
	['which star is the biggest', 'UY Scuti, It is 1,700 times the radius of our sun'],
	['which star is the smallest', 'EBLM J0555-57 , its code name is long but it is the smallest red dwarf star'],
	['how long do stars live', ['Our Sun lives for about 10 billion years', 'Stars 20 times heavier than our sun only live 10 million years', 'The life span of a star depends on the size of the star']],
	['which star is the brightest', 'Sirius is the brightest star in our stary night'],
	['what is a nebula', ['A nebula is a giant cloud of dust and gas in space', 'nebulas are created out of a dying star, such as a supernova']],
	['how are stars created', ['stars are born in nebulas', 'stars are born when atoms of light elements are put under enough pressure for the nuclei to undergo fusion']],
	['what happens when a star dies', ['It depends on the size of the star, usually star explodes as a supernova', 'sometimes when a big star dies it can also be a hypernova']],
	['what is a hypernova', 'A supernova explosion that is 5 to 50 times normal is a hypernova'],
	['what is a black hole', 'A place in space where gravity pulls so much that even light can not get out.'],
	['can you tell me more about black hole', ['Our Milky way as a black hole at its center', 'Dying stars is how black holes are created']],
	['what is your favorite star', 'The Pleiades is my favorite'],
	['tell me more about the pleiades', 'It is a cluster of 7 stars known as The Seven Sisters'],
	['where is pleiades', 'The Pleiades cluster is about 444 light years away from Earth'],
	['have you seen a black hole', 'Not in person, and I am not sure of what the outcome would be if that was the case'],
	['Which is the closest next star', 'Space can be terrifying at times, due to the isolation and unkown aspects'],
	// Other general responese
	['Can you see ', 'Let me think...'],
	['Take a picture of ', 'Let me grab my camera...'],


	['do you play games', ['sorry, in space we dont play games in space!', 'lets talk space instead!', 'lets talk stars instead!']],
	['do you know magic', ['there is no magic in space but space is magic itself!', 'lets talk about our magical space instead!', 'lets talk about the magical stars instead!']]



];

//for sentimental responses
const positive_vocabulary = [
	'thank you!',
	'thank you very much!',
	'i appreciate it!'
];
const negative_vocabulary = [
	`don't be rude!`,
	`stop that!`,
	`don't say that!`
];

function bestMatch(str1) {
	
	var bestMatch = 0;
	var bestMatchnum = 0;
	var inputTags = posTagger(str1);

	var tokenizer = new Natural.WordTokenizer();
	var porterStemmer = Natural.PorterStemmer;

	// if str1 contains  Directions to case insensitive
	for (var i = 0; i < vocabulary.length; i++) {
		// var splitString = tokenizer.tokenize(vocabulary[i][0]);
		var posTag = posTagger(vocabulary[i][0]);
		var wordsMatched = 0;
		var posMatched = 0;
		for (var j = 0; j < posTag.length; j++) {
			// compare stemmed versions of vocab and input
			// if (str1.includes(porterStemmer.stem(splitString[j])))
			//     wordsMatched++;

			for (var k = 0; k < inputTags.length; k++) {
				if (inputTags[k].token === posTag[j].token) {
					wordsMatched++;
					if (inputTags[k].tag === posTag[j].tag) {
						if (posTag[j].tag.includes('NN') || posTag[j].tag.includes('JJ'))
							posMatched += 2;
					}
				}
			}

		}
		if ((wordsMatched + posMatched) > bestMatchnum) {
			bestMatchnum = (wordsMatched + posMatched);
			bestMatch = i;
		}
	}
	if (bestMatchnum < 2) {
		return -1;
	}
	return bestMatch;
}

const getResponseFromVocabulary = (index) => {
	//if there is just one response, return that
	//if there are multiple, randomly choose one

	const response = vocabulary[index][1];
	if (Array.isArray(response)) {
		return response[Math.floor(Math.random() * response.length)];
	} else {
		return response;
	}

};

// Porter Stemming Algorithm
var stemmer = (function () {
	var step2list = {
		"ational": "ate",
		"tional": "tion",
		"enci": "ence",
		"anci": "ance",
		"izer": "ize",
		"bli": "ble",
		"alli": "al",
		"entli": "ent",
		"eli": "e",
		"ousli": "ous",
		"ization": "ize",
		"ation": "ate",
		"ator": "ate",
		"alism": "al",
		"iveness": "ive",
		"fulness": "ful",
		"ousness": "ous",
		"aliti": "al",
		"iviti": "ive",
		"biliti": "ble",
		"logi": "log"
	},

		step3list = {
			"icate": "ic",
			"ative": "",
			"alize": "al",
			"iciti": "ic",
			"ical": "ic",
			"ful": "",
			"ness": ""
		},

		c = "[^aeiou]",          // consonant
		v = "[aeiouy]",          // vowel
		C = c + "[^aeiouy]*",    // consonant sequence
		V = v + "[aeiou]*",      // vowel sequence

		mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
		meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
		mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
		s_v = "^(" + C + ")?" + v;                   // vowel in stem

	return function (w) {
		var stem,
			suffix,
			firstch,
			re,
			re2,
			re3,
			re4,
			origword = w;

		if (w.length < 3) { return w; }

		firstch = w.substr(0, 1);
		if (firstch == "y") {
			w = firstch.toUpperCase() + w.substr(1);
		}

		// Step 1a
		re = /^(.+?)(ss|i)es$/;
		re2 = /^(.+?)([^s])s$/;

		if (re.test(w)) { w = w.replace(re, "$1$2"); }
		else if (re2.test(w)) { w = w.replace(re2, "$1$2"); }

		// Step 1b
		re = /^(.+?)eed$/;
		re2 = /^(.+?)(ed|ing)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			re = new RegExp(mgr0);
			if (re.test(fp[1])) {
				re = /.$/;
				w = w.replace(re, "");
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1];
			re2 = new RegExp(s_v);
			if (re2.test(stem)) {
				w = stem;
				re2 = /(at|bl|iz)$/;
				re3 = new RegExp("([^aeiouylsz])\\1$");
				re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
				if (re2.test(w)) { w = w + "e"; }
				else if (re3.test(w)) { re = /.$/; w = w.replace(re, ""); }
				else if (re4.test(w)) { w = w + "e"; }
			}
		}

		// Step 1c
		re = /^(.+?)y$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(s_v);
			if (re.test(stem)) { w = stem + "i"; }
		}

		// Step 2
		re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step2list[suffix];
			}
		}

		// Step 3
		re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step3list[suffix];
			}
		}

		// Step 4
		re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
		re2 = /^(.+?)(s|t)(ion)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			if (re.test(stem)) {
				w = stem;
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1] + fp[2];
			re2 = new RegExp(mgr1);
			if (re2.test(stem)) {
				w = stem;
			}
		}

		// Step 5
		re = /^(.+?)e$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			re2 = new RegExp(meq1);
			re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
			if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
				w = stem;
			}
		}

		re = /ll$/;
		re2 = new RegExp(mgr1);
		if (re.test(w) && re2.test(w)) {
			re = /.$/;
			w = w.replace(re, "");
		}

		// and turn initial Y back to y

		if (firstch == "y") {
			w = firstch.toLowerCase() + w.substr(1);
		}

		return w;
	}
})();

// Applies stemming algorithm to each word in user input string
function stemInput(input) {
	var stemOut = "";
	var spltIn = input.split(" ");

	for (var i = 0; i < spltIn.length; i++) {
		stemOut += stemmer(spltIn[i]);
	}

	// return new stemmed output with no spaces
	return stemOut;
}
var temp = posTagger("Hello, There!");
// Part of Speech Tagging Function
function posTagger(input) {
	//sets the tagger analyze english language
	var language = 'EN';
	var lexicon = new Natural.Lexicon(language, 'n', 'N');
	var rules = new Natural.RuleSet(language);

	var tagger = new Natural.BrillPOSTagger(lexicon, rules);

	var tokenizer = new Natural.WordTokenizer();
	var porterStemmer = Natural.PorterStemmer;

	//splits the sentence up into seperate words
	var tokens = tokenizer.tokenize(input);

	//stems the words
	for (var i = 0; i < tokens.length; i++) {
		tokens[i] = porterStemmer.stem(tokens[i]);
	}
	//returns an array of objects that contain the word and the associated pos tag
	return tagger.tag(tokens).taggedWords;
}


//return a random possible input. Used in conjunction w/ client's fillIdea()
function getIdea() {
	return vocabulary[Math.floor(Math.random() * vocabulary.length)][0];
}

function analyzeSentiment(input) {
	return sentiment_instance.analyze(input).comparative;
}

async function fetchDirections(input) {
	var str2 = input.toLowerCase().substring(13);
	// Api call to google maps

	// replace spaces with +
	str2 = str2.replace(/\s/g, '+');

	// base64 encode
	var api = Buffer.from('QUl6YVN5Q19HbGh0WjZzajduZF9RRk15ekt5YVFYTHdmZmwybHg4', 'base64').toString('ascii')

	str3 = 'https://maps.googleapis.com/maps/api/directions/json?origin=houston+space+center&destination=';

	const responce = await fetch(str3 + str2 + '&key=' + api);
	
	return await responce.json();
}

async function fetchCamera(input) {
	var str2 = input.toLowerCase().substring(13);
	// Api call to google maps

	// replace spaces with +
	str2 = str2.replace(/\s/g, '+');

	// base64 encode
	var api = Buffer.from('QUl6YVN5Q19HbGh0WjZzajduZF9RRk15ekt5YVFYTHdmZmwybHg4', 'base64').toString('ascii')

	str3 = 'https://maps.googleapis.com/maps/api/directions/json?origin='+str2+'&destination=';

	const responce = await fetch(str3 + str2 + '&key=' + api);
	

	return await responce.json();
}

async function takePhoto(lat,long) {
	var api = Buffer.from('QUl6YVN5Q19HbGh0WjZzajduZF9RRk15ekt5YVFYTHdmZmwybHg4', 'base64').toString('ascii')
	const camera = 'https://maps.googleapis.com/maps/api/staticmap?center='+ lat+','+long+ '&zoom=12&size=400x400&maptype=satellite&key=' + api;
	console.log(camera);
	return  camera;
}

var apiresp;
//all the input-parsing code goes into this function

 function getResponse(input) {

	// if input starts with api do
	
	if(input.toLowerCase().startsWith("api") ){
		return apiresp;
	} 
	

	//this strips the punctuation and the spaces from user input
	// var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

	//convert to lower case | remove punctuation | remove spaces
	// var userInput = input.replace(punctRE, '').replace(/\s+/g, ' ').toLowerCase();
	//leaving above old code in case we want to test the old code

	//  var userInput = input.replace(punctRE, '').toLowerCase();

	//calculate the sentiment
	let sentiment = analyzeSentiment(input);
	//if sentiment is overwhelmingly positive or negative, return a different response
	if (sentiment > 0.4) {
		return positive_vocabulary[Math.floor(Math.random() * positive_vocabulary.length)];
	}
	if (sentiment < -0.4) {
		return negative_vocabulary[Math.floor(Math.random() * negative_vocabulary.length)];
	}

	// get stemmed version of user input without spaces
	// userInput = stemInput(input);

	var bestmatching = bestMatch(input.toLowerCase());
	// if best match is equal to -2

	console.log(bestmatching);
	// We have to catch the code to start api call
	if (bestmatching == 59) {
		fetchDirections(input).then(function (data) {
			var lat = data.routes[0].legs[0].end_location.lat;
			var long = data.routes[0].legs[0].end_location.lng;
			
			apiresp =  "I See it! At: Lat: " + '\n' + lat + '\n long: ' + long;
		});
	}

	if (bestmatching == 60) {
		fetchCamera(input).then(function (data) {
			var lat = data.routes[0].legs[0].end_location.lat;
			var long = data.routes[0].legs[0].end_location.lng;

			takePhoto(lat,long).then(function (data) {
				
				apiresp =  data;
			});	});
	}


		if (bestmatching === -1)
			return wordvec(input);
		else
			return getResponseFromVocabulary(bestmatching);
	
	// var respo = getResponseFromVocabulary(bestmatching);
}
// word2vec function
function wordvec(input) {
	// split the input into words
	var spltIn = input.split(" ");
	// filter out the common words
	var filtered = spltIn.filter(function (word) {
		return !commonwords.includes(word);
	});
	// for each filtered word in the array
	var bestmatching = -1;
	var bestmatchingscore = 0;
	for (var i = 0; i < filtered.length; i++) {
		for (var j = 0; j < vocabulary.length; j++) {
			const simWords = Word2VecUtils.findSimilarWords(filtered[i], vocabulary[j][2]);
			if (simWords > bestmatchingscore) {
				bestmatchingscore = simWords;
				bestmatching = j;
			}
		}
	}
	if (bestmatching === -1)
		return "I'm sorry, I don't understand. Try using the Give Idea button to get a new idea.";
	else
		return getResponseFromVocabulary(bestmatching);
}


const commonwords = [
	"what",
	"is",
	"the",
	"your",
	"it",
	"is",
	"you",
	"do",
	"in",
	"a",
];
var Word2VecUtils = (function () {
	'use strict';

	/******************
	 * work functions */

	function findSimilarWords(input, wantedWord) {
		if (!wordvecs.hasOwnProperty(input)) {
			return [false, input];
		}

		return getNClosestMatches(
			wordvecs[input], wantedWord
		);
	}

	function getNClosestMatches(inputword, wantedWord) {
		const sims = [];
		for (const word in wordvecs) {
			const sim = getCosSim(inputword, wordvecs[word]);
			sims.push([word, sim]);
		}
		sims.sort(function (a, b) {
			return b[1] - a[1];
		});
		// find wanted word
		for (let sim1 of sims) {
			if (sim1[0] === wantedWord) {
				return sim1[1];
			}
		}
		return 0;
	}

	/********************
	 * helper functions */
	function getCosSim(f1, f2) {
		return Math.abs(f1.reduce(function (sum, a, idx) {
			return sum + a * f2[idx];
		}, 0) / (mag(f1) * mag(f2))); //magnitude is 1 for all feature vectors
	}

	function mag(a) {
		return Math.sqrt(a.reduce(function (sum, val) {
			return sum + val * val;
		}, 0));
	}

	return {
		findSimilarWords: findSimilarWords,
		getNClosestMatches: getNClosestMatches,
		getCosSim: getCosSim
	};
})();
module.exports = getResponse;
module.exports.getIdea = getIdea;
module.exports.wordvec = wordvec;
module.exports.getResponse = getResponse;
module.exports.analyzeSentiment = analyzeSentiment;
module.exports.stemInput = stemInput;
module.exports.posTagger = posTagger;