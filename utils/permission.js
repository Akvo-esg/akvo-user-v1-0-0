import Router from 'next/router'


//Retorna as unidades às quais o usuário tem permissão, dependendo do seu status e da configuração da empresa.
export function unitsPermissions(unidades, permissions, userConfig, userStatus) {

    if (userConfig === 'basico' && (userStatus === 'admGlobal' || userStatus === "admLocal")) {
        return unidades
    } else {
        if (!permissions) {
            return unidades
        } else {
            return unidades.filter(elem => permissions.includes(elem._id))
        }
    }

}

//Retorna a intitulação do usuário conforme seu status e a configuração da empresa
export function userStatusName(userStatus, userConfig) {

    let status = ''

    if (userStatus === "admGlobal" && (!userConfig || userConfig === 'avancado')) {
        status = 'Administrador Global'
    }
    if (userStatus === "admLocal" && (!userConfig || userConfig === 'avancado')) {
        status = 'Administrador Local'
    }
    if ((userStatus === "admGlobal" || userStatus === "admLocal") && (!userConfig || userConfig === 'basico')) {
        status = 'Administrador'
    }
    if (userStatus === "user") {
        status = 'Usuário'
    }
    if (userStatus === 'auditor') {
        status = "Auditor"
    }

    return status

}

//Função usada como condição para visualizar o link "Editar Instituição"
export function editCompanyView(userStatus, userConfig) {

    if (!userStatus || !userConfig) {
        return false
    } else if (userConfig === "avancado" && userStatus !== "admGlobal") {
        return false
    } else if (userConfig === "basico" && userStatus !== "admGlobal" && userStatus !== "admLocal") {
        return false
    } else {
        return true
    }
}

//Redirecionamento para página "/pricing" caso o acesso não for permitido para conta teste (usado no href)
//EX: <Link href={freeAccountRedirect(dateLimit, '/userAdd')}>
export function freeAccountRedirect(freeAccount, url) {

    if (freeAccount) return '/pricing'
    else return url
}


//Função de restrição de acesso à pagina ou à elementos na página conforme o status do usuário e os tipo de usuários não permitidos
// EX: userRestriction(['user', 'auditor'], data.userStatus, true) usuários do tipo 'user' ou 'auditor' não podem acessar a página, e retorna à página inicial
// EX: userRestriction(['user', 'auditor'], data.userStatus) usuários do tipo 'user' ou 'auditor' não podem visualizar certos elementos na página
export function userRestriction(usersNotPermitedArray, userStatus, redirect = false) {

    const restrictionExists = usersNotPermitedArray.filter(elem => elem === userStatus)

    if (restrictionExists.length) {
        if (redirect) {
            Router.push('/')
        } else {
            return false
        }
    } else {
        return true
    }


}


export function userConfigUserStatusPermission(userConfig, userStatus, editUserStatus) {

    if (userConfig === "basico") {
        if (userStatus === "admLocal" || userStatus === "admGlobal") {
            return true
        } else {
            return false
        }
    }

    if (userConfig === "avancado") {
        if (userStatus === "admGlobal") {
            return true
        } else if (userStatus === "admLocal" && editUserStatus !== "admGlobal") {
            return true
        } else {
            return false
        }
    }
}


export function idCompare(user_id, elem_id, userConfig, userStatus) {

    if (userStatus === "admLocal" || userStatus === "admGlobal" || userStatus === "consultorExterno") {
        return true
    }
    if (user_id === elem_id) return true
    else false

}