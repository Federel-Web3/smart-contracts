# Smart contracts

Esse repositório contém tudo relacionado aos contratos inteligentes das nossas soluções

# Mantendo o projeto

Esse projeto utiliza o Hardhat. Recomendamos usar o VSCode a extensão do eslint para esse repositório para formatação automática do código.

Recomendamos que instale também a seguinte extensão para formatar o código solidity de maneira automática se quiser: `code --install-extension JuanBlanco.solidity` e o prettier.

### testando

Para testar localmente: `npx hardhat test`

# Solução e contratos

Nosso projeto incorpora imóveis da união na blockchain e possui sistemas de votação similar a DAOs, para que cartórios consigam verificar a veracidade dos imóveis
antes de serem registrados na blockchain.

### GoodsAndRealState

Este contrato tem endereço 0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345, ele recebe o CID do ipfs de um imóvel e minta uma NFT de padrão ERC1155 e associa a conta de um proprietário

### RegistryDAO

Já este contrato 