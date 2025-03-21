if (!localStorage.getItem('user')) location.href = '/auth'

const blogs = {
    load: async () => {
        getElbyId('container').innerHTML = [...await (await fetch('/blogs')).json()]
            .map(x => blogBoxTemplate(x)).join('');
    },
    blog: async () => {
        console.log("I Am Blog")
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await blogs.load()
})