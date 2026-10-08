const puppeteer = require('puppeteer-core');
const path = require('path');

async function generatePDF() {
    console.log("Iniciando Puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: true
    });
    
    const page = await browser.newPage();
    const filePath = `file:///${path.join(__dirname, 'apresentacao_jwt.html').replace(/\\/g, '/')}`;
    console.log("Abrindo arquivo:", filePath);
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Configura o estilo da impressão para remover margens
    await page.pdf({
        path: 'apresentacao_jwt.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    
    console.log("PDF gerado com sucesso!");
    await browser.close();
}

generatePDF().catch(console.error);
