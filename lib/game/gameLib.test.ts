import WordGameLib from "./gameLib";

const mockWords = `aa\naaa\naaaa\naaaaa\naaaaaa`;

describe("Wordgamelib --> getWord", () => {
  it("Should return a 6 characters word given a level 6", () => {
    const { getWord } = WordGameLib(async () => mockWords);
    getWord(6).then((word) => {
      expect(word).toHaveLength(6);
    });
  });
  it("Should return a 2 characters word given a level 2", () => {
    const { getWord } = WordGameLib(async () => mockWords);
    getWord(6).then((word) => {
      expect(word).toHaveLength(6);
    });
  });
});

describe("Wordgamelib --> validateWord", () => {
  it("Should return error when base word length and input word length are not equal ", () => {
    const { validateWord } = WordGameLib(async () => mockWords);
    expect(() => validateWord("jingle", "bell")).toThrowError();
    expect(() => validateWord("human", "caramola")).toThrowError();
    expect(() => validateWord("", "caramola")).toThrowError();
    expect(() => validateWord("human", "")).toThrowError();
  });
  it("Should return an array of zeros with the base word length if base word and input word are equals", () => {
    const { validateWord } = WordGameLib(async () => mockWords);
    expect(validateWord("hola", "hola")).toEqual([0, 0, 0, 0]);
  });
  it(`Should return an array of -1 with the base word length if all characters are different between base word and input word`, () => {
    const { validateWord } = WordGameLib(async () => mockWords);
    expect(validateWord("nite", "hola")).toEqual([-1, -1, -1, -1]);
  });
  it(`Should return an array of 1 with the base word length if all characters in input word are included in base word but in different position`, () => {
    const { validateWord } = WordGameLib(async () => mockWords);
    expect(validateWord("aloh", "hola")).toEqual([1, 1, 1, 1]);
  });
});
