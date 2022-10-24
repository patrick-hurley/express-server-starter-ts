const header = require('./blocks/header')
const footer = require('./blocks/footer')

function getContent(error: string) {
    return `
    <p
        style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; margin-bottom: 30px; line-height: 28px">
        There was a server error we should know about.</p>
    <table border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
        <tbody>
            <tr>
                <td
                    style="font-family: sans-serif; font-size: 15px; vertical-align: top; padding-bottom: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0"
                        style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                        <tbody>
                            <tr>
                                <td style="font-family: sans-serif; font-size: 15px; vertical-align: top; border-radius: 5px; text-align: center;">
                                    <p style="font-size: 15px; font-weight: 900; text-align: center">${error}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`
}

export default (error: string) => {
    return header + getContent(error) + footer
}
