const nonograms = [
  {
    id: "easy.bw",
    name: "Veeeery easy",
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
    name: "Yin and yang",
    // Is a pixelmap
    width: 15,
    height: 15, // This property could be self-calculated... but well, that's fine too
    colors: {
      "0": "#ffffff", // The first item will be the background color
      "1": "#333333"
    },
    pixels: Array.from(
      "000001111100000" +
      "000110000011000" +
      "001000000001100" +
      "010000000000110" +
      "101111000000010" +
      "111111100000001" +
      "111001100011001" +
      "111001100011001" +
      "111111100000001" +
      "111111110000011" +
      "011111111000110" +
      "011111111111110" +
      "001111111111100" +
      "000111111111000" +
      "000001111100000"
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
  },
  {
    id: "vue.c",
    name: "Vue",
    // Is a pixelmap
    width: 23,
    height: 20, // This property could be self-calculated... but well, that's fine too
    colors: {
      "0": "#aaecff", // The first item will be the background color
      "1": "#3fb984",
      "2": "#31475e"
    },
    pixels: Array.from(
      "11111222200000222211111" +
      "01111122220002222111110" +
      "00111122220002222111100" +
      "00111112222022221111100" +
      "00011112222022221111000" +
      "00011111222222211111000" +
      "00001111222222211110000" +
      "00001111122222111110000" +
      "00000111122222111100000" +
      "00000111112221111100000" +
      "00000011111211111000000" +
      "00000001111211110000000" +
      "00000001111111110000000" +
      "00000000111111100000000" +
      "00000000111111100000000" +
      "00000000011111000000000" +
      "00000000011111000000000" +
      "00000000001110000000000" +
      "00000000001110000000000" +
      "00000000000100000000000"
    )
  },
]

export { nonograms };
