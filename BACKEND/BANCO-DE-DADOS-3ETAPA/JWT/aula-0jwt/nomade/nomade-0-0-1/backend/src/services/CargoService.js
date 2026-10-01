const CargoRepository = require("../repositories/CargoRepository");

class CargoService {

    async listar() {
        return await CargoRepository.listar();
    }

    async buscarPorId(id) {

        const cargo = await CargoRepository.buscarPorId(id);

        if (!cargo) {
            throw new Error("Cargo não encontrado.");
        }

        return cargo;
    }

    async cadastrar(dados) {

        if (!dados.nome_cargo) {
            throw new Error("O nome do cargo é obrigatório.");
        }

        if (dados.nivel_acesso === undefined) {
            throw new Error("O nível de acesso é obrigatório.");
        }

        if (dados.nivel_acesso < 0) {
            throw new Error("O nível de acesso não pode ser negativo.");
        }

        const cargoExistente =
            await CargoRepository.buscarPorNome(dados.nome_cargo);

        if (cargoExistente) {
            throw new Error("Este cargo já está cadastrado.");
        }

        return await CargoRepository.cadastrar(dados);
    }

    async atualizar(id, dados) {

        const cargo = await CargoRepository.buscarPorId(id);

        if (!cargo) {
            throw new Error("Cargo não encontrado.");
        }

        if (Object.keys(dados).length === 0) {
            throw new Error("Nenhum dado foi informado para atualização.");
        }

        return await CargoRepository.atualizar(id, dados);
    }

    async excluir(id) {

        const cargo = await CargoRepository.buscarPorId(id);

        if (!cargo) {
            throw new Error("Cargo não encontrado.");
        }

        await CargoRepository.excluir(id);

        return true;
    }
}

module.exports = new CargoService();