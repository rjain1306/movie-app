/* eslint-disable prettier/prettier */
/* eslint-disable prefer-named-capture-group */
export class StringHelper {
  static toCamelCase(str: string): string {
    return str
      .replace(/\s(.)/g, $1 => {
        return $1.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, $1 => {
        return $1.toLowerCase();
      });
  }

  static toSnakeCase(str: string): string {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map(x => x.toLowerCase())
      .join('_');
  }

  static nameToCode(str: string): string {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map(x => x.toLowerCase())
      .join('-');
  }

  static convertCamelCaseToNormal(
    camelCaseString: string,
    isAllCapital: boolean = true,
  ): string {
    // Add a space before each capital letter
    let normalString = camelCaseString.replace(/([A-Z])/g, ' $1');

    if (isAllCapital) {
      // Capitalize the first letter of each word
      normalString = normalString
        .split(' ')
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');

      return normalString;
    }
    return normalString.toLocaleLowerCase();
  }
}
