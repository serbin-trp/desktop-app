export function generateId(): string {
  return `${makeLetters(8)}---${Date.now().toString()}`;
}

function makeLetters(lenght: number): string {
  const upperChars = 'ABCDEFGHIKLLMNOPQRSTUVWXYZ';
  const lowerChars = upperChars.toLowerCase();
  const allowedChars = upperChars + lowerChars;

  let result: string = '';
  for (let i = 0; i < lenght; i++) {
    result += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length),
    );
  }
  return result;
}
