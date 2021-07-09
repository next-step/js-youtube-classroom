import ModalController from "./modal/ModalController.js";
import { getYoutubeResult } from "./API.js"
import { $, $$ } from "./utils.js";

export default class App {
    constructor(){


        this.ModalController = new ModalController({
            onSubmit: (keyword) => {
                console.log(keyword)
            },
        })
    }
}

// const test = await getYoutubeResult('커피')

// console.log(test)

// setTimeout(async () => {
//     const t2 = await getYoutubeResult('커피', "CAoQAA")
//     console.log(t2)
// }, 2000)

