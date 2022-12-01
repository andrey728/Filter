

export function validatorsDefault() {
    return({
        number: {
            errors: false,
            select_range: false,
            minLength: {}
        },
        string: {
            minLength: {}
        },
        bool: {
            minLength: {}
        }
    })
}