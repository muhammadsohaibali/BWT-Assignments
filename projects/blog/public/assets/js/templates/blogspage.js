const ts = (strg, len = 80) => {
    if (!(typeof strg === "string")) return console.error("This Is not String");
    if (strg.length > len) return `${strg.slice(0, len)}...`;
    return strg;
}

// Templates
const blogBoxTemplate = (blog) => {
    return `
    <div class="blog-card">
        <div class="blog-header">
            <div>
                <h4>${blog.author}</h4>
                <span>${blog.date}</span>
            </div>
        </div>
        <h2>${blog.title}</h2>
        <p>${ts(blog.mainText)}</p>
        <a href="/blogs/${blog.id}">Read more →</a>
    </div>`;
}

