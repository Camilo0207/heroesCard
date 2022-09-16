export const helpHttps =()=>{
    const customFetch = async (endpoint,options)=>{
        const defaultHeader ={
            accept: "application/json"
        }

        const controller = new AbortController()
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers 
            ? { ...defaultHeader, ...options.headers }
            :defaultHeader;

        options.body = JSON.stringify(options.body) || false
        if(!options.body) delete options.body

        setTimeout(() => {
           controller.abort() 
        }, 3000);

        try {
            const res = await fetch(endpoint,options)
            return await (
                res.ok
                ?res.json()
                :Promise.reject({
                    err:true,
                    status:res.status || "00",
                    statusText :res.statusText || "Ocurrio un error"
                })
            )
        } catch (error) {
            return error
        }
    }

    const get =(endpoint,options={})=>{
        return customFetch(endpoint,options)
    }

    const post =(endpoint,options={})=>{
        options.method = "POST"
        return customFetch(endpoint,options)
    }

    const put =(endpoint,options={})=>{
        options.method = "PUT"
        return customFetch(endpoint,options)
    }

    const del =(endpoint,options={})=>{
        options.method = "DELETE"
        return customFetch(endpoint,options)
    }

    return{
        get,
        post,
        put,
        del
    }
}