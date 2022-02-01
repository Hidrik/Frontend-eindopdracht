export const spaceToUnderscore = (string) => string.replace(/ /g,"_");
/*Chose for regex because that is faster (said online)*/

test('The spaceToUnderscore() function takes strings spaced with spaces and combines them with a underscore', () => {
    // ARRANGE
    const input = 'Hello I am a developer';

    // ACT
    const output = spaceToUnderscore(input);

    // ASSERT
    expect(output).toEqual('Hello_I_am_a_developer');
});