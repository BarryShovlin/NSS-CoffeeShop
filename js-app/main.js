const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const contentTarget = document.querySelector(".beans")
const targetBeanForm = document.querySelector(".beanForm")
const saveButton = document.querySelector("#saveBean")
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties)
            contentTarget.innerHTML += showBeans(beanVarieties)

        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}


const AddBean = bean => {
    let stringifyObj = JSON.stringify(bean)
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: stringifyObj
    })
        .then(getAllBeanVarieties)
}

saveButton.addEventListener("click", clickEvent => {
    if (clickEvent.target.id == "saveBean") {
        const name = document.querySelector("#beanName").value
        const region = document.querySelector("#beanRegion").value
        const notes = document.querySelector("#beanNotes").value

        const newBean = {
            name: name,
            region: region,
            notes: notes
        }
        AddBean(newBean)
    }
})

const showBeans = (beans) => {
    let beanVar = ""
    beans.forEach(bean => {
        beanVar += `
    <article class="bean"
    < div class="beanName" > Name: ${bean.name}</div >
    <div class="beanRegion">Region: ${bean.region}</div>
    <div class="beanNotes">Notes: ${bean.notes}</div>
    </article>
    `
    });
    return beanVar
}

const beanForm = () => {
    targetBeanForm.innerHTML = `
    <input id="beanName" type="text" placeholder="Bean Name">
    <input id="beanRegion" type="text" placeholder="Region">
    <input id="beanNotes" type="textarea" placeholder="Notes">
    <button id="saveBean">Save This Bean</button>
    `
}