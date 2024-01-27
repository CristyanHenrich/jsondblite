const fs = require('fs');

function createTableIfNotExists(table) {
    let filePath = `database/${table}.json`;
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        console.log(`${filePath} criado com sucesso!`);
    }
}

function list(table, id) {
    let filePath = `database/${table}.json`;

    if (!fs.existsSync(filePath)) {
        createTableIfNotExists(table);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        const table_rows = JSON.parse(data);

        if (id) {
            const table_row = table_rows.find(row => row.id === id);
            console.log(table_row);
            return;
        }

        console.log(JSON.parse(data));
    });
}

function add(table, newData) {
    let filePath = `database/${table}.json`;

    if (!fs.existsSync(filePath)) {
        createTableIfNotExists(table);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
        }

        const table_rows = JSON.parse(data);
        const maxId = table_rows.reduce((max, table_row) => table_row.id > max ? table_row.id : max, 0);
        const newRow = { id: maxId + 1, ...newData };
        
        table_rows.push(newRow);
        
        fs.writeFile(filePath, JSON.stringify(table_rows, null, 4), (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return;
            }
            console.log(`Dado adicionado com sucesso a tabela - ${table} :`, newRow);
        });
    });
}

function update(table, id, newData) {
    let filePath = `database/${table}.json`;

    if (!fs.existsSync(filePath)) {
        createTableIfNotExists(table);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
        }

        let table_rows = JSON.parse(data);
        const dataIndex = table_rows.findIndex(row => row.id === id);

        if (dataIndex === -1) {
            console.log(`${table} com id ${id} nao encontrado.`);
            return;
        }

        table_rows[dataIndex] = { ...table_rows[dataIndex], ...newData };
        
        fs.writeFile(filePath, JSON.stringify(table_rows, null, 4), err => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return;
            }
            console.log(`Dado atualizado com sucesso a tabela - ${table} :`, table_rows[dataIndex]);
        });
    });
}

function remove(table, id) {
    let filePath = `database/${table}.json`;

    if (!fs.existsSync(filePath)) {
        createTableIfNotExists(table);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
        }

        let table_rows = JSON.parse(data);
        const dataIndex = table_rows.findIndex(row => row.id === id);

        if (dataIndex === -1) {
            console.log(`${table} com id ${id} nao encontrado.`);
            return;
        }

        table_rows.splice(dataIndex, 1);
        
        fs.writeFile(filePath, JSON.stringify(table_rows, null, 4), err => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return;
            }
            console.log(`Dado removido com sucesso a tabela - ${table}!`);
        });
    });
}

module.exports = { createTableIfNotExists, add, list, update, remove };