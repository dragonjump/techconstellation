const $ = require('jquery')
require('jquery-ui/ui/widgets/autocomplete')

const config = require('../config')
const featureToggles = config().featureToggles

$.widget('custom.radarcomplete', $.ui.autocomplete, {
  _create: function () {
    this._super()
    this.widget().menu('option', 'items', '> :not(.ui-autocomplete-quadrant)')
  },
  _renderMenu: function (ul, items) {
    let currentQuadrant = ''

    items.forEach((item) => {
      const quadrantName = item.quadrant.quadrant.name()
      if (quadrantName !== currentQuadrant) {
        ul.append(`<li class='ui-autocomplete-quadrant'>${quadrantName}</li>`)
        currentQuadrant = quadrantName
      }
      const li = this._renderItemData(ul, item)
      if (quadrantName) {
        li.attr('aria-label', `${quadrantName}:${item.value}`)
      }
    })
  },
})

const AutoComplete = (el, quadrants, cb) => {
  const blips = quadrants.reduce((acc, quadrant) => {
    return [...acc, ...quadrant.quadrant.blips().map((blip) => ({ blip, quadrant }))]
  }, [])

  // Add legend items to suggestions
  const legendItems = [
    { name: 'Strategic Direction', type: 'legend', filter: 'isStrategicDirection' },
    { name: 'Company1', type: 'legend', filter: 'isUsedByChildCompany1' },
    { name: 'Company2', type: 'legend', filter: 'isUsedByChildCompany2' },
    { name: 'Company3', type: 'legend', filter: 'isUsedByChildCompany3' }
  ]

  const handleSelect = (e, ui) => {
    if (ui.item.type === 'legend') {
      // Find the first blip that matches the filter
      const filterProperty = legendItems.find(item => item.name === ui.item.value).filter
      
      const matchingBlip = blips.find(({ blip }) => {
        const value = blip[filterProperty]
        return value === true || value === 'true' || value === 'TRUE'
      })
      
      if (matchingBlip) {
        // Call the original callback with the first matching blip
        cb(e, matchingBlip)
      }
    } else {
      // Handle normal blip selection
      cb(e, ui.item)
    }
  }

  if (featureToggles.UIRefresh2022) {
    $(el).autocomplete({
      appendTo: '.search-container',
      source: (request, response) => {
        const matches = blips.filter(({ blip }) => {
          const searchable = `${blip.name()} ${blip.description()}`.toLowerCase()
          return request.term.split(' ').every((term) => searchable.includes(term.toLowerCase()))
        })

        // Add matching legend items
        const matchingLegendItems = legendItems.filter(item => 
          item.name.toLowerCase().includes(request.term.toLowerCase())
        ).map(item => ({ value: item.name, type: 'legend' }))

        response([...matches.map((item) => ({ ...item, value: item.blip.name() })), ...matchingLegendItems])
      },
      select: handleSelect,
    })
  } else {
    $(el).radarcomplete({
      source: (request, response) => {
        const matches = blips.filter(({ blip }) => {
          const searchable = `${blip.name()} ${blip.description()}`.toLowerCase()
          return request.term.split(' ').every((term) => searchable.includes(term.toLowerCase()))
        })

        // Add matching legend items
        const matchingLegendItems = legendItems.filter(item => 
          item.name.toLowerCase().includes(request.term.toLowerCase())
        ).map(item => ({ value: item.name, type: 'legend' }))

        response([...matches.map((item) => ({ ...item, value: item.blip.name() })), ...matchingLegendItems])
      },
      select: handleSelect,
    })
  }
}

module.exports = AutoComplete
