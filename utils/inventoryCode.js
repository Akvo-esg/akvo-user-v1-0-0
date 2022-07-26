


export default function inventoryCode(list, inventario, fonteEmissao, oldCode) {

    const sigla = siglaGenerator(fonteEmissao)

    const CodeExists = list.find(elem => elem.fonteEmissao === fonteEmissao)
    const CodeInventoryList = inventario.find(elem => elem.fonteEmissao === fonteEmissao)

    if (CodeExists) {
        // console.log(1)
        const CODE = CodeExists.code.split('-')
        const newNumber = parseInt(CODE[1]) + 1
        const newCode = sigla + '-' + newNumber.toString()
        const isValid = verifyCode(newCode, list, inventario)
        if (isValid) {
            return newCode
        } else {
            inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
        }
    } else if (CodeInventoryList) {
        // console.log(2)
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
        // console.log(3)
        const CODE = oldCode.split('-')
        const newNumber = parseInt(CODE[1]) + 1
        const newCode = sigla + '-' + newNumber.toString()
        const isValid = verifyCode(newCode, list, inventario)
        if (isValid) {
            return newCode
        } else {
            inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
        }
    } else {
        // console.log(4)
        const newCode = sigla + '-1'
        return newCode
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

const siglaGenerator = (fonteEmissao) => {
    switch (fonteEmissao) {
        case "Fontes Estacionárias de Combustão":
            return "FEC"

        case "Transportes":
            return "TRN"
    }
}


// export default function inventoryCode(list, inventario, fonteEmissao, oldCode) {


//     const sigla = siglaGenerator(fonteEmissao)
//     // console.log("list", sigla, list)

//     const CodeExists = list.find(elem => elem.fonteEmissao === fonteEmissao)
//     const CodeInventoryList = inventario.find(elem => elem.fonteEmissao === fonteEmissao)
//     // console.log("CodeExists", CodeExists, "CodeInventoryList", CodeInventoryList)

//     if (!CodeExists && CodeInventoryList && !oldCode) {
//         // console.log('222')
//         const CODE = CodeInventoryList.code.split('-')
//         const newNumber = parseInt(CODE[1]) + 1
//         const newCode = sigla + '-' + newNumber.toString()
//         const isValid = verifyCode(newCode, list, inventario)
//         if (isValid) {
//             return newCode
//         } else {
//             inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
//         }
//     }
//     if (CodeExists && !oldCode) {
//         // console.log('111', CodeExists)
//         const CODE = CodeExists.code.split('-')
//         const newNumber = parseInt(CODE[1]) + 1
//         const newCode = sigla + '-' + newNumber.toString()
//         const isValid = verifyCode(newCode, list, inventario)
//         if (isValid) {
//             return newCode
//         } else {
//             inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
//         }
//     }
//     if (oldCode) {
//         // console.log('333', oldCode)
//         const CODE = oldCode.split('-')
//         const newNumber = parseInt(CODE[1]) + 1
//         const newCode = sigla + '-' + newNumber.toString()
//         const isValid = verifyCode(newCode, list, inventario)
//         if (isValid) {
//             return newCode
//         } else {
//             inventoryCode(list, inventario, fonteEmissao, sigla, newCode)
//         }
//     }

//     else {
//         // console.log('444')
//         return `${sigla}-1`
//     }

// }

// const verifyCode = (code, list, inventario) => {
//     const inventarioCodeExists = inventario.find(elem => elem.code === code)
//     const listCodeExists = list.find(elem => elem.code === code)
//     if (inventarioCodeExists || listCodeExists) {
//         return false
//     } else {
//         return true
//     }
// }

// const siglaGenerator = (fonteEmissao) => {
//     switch (fonteEmissao) {
//         case "Fontes Estacionárias de Combustão":
//             return "FEC"

//         case "Transportes":
//             return "TRN"
//     }
// }
