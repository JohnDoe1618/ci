
/*  
░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓███████▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░▒▓███████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓████████▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓████▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒▒▓█▓▒░   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓██████▓▒░ ░▒▓███████▓▒░        ░▒▓█▓▒▒▓█▓▒░   ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░        ░▒▓█▓▓█▓▒░    ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░        ░▒▓█▓▓█▓▒░    ░▒▓█▓▒░▒▓██▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░         ░▒▓██▓▒░     ░▒▓█▓▒░▒▓██▓▒░▒▓████████▓▒░ 
*/


const dataTypes = {
    str: 'String',
    int: 'Number',
    obj: 'Object',
    arr: 'Array',
    bool: 'Boolean',
    none: 'None',
}

// Определить тип данных для элемента данных
function determineType(data) {
    if(data === null || data === undefined) return dataTypes.none;
    if(Array.isArray(data) === true) return dataTypes.arr;
    if(typeof data === 'object') return dataTypes.obj;
    if(typeof data === 'string') return dataTypes.str;
    if(typeof data === 'number') return dataTypes.int;
    if(typeof data === 'boolean') return dataTypes.bool;
}


/**
 * @description
 *  Функция собирает результат выполнения операции (Объект) в структуру (объект), по которой возможно построить
 *  дерево данных в иерархическом порядке
 * 
 * @param {*} payload
 *      объект на основе которого строится итоговое дерево. Этот объект может содержать неограниченное количество данных любых типов (кроме Symbol)
*/
export function bundleTreeTableData(payload, parentKey = undefined) {
    let result = [];            // результирующий массив узлов дерева
    let keyIndex = 0;           // ключ для идентификации объекта дерева

    for (const key in payload) {
        const currentKey = (parentKey !== undefined)? `${parentKey}-${keyIndex}` : `${keyIndex}`;
        const node = {
            key: currentKey,
            data: {
                key,
                value: (typeof payload[key] === 'object' && payload[key] !== null)? '...' : payload[key],
                type: determineType(payload[key]),
            }
        }
        if(typeof payload[key] === 'object' && payload[key] !== null) {
            if(Array.isArray(payload[key])) {
                node.children = payload[key].map((item, index) => {
                    return {
                        key: `${currentKey}-${index}`,
                        data: {
                            key: index,
                            value: (typeof item === 'object' && item !== null)? '...' : item,
                            type: determineType(item),
                        },
                        children: (typeof item === 'object' && item !== null)? bundleTreeTableData(item, `${currentKey}-${index}`) : [],
                    }
                });
            } else {
                node.children = bundleTreeTableData(payload[key], currentKey);
            }
        }
        result.push(node);
        keyIndex++;
    }
    return result;
}

