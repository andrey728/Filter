

export function typesDefault() {
    return({
        number: {
            GT: null,
            LT: null,
            GTE: null,
            LTE: null,
            EQ: null,
            NEQ: null
        },
        string: {
            Like: null,
            NEQ: null
        },
        bool: {
            EQ: null
        }
    })
}