/**
 * Reemplaza los placeholders en un template HTML por los valores del objeto data
 * @param template Plantilla HTML con variables (ej. {{name}})
 * @param data Objeto con las variables a reemplazar
 * @returns HTML con los datos interpolados
 */
export function renderTemplate<T extends Record<string, string | number>>(
  template: string,
  data: T,
): string {
  return template.replace(/{{\s*([\w]+)\s*}}/g, (_, key: string) => {
    const value = data[key];
    return value !== undefined ? String(value) : '';
  });
}
