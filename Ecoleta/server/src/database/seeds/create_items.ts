import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([
        {title: 'Lampadas', image: 'lampdas.svg'},
        {title: 'Pilhas e baterias', image: 'papeis-papelao.svg'},
        {title: 'Papéis e papelão', image: 'eletronicos.svg'},
        {title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        {title: 'Ôleo de cozinha', image: 'oleo.svg'},
    ])
}
