//Usar se precisar usar o SWR (atualização em tempo real das atividades)

import axios from 'axios'

export default async function api(path) {
    return axios.get(path)
}