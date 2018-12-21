/**
 * Decodes any encoded HTML Entities
 * @param {String} string - The String
 * Usage: decodeEntities('Examples &amp; tests')
 */
export const decodeEntities = (string) => {
    const doc = new DOMParser().parseFromString(string, 'text/html');

    return doc.documentElement.textContent;
};
