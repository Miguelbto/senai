const FuncionarioRepository = require("../repositories/FuncionariosRepository");
const bcrypt = require("bcrypt");

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

class FuncionarioService {



  #EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex de email simplificado
  #SALT_ROUNDS = 10; //custo de processamento bcrypts

  async listarFuncionarios() {
    const funcionarios = await FuncionarioRepository.buscarTodosFuncionarios();

    const dadosSanitizados = (funcionarios || []).map(
      ({ senha, ...resto }) => resto,
    );

    return {
      sucesso: true,
      dados: dadosSanitizados,
      total: dadosSanitizados.length,
    };
  }

  async buscarFuncionarioPorId(id) {
    const idNumerico = Number(id);
    if (!id || isNaN(idNumerico) || idNumerico <= 0) {
      throw new AppError("ID inválido", 400);
    }

    const funcionario =
      await FuncionarioRepository.buscarFuncionarioUnico(idNumerico);

    if (!funcionario || !funcionario.ativo) {
      throw new AppError("Funcionario não encontrado", 404);
    }

    const { senha, ...funcionarioSanitizado } = funcionario;

    return {
      sucesso: true,
      dados: funcionarioSanitizado,
    };
  }

  async cadastrarFuncionario(dados) {
    const { nome, dataNascimento, senha, email, idCargo } = dados;

    if (
      !nome?.trim() ||
      !dataNascimento ||
      !senha?.trim() ||
      !email?.trim() ||
      !idCargo
    ) {
      console.error("Validação falhous - campos obrigatórios");
      throw new AppError(
        "Nome, data de nascimento, senha, email, id do cargo são obrigatórios",
        400,
      );
    }

    const emailFormatado = email.trim().toLowerCase();

    if (!this.#EMAIL_REGEX.test(emailFormatado)) {
      throw new AppError("Formato de e-mail inválido, 400");
    }

    const dataNasc = new Date(dataNascimento);
    if (isNaN(dataNasc.getTime())) {
      throw new AppError("Data de nascimento inválida", 400);
    }

    const idadeDiff = new Date(Date.now() - dataNasc.getTime());
    const idade = Math.abs(idadeDiff.getUTCFullYear() - 1970);
    if (idade < 14) {
      throw new AppError(
        "O funcionario deve ter no mínimo 14 anos de idade",
        422,
      );
    }

    /*
       const cargoExistente = await FuncionarioRepository.buscarFuncionarioUnico(idCargo)
       if(!cargoExistente) {
        throw new AppError('Cargo informado não existe no sistema', 404)
       }*/

    const senhaHash = await bcrypt.hash(senha.trim(), this.#SALT_ROUNDS);

    const novoFuncionario = {
      nome: nome.trim(),
      dataNascimento: dataNascimento,
      senha: senhaHash,
      email: emailFormatado,
      cargo: Number(idCargo),
      ativo: true,
    };

    const resultado =
      await FuncionarioRepository.cadastrarFuncionario(novoFuncionario);

    return {
      sucesso: true,
      mensagem: "Funcionário cadastrado com sucesso!",
      id: idCriado,
    };
  }

  async atualizarFuncionario(id, dados) {
    const idNumerico = Number(id);
    if (!id || isNaN(idNumerico) || idNumerico <= 0) {
      throw new AppError("Id inválido", 400);
    }

    const funcionarioExistente =
      await FuncionarioRepository.buscarFuncionarioUnico(idNumerico);

    if (!funcionarioExistente || !funcionarioExistente.ativo) {
      throw new AppError("Funcionario não encontrado ou inativo", 404);
    }

    const payloadAtualizacao = {};
    const { nome, dataNascimento, senha, email, idCargo } = dados;

    if (nome !== undefined && nome.trim() !== "")
      payloadAtualizacao.nome = nome.trim();
    if (email !== undefined) {
      const emailFormatted = email.trim().toLowerCase();
      if (!this.#EMAIL_REGEX.test(emailFormatted)) {
        throw new AppError("Formato de e-mail inválido", 400);
      }

      if (emailFormatted !== funcionarioExistente.email) {
        const emailEmUso =
          await FuncionarioRepository.buscarPorEmail(emailFormatted); //criar está função buscar por email
        if (emailEmUso) throw new AppError("Novo e-mail já está em uso", 409);
      }
      payloadAtualizacao.email = emailFormatted;
    }
    if (senha !== undefined && senha.trim() !== "") {
      payloadAtualizacao.senha = await bcrypt.hash(
        senha.trim(),
        this.#SALT_ROUNDS,
      );
    }

    if (idCargo !== undefined) {
      const idCargoNum = Number(idCargo);
      if (isNaN(idCargoNum))
        throw new AppError("ID de cargo deve ser um número", 400);

      const cargoExistente =
        await FuncionarioRepository.buscarCargoPorId(idCargoNum);
      if (!cargoExistente)
        throw new AppError("Cargo informado não existe", 404);

      payloadAtualizacao.idCargo = idCargoNum;
    }

    if (Object.keys(payloadAtualizacao).length === 0) {
      throw {
        status: 400,
        mensagem: "Nenhum dado válido enviado para atualização",
      };
    }

    await FuncionarioRepository.atualizarFuncionario(
      idNumerico,
      payloadAtualizacao,
    );

    return {
      sucesso: true,
      mensagem: "Funcionario atualizado com sucesso",
    };
  }

  async deletarFuncionario(id) {
    const idNumerico = Number(id);
    if (!id || isNaN(idNumerico) || idNumerico <= 0) {
      throw new AppError("ID inválido", 400);
    }

    const funcionarioExistente =
      await FuncionarioRepository.buscarFuncionarioUnico(idNumerico);
    if (!funcionarioExistente || !funcionarioExistente.ativo) {
      throw new AppError("Funcionário não encontrado ou inativo", 404);
    }

    await FuncionarioRepository.softDeleteFuncionario(idNumerico, new Date());

    return {
      sucesso: true,
      mensagem: "Funcionario desativado com sucesso",
    };
  }
}

module.exports = new FuncionarioService();
