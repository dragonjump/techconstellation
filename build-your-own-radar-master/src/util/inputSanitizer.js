const sanitizeHtml = require('sanitize-html')
const _ = {
  forOwn: require('lodash/forOwn'),
}

const InputSanitizer = function () {
  var relaxedOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'br', 'p', 'u', 'img', 'small', 'span'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'style'],
      small: ['class', 'style'],
      span: ['class', 'style']
    },
  }

  var restrictedOptions = {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: function (text) {
      return text.replace(/&amp;/, '&')
    },
  }

  function trimWhiteSpaces(blip) {
    var processedBlip = {}
    _.forOwn(blip, function (value, key) {
      processedBlip[key.trim()] = value.trim()
    })
    return processedBlip
  }

  function generateLegendHTML() {
    return `
      <div class="legend-container" style="margin-bottom: 15px; font-size: 10px;">
        <div class="legend-item" >
          <span class="legend-wrapper">
            <img src="/images/star.svg" alt="Strategic Direction" style="width: 14px; height: 14px; vertical-align: middle;"/>
            <small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">STRATEGIC</small>
          </span>
        </div>
        <div class="legend-item" >
          <span class="legend-wrapper">
            <img src="/images/company1.svg" alt="Used by Company 1" style="width: 14px; height: 14px; vertical-align: middle;"/>
            <small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY1</small>
          </span>
        </div>
        <div class="legend-item" >
          <span class="legend-wrapper">
            <img src="/images/company2.svg" alt="Used by Company 2" style="width: 14px; height: 14px; vertical-align: middle;"/>
            <small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY2</small>
          </span>
        </div>
        <div class="legend-item" >
          <span class="legend-wrapper">
            <img src="/images/company3.svg" alt="Used by Company 3" style="width: 14px; height: 14px; vertical-align: middle;"/>
            <small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY3</small>
          </span>
        </div>
      </div>
    `;
  }

  var self = {}
  self.sanitize = function (rawBlip) {
    var blip = trimWhiteSpaces(rawBlip)
    console.log('blip', blip);

    // Add star image if it's a strategic direction
    if (blip.isStrategicDirection && blip.isStrategicDirection.toLowerCase() === 'true') {
      const starImage = '<br/><span class="legend-wrapper"><img src="/images/star.svg" alt="Strategic Direction" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">STRATEGIC</small></span>';
      blip.description = (blip.description || '') + ' ' + starImage;
    }

    // Add company1 indicator
    if (blip.isUsedByChildCompany1 && blip.isUsedByChildCompany1.toLowerCase() === 'true') {
      const company1Image = '<br/><span class="legend-wrapper"><img src="/images/company1.svg" alt="Used by Company 1" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY1</small></span>';
      blip.description = (blip.description || '') + ' ' + company1Image;
    }

    // Add company2 indicator
    if (blip.isUsedByChildCompany2 && blip.isUsedByChildCompany2.toLowerCase() === 'true') {
      const company2Image = '<br/><span class="legend-wrapper"><img src="/images/company2.svg" alt="Used by Company 2" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY2</small></span>';
      blip.description = (blip.description || '') + ' ' + company2Image;
    }

    // Add company3 indicator
    if (blip.isUsedByChildCompany3 && blip.isUsedByChildCompany3.toLowerCase() === 'true') {
      const company3Image = '<br/><span class="legend-wrapper"><img src="/images/company3.svg" alt="Used by Company 3" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY3</small></span>';
      blip.description = (blip.description || '') + ' ' + company3Image;
    }

    blip.description = sanitizeHtml(blip.description, relaxedOptions)
    blip.name = sanitizeHtml(blip.name, restrictedOptions)
    blip.isNew = sanitizeHtml(blip.isNew, restrictedOptions)
    blip.isStrategicDirection = sanitizeHtml(blip.isStrategicDirection, restrictedOptions)
    blip.isUsedByChildCompany1 = sanitizeHtml(blip.isUsedByChildCompany1, restrictedOptions)
    blip.isUsedByChildCompany2 = sanitizeHtml(blip.isUsedByChildCompany2, restrictedOptions)
    blip.isUsedByChildCompany3 = sanitizeHtml(blip.isUsedByChildCompany3, restrictedOptions)
    blip.status = sanitizeHtml(blip.status, restrictedOptions)
    blip.ring = sanitizeHtml(blip.ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions)

    return blip
  }

  self.sanitizeForProtectedSheet = function (rawBlip, header) {
    var blip = trimWhiteSpaces(rawBlip)

    console.log('header', header);
    const descriptionIndex = header.indexOf('description')
    const nameIndex = header.indexOf('name')
    const isNewIndex = header.indexOf('isNew')
    const isStrategicDirectionIndex = header.indexOf('isStrategicDirection')
    const isUsedByChildCompany1Index = header.indexOf('isUsedByChildCompany1')
    const isUsedByChildCompany2Index = header.indexOf('isUsedByChildCompany2')
    const isUsedByChildCompany3Index = header.indexOf('isUsedByChildCompany3')
    const statusIndex = header.indexOf('status')
    const quadrantIndex = header.indexOf('quadrant')
    const ringIndex = header.indexOf('ring')
    let description = '';
    try {
      if (descriptionIndex !== -1) {
        for (const key in blip) {
          if (!isNaN(key) && key >= descriptionIndex && blip.hasOwnProperty(key)) {
            description += blip[key] + ' ';
          }
          description = description.replace(/^"|"$|/g, ''); // Replace only the first and last quotes
        }
      }
    } catch (e) {
      console.log('error', e);
      description = descriptionIndex === -1 ? '' : blip[descriptionIndex]
    }

    const name = nameIndex === -1 ? '' : blip[nameIndex]
    const isStrategicDirection = isStrategicDirectionIndex === -1 ? '' : blip[isStrategicDirectionIndex]
    const isUsedByChildCompany1 = isUsedByChildCompany1Index === -1 ? '' : blip[isUsedByChildCompany1Index]
    const isUsedByChildCompany2 = isUsedByChildCompany2Index === -1 ? '' : blip[isUsedByChildCompany2Index]
    const isUsedByChildCompany3 = isUsedByChildCompany3Index === -1 ? '' : blip[isUsedByChildCompany3Index]
    const isNew = isNewIndex === -1 ? '' : blip[isNewIndex]
    const status = statusIndex === -1 ? '' : blip[statusIndex]
    const ring = ringIndex === -1 ? '' : blip[ringIndex]
    const quadrant = quadrantIndex === -1 ? '' : blip[quadrantIndex]

    // Add star image if it's a strategic direction
    if (isStrategicDirection && isStrategicDirection.toLowerCase() === 'true') {
      const starImage = '<br/><span class="legend-wrapper"><img src="/images/star.svg" alt="Strategic Direction" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">STRATEGIC</small></span>';
      description = description + ' ' + starImage;
    }

    // Add company1 indicator
    if (isUsedByChildCompany1 && isUsedByChildCompany1.toLowerCase() === 'true') {
      const company1Image = '<br/><span class="legend-wrapper"><img src="/images/company1.svg" alt="Used by Company 1" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY1</small></span>';
      description = description + ' ' + company1Image;
    }

    // Add company2 indicator
    if (isUsedByChildCompany2 && isUsedByChildCompany2.toLowerCase() === 'true') {
      const company2Image = '<br/><span class="legend-wrapper"><img src="/images/company2.svg" alt="Used by Company 2" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY2</small></span>';
      description = description + ' ' + company2Image;
    }

    // Add company3 indicator
    if (isUsedByChildCompany3 && isUsedByChildCompany3.toLowerCase() === 'true') {
      const company3Image = '<br/><span class="legend-wrapper"><img src="/images/company3.svg" alt="Used by Company 3" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"/><small class="legend-icon" style="font-size: 10px; margin-left: 3px; color: #666;">COMPANY3</small></span>';
      description = description + ' ' + company3Image;
    }

    blip.description = sanitizeHtml(description, relaxedOptions)
    blip.name = sanitizeHtml(name, restrictedOptions)
    blip.isNew = sanitizeHtml(isNew, restrictedOptions)
    blip.isStrategicDirection = sanitizeHtml(isStrategicDirection, restrictedOptions)
    blip.isUsedByChildCompany1 = sanitizeHtml(isUsedByChildCompany1, restrictedOptions)
    blip.isUsedByChildCompany2 = sanitizeHtml(isUsedByChildCompany2, restrictedOptions)
    blip.isUsedByChildCompany3 = sanitizeHtml(isUsedByChildCompany3, restrictedOptions)
    blip.status = sanitizeHtml(status, restrictedOptions)
    blip.ring = sanitizeHtml(ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(quadrant, restrictedOptions)

    return blip
  }

  self.generateLegend = function () {
    return sanitizeHtml(generateLegendHTML(), relaxedOptions);
  }

  return self
}

module.exports = InputSanitizer
