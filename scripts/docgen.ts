import fs from 'fs';
import path from 'path';

function docGen() {
    let content = fs.readFileSync(path.resolve(__dirname, 'doc-by-postman.json')).toString();
    let contentJSON = JSON.parse(content);

    let builder = new MDBuilder();
    builder.writeH2('Predefined APIs');
    builder.writeLine(contentJSON.info.description);
    builder.writeLine();

    contentJSON.item.forEach((api: any) => {
        builder.writeLine(`* [${api.name}](#${api.name.toLowerCase().split(' ').join('-')})`);
    });
    builder.writeLine();
    
    contentJSON.item.forEach((api: any) => {
        builder.writeLine();
        builder.writeH3(api.name);
        builder.writeLine(`${api.request.method}: \`${api.request.url.raw.replace('http://localhost:3000', '')}\``);
        api.response.forEach((res: any, i: number) => {
            builder.writeLine();
            builder.writeH4(`Example ${i + 1}: ${res.name}`);
            builder.writeLine(`* ${res.originalRequest.method}: \`${res.originalRequest.url.raw}\``);
            builder.writeLine();
            if (res.name.includes('xyz tile image')) {
                builder.writeLine('* Response:');
                builder.writeLine();
                builder.writeLine('![tile-0-0-0](./images/tile-0-0-0.png)');
            }
            else if (res.body !== null) {
                builder.writeLine('* Response:');
                builder.writeCode(res.body);
            }
        });
    });

    fs.writeFileSync(path.resolve(__dirname, 'doc-by-postman.md'), builder.content);
}

class MDBuilder {
    constructor(public content: string = '') { }

    writeLine(newLine: string = '') {
        this.content += newLine + '\n';
    }

    writeH2(newLine: string) {
        this.writeLine(`## ${newLine}`);
    }

    writeH3(newLine: string) {
        this.writeLine(`### ${newLine}`);
    }

    writeH4(newLine: string) {
        this.writeLine(`#### ${newLine}`);
    }

    writeCode(script: string, tag: string = 'json') {
        script = script.replace(/\/Users\/[\w\/.-]+\/data/gmi, './data')
        this.writeLine(`\`\`\`${tag}\n${script}\n\`\`\``);
    }
}

docGen();