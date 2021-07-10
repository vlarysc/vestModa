import firebase from "firebase/app";
import "firebase/firestore";

export function getDados(context) {
  let produtos = [];
  firebase
    .firestore()
    .collection("usuario")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        produtos.push(doc.data());
        console.log("test", doc.data());
      });
      context.commit("setData", produtos);
    });
}
