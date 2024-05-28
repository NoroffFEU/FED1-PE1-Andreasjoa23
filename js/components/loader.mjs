export function loader() {
    const loader = document.createElement("div")
    loader.classList.add("loader") 
    loader.id = "loader"
    document.body.appendChild(loader)
}

export function loader() {
    const loader = document.getElementById("loader")
    if(loader) {
        loader.remove();
    }
}