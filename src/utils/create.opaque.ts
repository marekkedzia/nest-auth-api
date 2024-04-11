function createOpaque<Type, Token>(value: Type): Token {
  return value as unknown as Token;
}

export { createOpaque };
