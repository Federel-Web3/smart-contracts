# Smart contracts

Esse repositório contém tudo relacionado aos contratos inteligentes das nossas soluções

# Mantendo o projeto

Esse projeto utiliza o Hardhat. Recomendamos usar o VSCode a extensão do eslint para esse repositório para formatação automática do código.

Recomendamos que instale também a seguinte extensão para formatar o código solidity de maneira automática se quiser: `code --install-extension JuanBlanco.solidity` e o prettier.

### testando

Para testar localmente: `npx hardhat test`

# Solução e contratos

Nosso projeto incorpora imóveis da união na blockchain e possui sistemas de votação similar a DAOs, para que cartórios consigam verificar a veracidade dos imóveis antes de serem registrados na blockchain.

### GoodsAndRealEstate

Este contrato tem endereço 0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345, ele recebe o CID do ipfs de um imóvel e minta uma NFT de padrão ERC1155 e associa a conta de um proprietário.

### RegistryDAO

Tem endereço 0x3f7C7BA8689bcD40F9bF04a8ce78E95C9BcA43De e serve para autorizar quem tem permissão para incorporar e propor incorporações de bens na blockchain, que são feitas no contrato "Registry" 

### Registry

Já este contrato tem endereço 0xFC22fB792c33d687A41679D62eC2a9E2eEC44A3f, lida com a incorporação dos bens mintados em "GoodsAndRealEstate", como concessões, aforramentos, transferências e outras operações jurídicas dos terrenos da SPU.