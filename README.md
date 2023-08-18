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

# Comandos
/start: Inicia a conversa com o bot e exibe perguntas frequentes.
/admin: Acessa as configurações de administração e edição.
!question: Edita uma pergunta e resposta existente.

# Oberservação
- ``Como esse projeto era dedicado para uma empresa e não deu certo, o bot contém poucas funcionalidades. Eu realmente não sabia que este projeto iria para cá, mas o intuito era fazer um bot mais completo e com um sistema de pagamento para a empresa.``
