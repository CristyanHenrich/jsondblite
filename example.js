const LigthJsonDB = require('.');
const db = new LigthJsonDB();

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