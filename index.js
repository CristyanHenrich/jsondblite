const SimpleJsonDB = require('./database');
const db = new SimpleJsonDB();

//Exemplos de uso
async function main() {
    // Inicializando o banco de dados
    await db.init(['clients']);

    // Adicionando um novo cliente
    const newClient = await db.add('clients', { nome: 'Cristyan', email: 'email@example.com' });
    console.log('Cliente adicionado:', newClient);

    // Listando todos os clientes
    const clients = await db.list('clients');
    console.log('Todos os clientes:', clients);

    // Atualizando um cliente
    await db.update('clients', newClient.id, { email: 'novoemail@example.com' });
    const updatedClients = await db.list('clients');
    console.log('Clientes atualizados:', updatedClients);

    // Removendo um cliente
    await db.remove('clients', newClient.id);
    const clientsAfterDeletion = await db.list('clients');
    console.log('Clientes após remoção:', clientsAfterDeletion);
}

main().catch(console.error);
