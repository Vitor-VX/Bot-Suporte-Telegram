# Bot de Suporte
Este é um bot de suporte criado usando a biblioteca Node.js "node-telegram-bot-api". Ele fornece informações e interações para usuários, permitindo que eles obtenham respostas para perguntas frequentes e também permitindo a edição de perguntas e respostas por administradores.

# Funcionalidades
Inicie o bot com o comando /start para obter uma lista de perguntas frequentes.
Administradores podem usar o comando /admin para acessar configurações adicionais.
Administradores podem editar perguntas e respostas usando o comando !question: [questão antiga]:[nova questão]:[nova resposta].
# Pré-requisitos
Node.js e npm instalados
Um servidor MongoDB em execução
Uma chave de token para acessar o bot da API do Telegram
# Como Usar
Clone este repositório para o seu ambiente local.
Instale as dependências usando o comando npm install.
Defina sua chave de token da API do Telegram no arquivo index.js.
Inicie o servidor com o comando node index.js.
Abra o aplicativo Telegram e encontre o bot pelo nome ou ID.
Inicie a conversa com o bot usando o comando /start para obter informações.

# API do Bot
Esta API foi criada para fornecer os recursos necessários ao bot de suporte, permitindo a integração com o aplicativo de mensagens Telegram e interações com os dados das perguntas frequentes e informações dos clientes.

# Endpoints da API
Verificação do Token do Cliente
Verifica se um token fornecido é válido para permitir que o cliente acesse os recursos do bot.

# Método: POST
Rota: /api/v1/tokenClient
Parâmetros de entrada: token (token do cliente)
Resposta de sucesso: Status 201 - { message: 'Token válido!' }
Resposta de erro: Status 401 - { error: 'Token inválido!' }
Obter Informações das Perguntas Frequentes
Obtém as informações das perguntas frequentes armazenadas no banco de dados.

# Método: GET
Rota: /api/v1/GetInfoFaQ
Resposta de sucesso: Status 201 - { message_FaQ: [array de perguntas frequentes] }
Resposta de erro: Status 401 - { error: 'Erro ao obter as informações.' }
Adicionar Perguntas Frequentes
Permite que os administradores adicionem novas perguntas frequentes ao banco de dados.

# Método: POST
Rota: /api/v1/addQuestions
Parâmetros de entrada: question (pergunta), response (resposta)
Resposta de sucesso: Status 201 - { message: 'Questões enviadas' }
Resposta de erro: Status 401 - { error: 'Erro ao enviar os dados!' }
Atualizar Perguntas Frequentes
Permite que os administradores atualizem perguntas frequentes existentes.

# Método: PATCH
Rota: /api/v1/updateFaQ
Parâmetros de entrada: question (pergunta antiga), response (resposta antiga), NewQuestionUpadate (nova pergunta), NewResponseUpadate (nova resposta)
Resposta de sucesso: Status 201 - { message: 'Informações FAQ atualizadas com sucesso.' }
Resposta de erro: Status 501 - { error: 'Erro ao tentar atualizar as informações do FAQ.' }
Excluir Perguntas Frequentes
Permite que os administradores excluam perguntas frequentes do banco de dados.

# Método: DELETE
Rota: /api/v1/deleteQuestions
Parâmetros de entrada: question (pergunta a ser deletada)
Resposta de sucesso: Status 201 - { message: 'Mensagem [mensagem deletada] deletada com sucesso!' }
Resposta de erro: Status 401 - { error: 'Erro ao deletar a mensagem', possible_errors: 'A questão já pode estar deletada.' }
Adicionar Informações do Cliente
Permite que os administradores adicionem informações dos clientes ao banco de dados.

# Método: POST
Rota: /api/v1/addClientInfo
Parâmetros de entrada: id_Client (ID do cliente), email (email do cliente), payment_Value (valor do pagamento), expiration_Data (data de expiração)
Resposta de sucesso: Status 201 - { message: 'Dados do cliente enviados com sucesso!' }
Resposta de erro: Status 401 - { error: 'Erro ao enviar os dados do Client Info!' }

# Comandos
/start: Inicia a conversa com o bot e exibe perguntas frequentes.
/admin: Acessa as configurações de administração e edição.
!question: Edita uma pergunta e resposta existente.

# Oberservação
- ``Como esse projeto era dedicado para uma empresa e não deu certo, o bot contém poucas funcionalidades. Eu realmente não sabia que este projeto iria para cá, mas o intuito era fazer um bot mais completo e com um sistema de pagamento para a empresa.``
