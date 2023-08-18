const TelegramBot = require('node-telegram-bot-api');
const token = '6005902864:AAHmg98gVM0zJ66-XLzmfYgWqGWcTTF1tsM';
const bot = new TelegramBot(token, { polling: true });

const axios = require('axios');
const { text } = require('express');

const StpoChatText = () => {
    return bot.removeAllListeners('message');
};

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    let textFAQ = ''

    const responseDate = async () => {
        const data = await axios.get(`http://localhost:8000/api/v1/GetInfoFaQ`);
        return data.data;
    };

    const respostas = async () => {
        const response = await responseDate()
        const mapRespostas = new Map()

        response.message_FaQ.forEach((el, index) => {
            const numQuestion = index + 1;
            textFAQ += `${numQuestion}: ${el.Question}\n`
            mapRespostas.set(numQuestion, el.Response);
        });

        return mapRespostas;
    };

    respostas().then(mapRespostas => {
        const faqText = `🤖 Bem-vindo ao nosso Bot de Suporte! Aqui estão algumas perguntas frequentes:\n${textFAQ}`;
        bot.sendMessage(chatId, faqText);

        bot.on('message', (msg) => {
            const opt = parseInt(msg.text)
            if (mapRespostas.get(opt)) { bot.sendMessage(chatId, `${mapRespostas.get(opt)}`) }
        })
    });

});

const AdminConfig = async (bot, chatId) => {
    let tokenValidated = false;

    bot.on('message', async (message) => {
        const mensagem = message.text;

        if (!tokenValidated) {
            try {
                const token = mensagem.toLowerCase();
                await axios.post('http://localhost:8000/api/v1/tokenClient', {
                    token: token
                });

                bot.sendMessage(chatId, `🔑 Chave de Token válida!\n\nComandos para moderadores:\n- Editar comando: !question: [questão antiga]:[resposta antiga]: [nova questão]:[nova resposta]\nExemplo: !question: [Questão Original]:[Resposta Original]: [Nova Questão]:[Nova Resposta]`);

                tokenValidated = true;
            } catch (err) {
                if (err.response.status === 401) {
                    bot.sendMessage(chatId, `❌ Chave de Token Inválida!\nPegue uma chave válida e tente novamente: /admin.`);
                    StpoChatText();
                }
            }
        } else {
            if (mensagem.toLowerCase().startsWith('!question:')) {
                const textArray = mensagem.replace('!question:', '').split(':').map(item => item.trim());

                const QuestionTextUpdate = textArray[0],
                    ResponseTextUpdate = textArray[1],
                    NewQuestionUpadate = textArray[2],
                    NewResponseUpadate = textArray[3]

                try {
                    const responseUpdate = await axios.patch(`http://localhost:8000/api/v1/updateFaQ`, {
                        question: QuestionTextUpdate,
                        response: ResponseTextUpdate,
                        NewQuestionUpadate: NewQuestionUpadate,
                        NewResponseUpadate: NewResponseUpadate
                    });

                    StpoChatText();
                    return bot.sendMessage(chatId, responseUpdate.data.message);
                } catch (err) {
                    if (err.response.status === 501) {
                        return bot.sendMessage(chatId, `Erro ao tentar atualizar as FAQs, verifique se ainda existe no banco de dados.`);
                    }
                }
            }
        }
    });
};

bot.onText(/\/admin/, async (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(chatId, `🔒 Digite sua chave Token para acessar as configurações do Bot de Suporte!`);
    AdminConfig(bot, chatId);
});
