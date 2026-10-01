// npm run test:e2e
// 

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page, request }) => {
    const response = await request.post("http://localhost:3000/__reset")
    expect(response.status.toBe(204));

    await page.goto("/")

    test("Lista os produtos inicais", async ({ page }) => {
        await expect(page.getByRole("heading", { name: 'produtos' })).toBeVisible()
        await expect(page.getByRole("row")).toHaveCount(4);
        await expect(page.getByRole("cell", { name: "Coxinha" })).toBeVisible()
    })

    test("Lista os produtos inicais", async ({ page }) => {
        await page.getByLabel("nome").fill("Kibe")
        await page.getByLabel("nome").fill("Kibe")
        await page.getByLabel("nome").fill("Kibe")
    })

    test("mostra erro ao cadastrar sem preenchimento", async ({ page }) => {
        await page.getByRole("button", { name: "Cadastrar" }).click();
        expect(page.getByText("Nome e preco sao obrigatorios")).toBeVisible
    })

    test("remove um produto", async ({ page }) => {
        const linha = page.getByRole("row", { name: /Pastel/ });
        await linha.getByRole("button", { name: "Remover" }).click();
        await expect(linha).toHaveCount(0)
    })
})