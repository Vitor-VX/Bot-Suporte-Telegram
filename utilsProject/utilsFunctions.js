const UuidTokenAdmin = () => {
    return require('uuid').v4()
}

async function GerarChavesApi(TokenClient) {
    const token = UuidTokenAdmin()
    return await TokenClient.create({ token: token }).then(res => console.log(`Chave token criada com sucesso: ${res}`))
        .catch(error => console.log(error))
}

async function VerificTokenClient(TokenClient, Token) {
    const tokensFind = (await TokenClient.find()).find(t => t.token === Token)
    if (tokensFind) return true

    return false
}

async function DeleteTokenValidate(TokenClient, tokenDelete) {
    return (await TokenClient).deleteOne({ token: tokenDelete })
}

async function AddFaQModel(FAQModel, Question, ResponseQuestion) {
    return (await FAQModel).create({ question: Question, response: ResponseQuestion })
}

async function removeQuestions(FAQModel, Question) {
    const FindQuestion = (await FAQModel.find()).find(qtn => qtn.question === Question)
    if (!FindQuestion) throw new Error

    await FAQModel.findByIdAndDelete(FindQuestion._id)

    return FindQuestion.question
}


async function AddClientInfo(ClientModel, Id, Email, Payment_Value, Expiration_Data) {
    return (await ClientModel).create({
        id_Client: Id,
        email_Client: Email,
        payment_Value: Payment_Value,
        expiration_Date: Expiration_Data
    })
}

async function GetInfoFaQ(FAQModel) {
    return (await FAQModel.find()).map(el => {
        return { Question: el.question, Response: el.response }
    })
}

async function UpdateFaQ(FAQModel, Question, Response, NewQuestion, NewResponse) {
    const FindQuestion = (await FAQModel.find()).find(qtn => qtn.question === Question || qtn.response === Response)
    if (!FindQuestion) throw new Error

    const updateData = {
        $set: {
            question: NewQuestion,
            response: NewResponse
        }
    };

    return (await FAQModel).updateOne({ _id: FindQuestion._id }, updateData);
}

module.exports = {
    GerarChavesApi,
    VerificTokenClient,
    DeleteTokenValidate,
    AddFaQModel,
    removeQuestions,
    AddClientInfo,
    GetInfoFaQ,
    UpdateFaQ
}