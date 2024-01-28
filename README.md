# JsonDBLite

JsonDBLite é um pacote Node.js para a criação de um banco de dados local baseado em JSON. Ele permite realizar operações básicas de CRUD (Create, Read, Update, Delete) em um formato de banco de dados simples e eficiente, ideal para pequenos projetos ou aplicações que necessitam de uma solução de armazenamento de dados rápida e sem a necessidade de um banco de dados completo.

## Recursos

- Operações CRUD (Create, Read, Update, Delete) simples e diretas.
- Armazenamento de dados em formato JSON.
- Fácil de integrar e usar em projetos Node.js.

## Instalação

```bash
npm install jsondblite
```

## Uso Básico

Após a instalação, você pode usar o JsonDBLite da seguinte maneira:

### Importando o Pacote

```javascript
const JsonDBLite = require('jsondblite');
```

### Inicializando o Banco de Dados

```javascript
const db = new JsonDBLite();
db.init(['clients']);
```

### Adicionando Dados

```javascript
// Adicionando um novo cliente
await db.add('clients', { nome: 'Cristyan', email: 'email@example.com' });
```

### Listando Dados

```javascript
// Listando todos os clientes
const clients = await db.list('clients');
```

### Atualizando Dados

```javascript
// Atualizando um cliente
await db.update('clients', clientId, { email: 'novoemail@example.com' });
```

### Removendo Dados

```javascript
// Removendo um cliente
await db.remove('clients', clientId);
```

## Exemplo de Uso Completo

Veja abaixo um exemplo completo de como usar o JsonDBLite, de uma outra maneira:

```javascript
const JsonDBLite = require('jsondblite');
const db = new JsonDBLite();

async function main() {
    await db.init(['clients']);

    // Adicionando um novo cliente
    await db.add('clients', { 
        nome: 'Cristyan',
        email: 'email@example.com' 
    }).then(client => {
        console.log('Cliente adicionado:', client);
    });

    // Listando todos os clientes
    await db.list('clients').then(clients => {
        console.log('Todos os clientes:', clients)
    });

    // Atualizando um cliente
    await db.update('clients', 1, {
        email: 'novoemail@example.com'
    }).then(updatedClient => {
        console.log('Cliente atualizado:', updatedClient);
    });

    // Removendo um cliente
    await db.remove('clients', 1).then(clientsAfterDeletion => {
        console.log('Clientes apos delecao:', clientsAfterDeletion);
    });
}

main().catch(console.error);
```

## Contribuição

Contribuições para o projeto são bem-vindas. Para contribuir, por favor, crie um fork do repositório, faça suas alterações e envie um pull request.

## Importante

```
Esse README oferece uma visão geral do seu projeto, incluindo como instalar, usar e contribuir para ele. Certifique-se de substituir `jsondblite` pelo nome real do seu pacote no npm, caso seja diferente.