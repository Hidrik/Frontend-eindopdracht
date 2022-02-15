export const underscoreToEndpoint = (string) => string.split("_").join(',');

test('The spaceToUnderscore() function takes strings spaced with underscores and combines them with a comma', () => {
    // ARRANGE
    const input = 'Hello_I_am_a_developer';

    // ACT
    const output = underscoreToEndpoint(input);

    // ASSERT
    expect(output).toEqual('Hello,I,am,a,developer');
});