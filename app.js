"use strict"

const BASE_URL = "http://numbersapi.com/";
const $numsFacts = $("#nums-facts");
const $numFacts = $("#num-facts");
const $numFact = $("#num-fact")

/**Takes a number, gets a fact from numbers api and places it in the DOM.
 */

//change function name

async function showNumberFact(num) {

    const resp = await axios.get(`${BASE_URL}${num}?json`);

    $numFact.append(resp.data.text);
}

/**Takes an array of numbers, gets a fact for each number from the numbers api
 * and places them in the DOM
 */
async function showNumbersFacts(nums) {

    const numString = nums.join();

    const resp = await axios.get(`${BASE_URL}${numString}?json`);

    // console.log("resp.data: ", resp.data)

    for (let num in resp.data) {
        $numsFacts.append(resp.data[num]);
        $numsFacts.append("<br>");
    }

}

/**Takes a number and gets any number of facts from the numbers (default value is 4) 
 * api and places them in the DOM.
 */
async function showNumberFacts(num, numFacts = 4) {

    let factsP = [];

    for (let i = 0; i < numFacts; i++) {
        const resp = axios.get(`${BASE_URL}${num}?json`);
        factsP.push(resp);
    }
    ////facts could be renamed
    const factsData = await Promise.allSettled(factsP);

    const facts = factsData.filter(f => f.status === "fulfilled").map(f => f.value.data.text)

    ////TODO check for rejections
    for (let fact of facts) {
        $numFacts.append(fact);
        $numFacts.append("<br>");
    }
}