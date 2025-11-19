import { temples } from "../data/temples";
import { url } from "../data/temples";

const showHere = document.querySelector("#showHere");
const myDialog = document.querySelector("#myDialog");
const myTitle = document.querySelector("#myDialog h2");
const myClose = document.querySelector("#myDialog button");
const myInfo = document.querySelector("#myDialog p");

myClose.addEventListener("click", () => {
    myDialog.close()
})