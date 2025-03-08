const sanitizeHtml = require('sanitize-html')
const _ = {
  forOwn: require('lodash/forOwn'),
}

const InputSanitizer = function () {
  var relaxedOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'br', 'p', 'u', 'img'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'style']
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

  var self = {}
  self.sanitize = function (rawBlip) {
    var blip = trimWhiteSpaces(rawBlip)
    console.log('blip', blip);
    
    // Add star image if it's a strategic direction
    if (blip.isStrategicDirection && blip.isStrategicDirection.toLowerCase() === 'true') {
      const starImage = '<img src="star.svg" alt="Strategic Direction" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 5px;">';
      blip.description = (blip.description || '') + ' ' + starImage;
    }
    
    blip.description = sanitizeHtml(blip.description, relaxedOptions)
    blip.name = sanitizeHtml(blip.name, restrictedOptions)
    blip.isNew = sanitizeHtml(blip.isNew, restrictedOptions)
    
    blip.isStrategicDirection = sanitizeHtml(blip.isStrategicDirection, restrictedOptions)
 
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
     const statusIndex = header.indexOf('status')
    const quadrantIndex = header.indexOf('quadrant')
    const ringIndex = header.indexOf('ring')
    let description = '';
    try {
      if(descriptionIndex !== -1){
      for (const key in blip) {
        if (!isNaN(key) && key>=descriptionIndex && blip.hasOwnProperty(key)) {
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
    const isNew = isNewIndex === -1 ? '' : blip[isNewIndex]
    const status = statusIndex === -1 ? '' : blip[statusIndex]
    const ring = ringIndex === -1 ? '' : blip[ringIndex]
    const quadrant = quadrantIndex === -1 ? '' : blip[quadrantIndex]

    // Add star image if it's a strategic direction
    if (isStrategicDirection && isStrategicDirection.toLowerCase() === 'true') {
      const starImage = '<br/><img src="/images/star.svg" alt="Strategic Direction" style="width: 16px; height: 16px; vertical-align: middle; margin-left: 5px;"/><SMALL>STRATEGIC</SMALL>';
      description = description + ' ' + starImage;
    }

    blip.description = sanitizeHtml(description, relaxedOptions)
    blip.name = sanitizeHtml(name, restrictedOptions)
    blip.isNew = sanitizeHtml(isNew, restrictedOptions)
    blip.isStrategicDirection = sanitizeHtml(isStrategicDirection, restrictedOptions)
    blip.status = sanitizeHtml(status, restrictedOptions)
    blip.ring = sanitizeHtml(ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(quadrant, restrictedOptions)

    return blip
  }

  return self
}

module.exports = InputSanitizer
