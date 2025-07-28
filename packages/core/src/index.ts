export function hello(name: string = 'world'): string {
  return `Hello, ${name}!`;
}

export function runCli(argv: string[]): void {
  // Simple arg parsing: rhyolite [name]
  const name = argv[2] || 'world';
  // eslint-disable-next-line no-console
  console.log(hello(name));
}
