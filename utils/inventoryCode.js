


export default function inventoryCode(list, inventario, fonteEmissao, sigla, oldCode) {
    const CodeExists = list.find(elem => elem.fonteEmissao === fonteEmissao)
    const CodeInventoryList = inventario.find(elem => elem.fonteEmissao === fonteEmissao)

    console.log(list, inventario, fonteEmissao, sigla, oldCode, CodeExists)

    if (CodeExists && !oldCode) {
        // console.log('111', CodeExists)
        const CODE = CodeExists.code.split('-')
        const newNumber = parseInt(CODE[1]) + 1
        const newCode = sigla + '-' + newNumber.toString()
        const isValid = verifyCode(newCode, list, inventario)
        if (isValid) {
            return newCode
        } else {
            inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
        }
    } else if (!CodeExists && CodeInventoryList && !oldCode) {
        // console.log('222')
        const CODE = CodeInventoryList.code.split('-')
        const newNumber = parseInt(CODE[1]) + 1
        const newCode = sigla + '-' + newNumber.toString()
        const isValid = verifyCode(newCode, list, inventario)
        if (isValid) {
            return newCode
        } else {
            inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
        }
    } else if (oldCode) {
        // console.log('333', oldCode)
        const CODE = oldCode.split('-')
        const newNumber = parseInt(CODE[1]) + 1
        const newCode = sigla + '-' + newNumber.toString()
        const isValid = verifyCode(newCode, list, inventario)
        if (isValid) {
            return newCode
        } else {
            inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
        }
    }

    else {
        // console.log('444')
        return `${sigla}-1`
    }

}

const verifyCode = (code, list, inventario) => {
    const inventarioCodeExists = inventario.find(elem => elem.code === code)
    const listCodeExists = list.find(elem => elem.code === code)
    if (inventarioCodeExists || listCodeExists) {
        return false
    } else {
        return true
    }
}
