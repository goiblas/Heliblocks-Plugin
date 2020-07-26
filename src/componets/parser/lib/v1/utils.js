import convert from 'react-attr-converter';
/**
 * 
 * @param {Object} Attributes html attributes
 * @return {Object} React props
 */
export function attributesToProps(attributes = {}) {
    const result = {};
    for (const key in attributes) {
        result[convert(key)] = attributes[key]
    }
    return result;
}

/**
 * 
 * @param {Object} node 
 * @return {Boolean}
 */
export function isSvg(node) {
    if (node.name && node.name === "svg") {
      return true;
    }
    if (node.parent) {
      return isSvg(node.parent);
    }
    return false;
  }