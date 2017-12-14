'use strict';

describe('Test connection', () => {
    test('Invalid DSN', async () => {
        const Test = require('../src/mongo-crud-simple')('mongodb://invalid:27017/test', 'test');

        try {
            await Test.index();
        } catch (error) {
            expect(error.name).toBe('MongoError');
        }
    });


    test('Valid DSN', async () => {
        const dsn = process.env.DB_DSN || 'mongodb://127.0.0.1:27017/test';
        const Test = require('../src/mongo-crud-simple')(dsn, 'test');

        let data = await Test.index();

        expect(data).toEqual([]);
    });
});


describe('CRUD', () => {
    const dsn = process.env.DB_DSN || 'mongodb://127.0.0.1:27017/test';
    const Test = require('../src/mongo-crud-simple')(dsn, 'test');

    beforeAll(async () => {
        await Test.create({
            name: 'Sven Svensson',
            email: 'sven.svensson@test.com'
        });
        await Test.create({
            name: 'Stig Stigsson',
            email: 'stig.stigsson@test.com'
        });
    });


    afterAll(async () => {
        await Test.reset();
    });


    test('Get all items', async () => {
        let data = await Test.index();

        expect(data[0].name).toBe('Sven Svensson');
        expect(data.length).toBe(2);
    });


    test('Insert item', async () => {
        let person = {
            name: 'Johan Johansson',
            email: 'johan.johansson@test.com'
        };

        let data = await Test.create(person);

        expect(data).toBe(person);

        data = await Test.index();
        expect(data.length).toBe(3);
    });


    test('Get item', async () => {
        let items = await Test.index();
        let data = await Test.read(items[2]._id);

        expect(data.name).toBe('Johan Johansson');
    });


    test('Get invalid item', async () => {
        let data = await Test.read(5);

        expect(data).toBe(null);
    });


    test('Update item', async () => {
        let items = await Test.index();
        let data = await Test.update(items[2]._id, {
            name: "Sune Johansson",
            email: "sune.johansson@test.com"
        });

        expect(data.value.name).toBe('Johan Johansson');
        expect(data.value.email).toBe('johan.johansson@test.com');

        items = await Test.index();

        expect(items[2].name).toBe('Sune Johansson');
        expect(items[2].email).toBe('sune.johansson@test.com');
    });


    test('Update invalid item', async () => {
        let data = await Test.update(10, {
            name: "Sune Johansson",
            email: "sune.johansson@test.com"
        });

        expect(data.value).toBe(null);
    });


    test('Delete item', async () => {
        let items = await Test.index();
        let data = await Test.delete(items[2]._id);

        expect(data.value.name).toBe('Sune Johansson');

        data = await Test.index();

        expect(data.length).toBe(2);
    });


    test('Delete invalid item', async () => {
        let data = await Test.delete(5);

        expect(data.value).toBe(null);
    });


    test('Reset/empty the collection', async () => {
        let data = await Test.reset();

        expect(data).toBe(true);

        let items = await Test.index();

        expect(items.length).toBe(0);
        expect(items).toEqual([]);
    });
});
