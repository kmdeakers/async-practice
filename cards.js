"use strict";

let deckId = ""
const BASE_URL = "https://deckofcardsapi.com"
const NEW_DECK_URL = "/api/deck/new/shuffle"

const $cardArea = $("#card-area");
const $cardButton = $("#card-button");


class Deck {
    constructor(){
        this.deckId = ""
    }

    /** gets a deck id from deck of cards api and sets to class */
    async setDeckId() {

        const resp =  await axios.get(`${BASE_URL}${NEW_DECK_URL}`);
        this.deckId =  resp.data.deck_id;
    }

    /** draws a card from a deck and returns JSON of card. logs the card's
     *  suit and value
     */
    async drawCard() {

        const resp = await axios.get(`${BASE_URL}/api/deck/${this.deckId}/draw`)
        console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
        return resp.data.cards[0]


    }


    /** given a card url, shows card on page */
    async showCard() {
        const card = await this.drawCard()
        const url = card.image
        $cardArea.append(`<img src=${url}>`)

    }
}

function handleDrawCard(evt) {
    evt.preventDefault();
    d.showCard();
}

const d = new Deck;
d.setDeckId();
$cardButton.on("click", handleDrawCard)