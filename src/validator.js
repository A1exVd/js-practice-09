import fs from 'fs/promises';
import chalk from 'chalk';

async function checkStructure(path) {
    try {
        await fs.access(path);
    } catch (error) {
        console.log(chalk.red(`Ошибка структуры ${path} не найден!`));
    }
}

checkStructure('src');
checkStructure('data');