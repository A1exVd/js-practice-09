import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import chalk from 'chalk';

/* 
Использую type: module, так как является современным стандартом,
позволяет использовать await без обертывания его async функцией,модули всегда выполняются в строгом режиме.
ESM использует статический синтаксис import/export, что позволяет инструментам
сборки эффективнее удалять неиспользуемый код (tree-shaking).
*/


export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
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


async function writeToFile(data, filePath) {
    try {
        await fs.writeFile(filePath, data) 
    } catch (error) {
        console.log('Some error: ', error);
        return;
    }
    console.log(chalk.green('db.json создна успешно!'));
}


writeToFile(JSON.stringify(users), 'data/db.json');
