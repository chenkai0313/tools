declare module 'opencc-js' {
  const Locale: {
    from: { cn: unknown; hk: unknown; tw: unknown; twp: unknown; jp: unknown }
    to: { cn: unknown; hk: unknown; tw: unknown; twp: unknown; jp: unknown }
  }
  function Converter(config: { from: unknown; to: unknown }): (text: string) => string
}
