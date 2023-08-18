const express = require('express');
const app = express();
app.use(express.json());

const { VerificTokenClient,
    DeleteTokenValidate,
    AddFaQModel,
    AddClientInfo,
    GetInfoFaQ,
    removeQuestions,
    UpdateFaQ,
    GerarChavesApi
} = require('../utilsProject/utilsFunctions');
const { TokenClient, FAQModel, ClientModel } = require('../connectDataBase/UserModel');
const PORT = 8000;

// Rota para a verificação do token do usuário
app.post('/api/v1/tokenClient', async (req, res) => {
    const tokenBody = req.body.token;
    const verific = await VerificTokenClient(TokenClient, tokenBody);

    if (!verific) return res.status(401).json({ error: `Token inválido!` });

    DeleteTokenValidate(TokenClient, tokenBody).then(() => {
        return res.status(201).json({ message: `Token válido!` });
    });
});

// Rota para obter informações das perguntas frequentes
app.get('/api/v1/GetInfoFaQ', async (req, res) => {
    try {
        GetInfoFaQ(FAQModel).then(result => {
            res.status(201).json({ message_FaQ: result });
        });
    } catch (error) {
        return res.status(401).json({ error: error });
    }
});

// Rota para adicionar perguntas frequentes
app.post('/api/v1/addQuestions', async (req, res) => {
    const AddQuestion = req.body.question;
    const AddResponse = req.body.response;

    await AddFaQModel(FAQModel, AddQuestion, AddResponse).then(() => res.status(201).json({ message: `Questões enviadas` }))
        .catch(() => res.status(401).json({ error: `Erro ao enviar os dados!` }));
});

app.patch('/api/v1/updateFaQ', async (req, res) => {
    const bodyUpdate = {
        questionUpadate: req.body.question,
        responseUpadate: req.body.reponse,
        NewQuestionUpadate: req.body.NewQuestionUpadate,
        NewResponseUpadate: req.body.NewResponseUpadate
    }

    UpdateFaQ(FAQModel, bodyUpdate.questionUpadate, bodyUpdate.responseUpadate, bodyUpdate.NewQuestionUpadate, bodyUpdate.NewResponseUpadate)
        .then(() => res.status(201).json({ message: `Informações FAQ atualizadas com sucesso.` }))
        .catch(() => res.status(501).json({ error: `Erro ao tentar atualizar as informações do FAQ.` }))
})

app.delete('/api/v1/deleteQuestions', async (req, res) => {
    try {
        const deleteQuestions = req.body.question
        return await removeQuestions(FAQModel, deleteQuestions).then(result => {
            res.status(201).json({ message: `Mensagem [ ${result} ] deletada com sucesso!` })
        })
    } catch (error) {
        return res.status(401).json({ error: `Erro ao deletar a mensagem`, possible_errors: `A questão já pode está deletada.` })
    }
})

// Rota para adicionar informações do cliente
app.post('/api/v1/addClientInfo', async (req, res) => {
    const infoClient = {
        id: req.body.id_Client,
        email: req.body.email,
        payment_Value: req.body.payment_Value,
        expiration_Data: req.body.expiration_Data,
    };

    AddClientInfo(ClientModel, infoClient.id, infoClient.email, infoClient.payment_Value, infoClient.expiration_Data)
        .then(() => res.status(201).json({ message: `Dados do cliente enviados com sucesso!` }))
        .catch(() => res.status(401).json({ error: `Erro ao enviar os dados do Client Info!` }));
});

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));