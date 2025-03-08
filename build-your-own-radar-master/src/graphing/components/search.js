const d3 = require('d3')

const AutoComplete = require('../../util/autoComplete')
const { selectRadarQuadrant, removeScrollListener } = require('../components/quadrants')

function renderLegend(radarHeader) {
  const legendContainer = radarHeader.append('div').classed('legend-container', true)
  
  const legendItems = [
    { text: 'STRATEGIC', image: '/images/star.svg' },
    { text: 'COMPANY1', image: '/images/company1.svg' },
    { text: 'COMPANY2', image: '/images/company2.svg' },
    { text: 'COMPANY3', image: '/images/company3.svg' }
  ]

  legendItems.forEach(item => {
    const itemDiv = legendContainer.append('div')
      .classed('legend-item', true)
      .style('margin', '3px 0')
      .style('display', 'flex')
      .style('align-items', 'center')

    itemDiv.append('img')
      .attr('src', item.image)
      .attr('alt', item.text)
      .style('width', '14px')
      .style('height', '14px')
      .style('vertical-align', 'middle')

    itemDiv.append('small')
      .classed('legend-icon', true)
      .style('font-size', '10px')
      .style('margin-left', '3px')
      .style('color', '#666')
      .text(item.text)
  })
}

function renderSearch(radarHeader, quadrants) {
  // Add legend before search container
  renderLegend(radarHeader)

  const searchContainer = radarHeader.append('div').classed('search-container', true)

  searchContainer
    .append('input')
    .classed('search-container__input', true)
    .attr('placeholder', 'Search this radar')
    .attr('id', 'auto-complete')

  AutoComplete('#auto-complete', quadrants, function (e, ui) {
    if(!ui || !ui.item || !ui.item.blip) return
    const blipId = ui.item? ui.item.blip.id(): ui.blip.id()
    const quadrant = ui.item?ui.item.quadrant:ui.quadrant
    console.log('ui',ui.blip.name())

    selectRadarQuadrant(quadrant.order, quadrant.startAngle, quadrant.quadrant.name())
    const blipElement = d3.select(
      `.blip-list__item-container[data-blip-id="${blipId}"] .blip-list__item-container__name`,
    )

    removeScrollListener()
    blipElement.dispatch('search-result-click')

    setTimeout(() => {
      blipElement.node().scrollIntoView({
        behavior: 'smooth',
      })
    }, 1500)
  })
}

module.exports = {
  renderSearch,
}
