const nonograms = [
  {
    id: "easy.bw",
    name: "Easy",
    // Is a pixelmap
    width: 3,
    height: 3, // This property could be self-calculated... but well, that's fine too
    colors: {
      "0": "#ffffff", // The first item will be the background color
      "1": "#333333"
    },
    pixels: Array.from("111011111")
  },
  {
    id: "normal.bw",
    name: "Normal",
    // Is a pixelmap
    width: 15,
    height: 15, // This property could be self-calculated... but well, that's fine too
    colors: {
      "0": "#ffffff", // The first item will be the background color
      "1": "#333333"
    },
    pixels: Array.from(
      "111011011010110" +
        "111011110101101" +
        "110110110101101" +
        "110111110101101" +
        "110111110101101" +
        "110110110101101" +
        "110111110101101" +
        "100111110101101" +
        "110111110101101" +
        "110111110001101" +
        "110111110100001" +
        "110000000100101" +
        "110111110101101" +
        "110111110100001" +
        "110111110101101"
    )
  },
  {
    id: "normal.c",
    name: "Boca Junios",
    // Is a pixelmap
    width: 15,
    height: 15, // This property could be self-calculated... but well, that's fine too
    colors: {
      "0": "#ffffff", // The first item will be the background color
      "1": "#01478f",
      "2": "#ffcb03"
    },
    pixels: Array.from(
      "000220000022000" +
        "002112222211200" +
        "221121211212122" +
        "211111111111112" +
        "211212112121212" +
        "211111111111112" +
        "210011010111012" +
        "210110010011012" +
        "020010100010020" +
        "021111111111120" +
        "021121121121120" +
        "002111111111200" +
        "002121212121200" +
        "000211111112000" +
        "000021121120000"
    )
  }
];

export { nonograms };
