describe("Space test", function() {
    it("Matches Values Found", function() {
        const resp = require('../getResponse.js');

    // npm install --save-dev jasmine
        // npx jasmine init
        // npm test

        expect(resp.getResponse("what is your favorite color")).toEqual(jasmine.any(String));
        expect(resp.getResponse("can you name stars")).toEqual(jasmine.any(String));
        expect(resp.getResponse("can you name stars")).toEqual(jasmine.any(String));
        expect(resp.getResponse("can you name stars")).toEqual(jasmine.any(String));
        expect(resp.getResponse("what is your favorite color")).toEqual(jasmine.any(String));
        expect(resp.getResponse("what is your favorite food")).toEqual(jasmine.any(String));
        expect(resp.getResponse("Beans Beans Beans Beans")).toEqual(jasmine.any(String));
        expect(resp.getResponse("4400440404040040324")).toEqual(jasmine.any(String));
        expect(resp.getResponse("null")).toEqual(jasmine.any(String));
        expect(resp.getResponse("Space!")).toEqual(jasmine.any(String));
        expect(resp.getResponse("what is a hypernova")).toEqual(jasmine.any(String));
        expect(resp.getResponse("what is your favorite color")).toEqual(jasmine.any(String));

        expect(resp.posTagger("what is your favourite color")).toEqual(jasmine.any(Array));
        expect(resp.posTagger("4400440404040040324")).toEqual(jasmine.any(Array));
        expect(resp.posTagger("null")).toEqual(jasmine.any(Array));
        expect(resp.posTagger("Space!")).toEqual(jasmine.any(Array));

        expect(resp.wordvec("4400440404040040324!")).toEqual(jasmine.any(String));
        expect(resp.wordvec("what is a hypernova")).toEqual(jasmine.any(String));
        expect(resp.wordvec("what is your favorite color")).toEqual(jasmine.any(String));


        expect(resp.analyzeSentiment("I really hate you bad person just quin")).toBeLessThan(0);
        expect(resp.analyzeSentiment("I love you good work your doing great!")).toBeGreaterThan(0);




    });
});
