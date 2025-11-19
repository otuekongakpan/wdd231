const openButton = document.querySelector("#openButton");
const closeButton = document.querySelector("#closeButton");
const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogBox div");
openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One apple contains 95 calories`
})

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One orange contains 195 calories`
})

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One banana contains 205 calories`
})
closeButton.addEventListener("click", () => {
    dialogBox.close();
})