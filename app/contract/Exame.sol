// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExameHealthContract {
    struct Exame {
        string nomeExame;
        string medicoResponsavel;
        uint256 dataExame;
        string localRealizado;
    }

    Exame[] public exames;

    // Evento emitido quando um novo exame é registrado
    event NovoExameRegistrado(
        string nomeExame,
        string medicoResponsavel,
        uint256 dataExame,
        string localRealizado
    );

    // Função para registrar um novo exame
    function registrarExame(
        string memory _nomeExame,
        string memory _medicoResponsavel,
        uint256 _dataExame,
        string memory _localRealizado
    ) public {
        Exame memory novoExame = Exame({
            nomeExame: _nomeExame,
            medicoResponsavel: _medicoResponsavel,
            dataExame: _dataExame,
            localRealizado: _localRealizado
        });

        exames.push(novoExame);

        emit NovoExameRegistrado(
            _nomeExame,
            _medicoResponsavel,
            _dataExame,
            _localRealizado
        );
    }

    // Função para obter informações de todos os exames registrados
    function getExames() public view returns (string[] memory, string[] memory, uint256[] memory, string[] memory) {
        uint256 totalExames = exames.length;
        string[] memory nomes = new string[](totalExames);
        string[] memory medicos = new string[](totalExames);
        uint256[] memory datas = new uint256[](totalExames);
        string[] memory locais = new string[](totalExames);

        for (uint256 i = 0; i < totalExames; i++) {
            nomes[i] = exames[i].nomeExame;
            medicos[i] = exames[i].medicoResponsavel;
            datas[i] = exames[i].dataExame;
            locais[i] = exames[i].localRealizado;
        }

        return (nomes, medicos, datas, locais);
    }
}
