// import { produtos } from "../mock"

import { produtos } from "../mock"

// export default function handler(req, res) {
//     console.log(req.query.name)
//     res.status(200).json(produtos)
// }


export default function handler(req, res) {
    const name = req.query.name
    const categoryId = +req.query.categoryId


    const listaFiltrada = {
        items: produtos.items,
    }

    if (categoryId) {
        listaFiltrada.items = listaFiltrada.items.filter(produto => (produto.categoryId === categoryId))
    }
    if (name) {
        listaFiltrada.items = listaFiltrada.items.filter(produto => (produto.name.toUpperCase().includes(name.toUpperCase())))
    }
    res.status(200).json(listaFiltrada)
}
