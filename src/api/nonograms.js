import { nonograms } from "/@/assets/nonograms.js";

// Fake API call, just for this PoC. 
const fetchNonograms = () => {
  return Promise.resolve(nonograms)
}

// Fake API call, just for this PoC. 
const fetchNonogram = (id) => {
  return new Promise(resolve => {
    const nonogram = nonograms.find(n => n.id === id);
    resolve(nonogram)
  })
}

export { fetchNonograms, fetchNonogram };