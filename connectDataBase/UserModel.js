require('./configDataBase').connectBaseDate
const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    question: {
        type: String
    },
    response: {
        type: String
    }
});

const ClientSchema = new mongoose.Schema({
    id_Client: {
        type: String
    },
    email_Client: {
        type: String
    },
    payment_Value: {
        type: Number
    },
    expiration_Date: {
        type: Date
    }
})

const ChavesTokenClient = new mongoose.Schema({
    token: {
        type: String
    }
})

const FAQModel = mongoose.connection.useDb('telegramDataBase').model('Faq_Client', FAQSchema)
const ClientModel = mongoose.connection.useDb('telegramDataBase').model('Client_Info', ClientSchema)
const TokenClient = mongoose.connection.useDb('telegramDataBase').model('Tokens_Client', ChavesTokenClient)

module.exports = { FAQModel, ClientModel, TokenClient }