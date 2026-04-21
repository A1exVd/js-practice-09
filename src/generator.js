import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import chalk from 'chalk';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

/* 
Использую type: module, так как является современным стандартом,
позволяет использовать top-level await, модули всегда выполняются в строгом режиме.
ESM использует статический синтаксис import/export, что позволяет инструментам
сборки эффективнее удалять неиспользуемый код (tree-shaking).
*/

/* 
Использую fs/promises, так как, в отличие от fs, позволяет писать асинхронный код, используя промисы, а не колбеки.
Удобнее обрабатывать ошибки, используя try/catch конструкцию. Не блокирует основной поток, позволяет выполнять несколько 
операций параллельно и ждать их завершения. (Promise.all())
*/

/* 
Зачем React нужны keys?
При рендеринге списков, например, карточек товара, для каждого элемента списка необходимо добавить уникальный ключ идентификатор.
Это поможет оптимизировать рендеринг списков. При именении состояния ключи помогают алгоритмам сравнения нового виртуального DOM со 
старым, в частности определить какой элемент обновился и вместо обновления всего списка обновить только изменившийся элемент. 
Тем самым улучшив производительность страницы.
*/


export function createRandomUser() {
  return {
    userId: nanoid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});


// Путь к файлу db.json 

/*
Использую абсолютный путь, полученный с помощью path, а не относительный, так как абсолютный 
всегда ведет к файлу независимо от того, откуда вызвывается скрипт. Более недежен и удобен при изменении структуры проекта.
*/

const currentfilePath = fileURLToPath(import.meta.url);
// ПОЧЕМУ? Использую dirname для получения пути к родительской папке.
const currentDir = path.dirname(currentfilePath);
const rootDir = path.dirname(currentDir);
// ПОЧЕМУ? Использую join для объединения нескольких частей пути в одну строку.
const pathDbFile = path.join(rootDir, 'data', 'db.json');

async function writeToFile(data, filePath) {
    try {
        // ПОЧЕМУ? асинхронный метод, используется для записи данных в файл. Если файла нет - создает его и записывает данные.
        await fs.writeFile(filePath, data) 
    } catch (error) {
        console.error('Some error: ', error);
        process.exit(1);
    }
    console.log(chalk.green('db.json создна успешно!'));
}


writeToFile(JSON.stringify(users), pathDbFile);
