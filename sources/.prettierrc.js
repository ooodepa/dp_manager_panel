module.exports = {
  // arrowParens - нужно ли ставить скобки вокруг параметров функции, если их количество равно 1.
  // "avoid" означает, что скобки не нужны, "always" - что нужны.
  arrowParens: 'avoid',
  // bracketSameLine - располагать ли фигурные скобки на той же строке, что и оператор или на следующей строке.
  bracketSameLine: false,
  // bracketSpacing - нужны ли пробелы между фигурными скобками.
  bracketSpacing: true,
  // singleQuote - нужно ли использовать одинарные кавычки вместо двойных кавычек для строковых литералов.
  singleQuote: true,
  // trailingComma - нужна ли запятая после последнего элемента в массивах или объектах.
  // "all" означает, что запятые нужны везде, "es5" - только в ES5 и более новых версиях JavaScript.
  trailingComma: 'all',
  // printWidth - максимальная длина строки в коде.
  printWidth: 80,
  // tabWidth - количество пробелов, заменяющих один табулятор.
  tabWidth: 2,
  // useTabs - использовать ли табуляцию вместо пробелов.
  useTabs: false,
  // semi - нужна ли точка с запятой в конце выражений.
  semi: true,
  // quoteProps - нужно ли обрамлять имена свойств в кавычки в объектных литералах.
  // "as-needed" означает, что кавычки не нужны, если имя свойства содержит только допустимые символы.
  quoteProps: 'as-needed',
  // jsxSingleQuote - нужно ли использовать одинарные кавычки для атрибутов JSX.
  jsxSingleQuote: false,
  // jsxBracketSameLine - располагать ли фигурные скобки в JSX на той же строке, что и оператор или на следующей строке.
  // jsxBracketSameLine: false,
  // insertPragma - вставлять ли специальный комментарий в начало форматируемого файла,
  // указывающий, что этот файл форматируется с помощью Prettier.
  insertPragma: false,
  // proseWrap - как обрабатывать переносы строк внутри абзацев.
  // "always" означает, что нужно переносить строки всегда, "never" - никогда.
  proseWrap: 'always',
  // htmlWhitespaceSensitivity - как обрабатывать пробелы и переносы строк в HTML-коде.
  // "css" означает, что нужно сохранять пробелы только там, где они влияют на CSS-отображение.
  htmlWhitespaceSensitivity: 'css',
  // singleAttributePerLine - управляет тем, форматируются HTML-теги с атрибутами.
  // Если значение свойства установлено в true, каждый атрибут будет находиться на новой строке.
  singleAttributePerLine: false,
};
