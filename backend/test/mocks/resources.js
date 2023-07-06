const smallResource = {
    id: 1,
    name: "Ponte Vasco da Gama",
    type: {
        id: 1,
        name: "Ponte"
    }
}

const mediumResource = {
    id: 4,
    name: "Estacionamento - Rua Adolfo Casais Monteiro, Cód. 1150",
    location: "[ -95626.942026953372988, -103494.967667903620168 ]",
    type: {
        id: 3763,
        name: "rede_viaria_estacionamento"
    },
    additionalData: "{ \"type\": \"Feature\", \"properties\": { \"gid\": 4, \"Tipo de Pavimento\": \"Cal\u00E7ada\", \"Estado Conserva\u00E7\u00E3o da Marca\": \"n\/a\", \"Estado Conserva\u00E7\u00E3o do Pavimento\": \"Bom\", \"Tipo\": \"Recorte\", \"Marca\": \"Sem Marca\u00E7\u00E3o\", \"\u00C9 Tarifado?\": \"N\u00E3o\", \"Capacidade\": 4, \"Orienta\u00E7\u00E3o\": \"Longitudinal\", \"N\u00BA de Lugares Condicionados\": 0, \"Descri\u00E7\u00E3o dos Lugares Condicionados\": null, \"Propriedade\": null, \"C\u00F3digo de Rua\": 1150, \"Nome da Rua\": \"Rua Adolfo Casais Monteiro\" }, \"geometry\": { \"type\": \"Polygon\", \"coordinates\": [ -95626.942026953372988, -103494.967667903620168 ] } }"
}

const largeResource = {
    id: 3,
    name: "Espaços Verdes e Recreio - Lagoas Park",
    location: "[ -102353.563602066627936, -105399.78382560441969 ]",
    type: {
        id: 3763,
        name: "equipamentos_coletivos_espacos_verdes_recreio"
    },
    additionalData: "{ \"type\": \"Feature\", \"properties\": { \"C\u00F3digo de Equipamento\": 3, \"Nome\": \"Lagoas Park\", \"Morada\": \"Rua Sem informa\u00E7\u00E3o\", \"Telefone\": null, \"Email\": null, \"P\u00E1gina Web\": null, \"Hor\u00E1rio\": null, \"Dias de fecho\": \"\", \"Entidade Gestora\": \"Sem informa\u00E7\u00E3o\", \"Tipo de Gest\u00E3o\": \"P\u00FAblica\", \"Estatuto Jur\u00EDdico\": \"Sem informa\u00E7\u00E3o\", \"Refer\u00EAncia localiza\u00E7\u00E3o\": null, \"Categoria\": \"Espa\u00E7os Verdes e Recreio\", \"SubCategoria\": \"Parques e Jardins de Uso P\u00FAblico\", \"Classifica\u00E7\u00E3o\": \"Jardim\", \"Sigla\": \"\", \"Descri\u00E7\u00E3o\": null, \"Observa\u00E7\u00F5es\": \"\", \"Situa\u00E7\u00E3o\": null, \"Acesssibilidade\": \"Sem informa\u00E7\u00E3o\", \"Abertura\": \"Sem informa\u00E7\u00E3o\", \"Tipo de Hor\u00E1rio\": \"Sem informa\u00E7\u00E3o\", \"Acesso a Deficientes\": \"N\u00E3o tem acesso\", \"Lota\u00E7\u00E3o\": null, \"N\u00BA Salas\": 0, \"N\u00BA Audit\u00F3rios\": null, \"Ofertas\": \"\" }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -102353.563602066627936, -105399.78382560441969 ] } }"
}

module.exports = {
    smallResource,
    mediumResource,
    largeResource
};