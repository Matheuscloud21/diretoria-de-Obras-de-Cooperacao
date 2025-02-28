# Backend do Sistema DOC Admin

Este é o backend do sistema administrativo do DOC, responsável por gerenciar obras e fornecer API para o frontend.

## Requisitos

- Node.js >= 14.x
- MongoDB >= 4.4
- NPM ou Yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Configure as variáveis de acordo com seu ambiente

## Configuração Inicial

1. Certifique-se de que o MongoDB está rodando
2. Crie o usuário administrador inicial:
```bash
npm run create-admin
```
Isso criará um usuário admin com as seguintes credenciais:
- Username: admin
- Senha: admin123456

**Importante:** Altere a senha após o primeiro login!

## Executando o Servidor

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registrar novo usuário (requer admin)
- `GET /api/auth/me` - Obter perfil do usuário atual
- `PUT /api/auth/updatepassword` - Atualizar senha

### Obras

- `GET /api/works` - Listar todas as obras
- `GET /api/works/:id` - Obter obra específica
- `POST /api/works` - Criar nova obra (requer admin)
- `PUT /api/works/:id` - Atualizar obra (requer admin)
- `DELETE /api/works/:id` - Deletar obra (requer admin)
- `GET /api/works/grupamento/:grupamento` - Listar obras por grupamento

## Segurança

O sistema implementa várias medidas de segurança:
- Autenticação JWT
- Rate limiting
- CORS configurado
- Headers de segurança (Helmet)
- Sanitização de entrada
- Validação de dados

## Desenvolvimento

### Estrutura de Arquivos

```
backend/
├── src/
│   ├── config/         # Configurações
│   ├── controllers/    # Controladores
│   ├── middlewares/    # Middlewares
│   ├── models/         # Modelos
│   ├── routes/         # Rotas
│   ├── scripts/        # Scripts utilitários
│   └── utils/          # Funções utilitárias
├── .env                # Variáveis de ambiente
└── server.js          # Entrada da aplicação
```

### Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run create-admin` - Cria usuário administrador inicial

## Produção

Para deploy em produção, certifique-se de:
1. Configurar variáveis de ambiente apropriadas
2. Usar um processo manager (como PM2)
3. Configurar HTTPS
4. Configurar backup do banco de dados
5. Implementar monitoramento

## Suporte

Para suporte, entre em contato com a equipe de desenvolvimento.