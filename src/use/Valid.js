

export function minLength(num, val) {
    return (val.length >= num)
}

export function correctRange(gt, lt) {
    return !((gt - lt) >= 0)
}

// попробовать перенести функционал из хранилища сюда