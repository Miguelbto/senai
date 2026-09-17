

class NotaFiscal {
    constructor(private valorBase: number) {}

    //1. PUBLIC (Instância): Interface principal da instância 
    public calcularTotal(): number {
        //usa o método privado da instância
        return this.aplicarImpostoEstadual(this.valorBase)
    }

    private aplicarImpostoEstadual(valor: number): number {
        return valor * 1.18
    }

    //2. PRIVATE STATIC: método utilitário/facbrica chamado sem 'new'
    public static criarParaEmpresa(valor: number, cnpj: string): NotaFiscal {
        //Usa o método privado estático para validar antes de instanciar
        if(!NotaFiscal.validarCnpj(cnpj)) {
            throw new Error("CNPJ inválido")
        }
        return new NotaFiscal(valor)
    }

    //4. PRIVATE STATIC: Auxiliar interno exclusivo da própria class
    private static validarCnpj(cnpj: string): boolean {
        return cnpj.length === 14
    }
}

// Chamada do PUBLIC STATIC (direto na classse)

const nf = NotaFiscal.criarParaEmpresa(1000, '12345678000199')

//Chamada do PUBLIC STATIC (na instancia 'nf')
console.log(nf.calcularTotal())