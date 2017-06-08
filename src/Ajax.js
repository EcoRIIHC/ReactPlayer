const Ajax = (option) => {
    if (typeof option !== 'object') {
        return console.log('ajax.js: option is not an object')
    }
    let type = option.type || 'post'
    let url = option.url || ''
    let data = option.data || {}
    let async = option.async === undefined ? true : option.async
    let success = option.success || function () {}
    let error = option.error || function (res) {alert(res.msg)}

    const fun = (res) => {
        if (res.code === 0) {
             success(res)
        } else {
            error(res)
        }
    }

    let xhr = new XMLHttpRequest()
    if (async === true) {
        xhr.timeout = 5000
    }
    xhr.open(type, url, async)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                let res = JSON.parse(xhr.responseText)
                fun(res)
            } else {
                alert('网络错误')
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (type === 'post') {
        xhr.send(JSON.stringify(data))
    } else {
        xhr.send()
    }
}
export default Ajax