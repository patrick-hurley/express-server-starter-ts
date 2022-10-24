const self = {
    trimAndNullObjectProperties: function (obj: any) {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === 'object') {
                self.trimAndNullObjectProperties(value)
            } else {
                if (value === null || value === '') {
                    obj[key] = null
                } else if (typeof value === 'string') {
                    // Remove whitespace and emoji
                    obj[key] = value
                        .replace(
                            /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
                            ''
                        )
                        .trim()
                }
            }
        }
        return obj
    },
}

export default self
