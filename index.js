const fsp = require('fs').promises;
const path = require('path');
class LigthJsonDB {
    constructor(config = {}) {
        this.databasePath = config.databasePath 
                            ? path.join(process.cwd(), config.databasePath, 'database')
                            : path.join('database');
    }

    async init(tables = []) {
        await fsp.mkdir(this.databasePath, { recursive: true });
        for (const table of tables) {
            await this.createTableIfNotExists(table);
        }
    }

    async createTableIfNotExists(table) {
        const filePath = this.getFilePath(table);
        try {
            await fsp.access(filePath);
        } catch (err) {
            await fsp.writeFile(filePath, JSON.stringify([]));
        }
    }

    async list(table) {
        const data = await this.readData(table);
        return data;
    }

    async add(table, newData) {
        const data = await this.readData(table);
        const maxId = data.reduce((max, item) => item.id > max ? item.id : max, 0);
        const newRow = { id: maxId + 1, ...newData };
        data.push(newRow);
        await this.writeData(table, data);
        return newRow;
    }

    async update(table, id, newData) {
        const data = await this.readData(table);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Registro com ID ${id} não encontrado.`);
        }
        data[index] = { ...data[index], ...newData };
        await this.writeData(table, data);
        return data[index];
    }

    async remove(table, id) {
        let data = await this.readData(table);
        data = data.filter(item => item.id !== id);
        await this.writeData(table, data);
        return data;
    }

    async readData(table) {
        const filePath = this.getFilePath(table);
        const json = await fsp.readFile(filePath, 'utf8');
        return JSON.parse(json);
    }

    async writeData(table, data) {
        const filePath = this.getFilePath(table);
        const json = JSON.stringify(data, null, 4);
        await fsp.writeFile(filePath, json, 'utf8');
    }

    getFilePath(table) {
        return path.join(this.databasePath, `${table}.json`);
    }
}

module.exports = LigthJsonDB;