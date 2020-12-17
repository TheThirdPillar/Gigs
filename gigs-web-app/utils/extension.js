const extensionId = 'ccjpfpcdjnlmkdnpbkahbeifmlbdgmeb'

const connectToExtension = (request) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(extensionId, request, (response) => {
                if (chrome.runtime.lastError) return reject(false)
                if (response && response.status === 'SUCCESS') {
                    return resolve(response)
                } else {
                    return reject(false)
                }
            })
        })
}

export default connectToExtension