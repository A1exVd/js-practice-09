import fs from 'fs/promises';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';


// Путь к файлу db.json
const currentfilePath = fileURLToPath(import.meta.url);
// ПОЧЕМУ? Использую dirname для получения пути к родительской папке.
const currentDir = path.dirname(currentfilePath);
const rootDir = path.dirname(currentDir);
// ПОЧЕМУ? Использую join для объединение нескольких частей пути в одну строку.
const pathDbFile = path.join(rootDir, 'data', 'db.json');

// Проверка структуры репозитория
checkStructure(path.join(rootDir,'src'));
checkStructure(path.join(rootDir,'data'));

// Валидация db.json файла
validate();

async function validate() {
    try {
        // асинхронный метод, используется для чтения данных из файла.
        const data = await fs.readFile(pathDbFile, 'utf8');
        
        const dataArr = JSON.parse(data);
        
        if(!dataArr) {
            throw new Error(chalk.red('dataArr возможно null или undefined!'))
        }

        if(!Array.isArray(dataArr)) {
            throw new Error(chalk.red('dataArr должен быть массивом!'));
        }
        // Простая проверка наличия всех свойств у пользователя
        dataArr.forEach((user) => {
            if(!user.userId) throw new Error(chalk.red('userId возможно null или undefined!'));
            else if (!user.username) throw new Error(chalk.red('username возможно null или undefined!'));
            else if (!user.email) throw new Error(chalk.red('email возможно null или undefined!'));
            else if (!user.avatar) throw new Error(chalk.red('avatar возможно null или undefined!'));
            else if (!user.password) throw new Error(chalk.red('password возможно null или undefined!'));
            else if (!user.birthdate) throw new Error(chalk.red('birthdate возможно null или undefined!'));
            else if (!user.registeredAt) throw new Error(chalk.red('registeredAt возможно null или undefined!'));
        })

        console.log(chalk.green('Успешная валидация структуры проекта!'));
    } catch (error) {
        console.error(error)
        // прекращаем работу программы
        process.exit(1);
    }
}

async function checkStructure(path) {
    try {
        // ПОЧЕМУ? метод access проверяет существование файла/папки, а такжеправа доступа пользователя к файлу/папке.
        await fs.access(path);
    } catch (error) {
        console.error(chalk.red(`Ошибка структуры ${path} не найден!`));
        // прекращаем работу программы
        process.exit(1);
    }
}
