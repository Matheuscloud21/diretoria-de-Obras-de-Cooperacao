# Plano de Containerização do Ambiente de Desenvolvimento

## Visão Geral
Este documento descreve o plano para configurar um ambiente de desenvolvimento containerizado para o projeto da Diretoria de Obras de Cooperação, utilizando:
- Node.js para o backend
- MongoDB para o banco de dados
- DevContainer do VSCode para desenvolvimento

## Análise da Configuração Atual
Já existe uma configuração básica do DevContainer com:
- Container Node.js com MongoDB tools instalado
- Container MongoDB
- Volume persistente para dados do MongoDB

## Modificações Necessárias

### 1. docker-compose.yml
Adicionar:
```yaml
# Adicionar configurações do MongoDB
db:
  environment:
    MONGO_INITDB_ROOT_USERNAME: root
    MONGO_INITDB_ROOT_PASSWORD: example
    MONGO_INITDB_DATABASE: doc_db

# Adicionar serviço mongo-express
mongo-express:
  image: mongo-express
  restart: unless-stopped
  environment:
    ME_CONFIG_MONGODB_ADMINUSERNAME: root
    ME_CONFIG_MONGODB_ADMINPASSWORD: example
    ME_CONFIG_MONGODB_URL: mongodb://root:example@db:27017/
  depends_on:
    - db
```

### 2. Dockerfile
Já está bem configurado com:
- Node.js 22
- MongoDB tools
- Possibilidade de adicionar pacotes globais

Adicionar:
```dockerfile
# Instalar dependências globais do Node.js
RUN su node -c "npm install -g nodemon"

# Configurar diretório de trabalho
WORKDIR /workspaces/diretoria-de-Obras-de-Cooperacao
```

### 3. devcontainer.json
Criar novo arquivo com:
```json
{
  "name": "DOC Backend",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
  "forwardPorts": [3000, 27017, 8081],
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "mongodb.mongodb-vscode"
      ]
    }
  },
  "postCreateCommand": "npm install",
  "remoteUser": "node"
}
```

### 4. Backend Updates
1. Modificar arquivo .env:
```env
MONGODB_URI=mongodb://root:example@db:27017
DATABASE_NAME=doc_db
NODE_ENV=development
PORT=3000
```

2. Atualizar conexão MongoDB no backend para usar as novas variáveis de ambiente

## Próximos Passos

1. Criar/atualizar arquivos de configuração:
   - Modificar docker-compose.yml existente
   - Atualizar Dockerfile existente
   - Criar devcontainer.json
   - Atualizar .env do backend

2. Testar ambiente:
   - Reabrir projeto no container
   - Verificar conexão com MongoDB
   - Testar acesso ao mongo-express
   - Validar hot-reload do backend

3. Documentar:
   - Instruções de uso do ambiente
   - Comandos úteis
   - Troubleshooting comum

## Benefícios
- Ambiente isolado e reproduzível
- Facilidade de configuração para novos desenvolvedores
- Ferramentas de desenvolvimento pré-configuradas
- Interface visual para gerenciamento do banco de dados
- Hot-reload para desenvolvimento mais ágil

## Recomendações de Uso
1. Sempre usar o DevContainer para desenvolvimento
2. Manter as variáveis de ambiente atualizadas
3. Utilizar mongo-express para debug do banco de dados
4. Aproveitar as extensões pré-configuradas do VSCode

Deseja que eu proceda com a implementação dessas modificações?