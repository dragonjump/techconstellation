const d3 = require('d3')

const AutoComplete = require('../../util/autoComplete')
const InputSanitizer = require('../../util/inputSanitizer')
const { selectRadarQuadrant, removeScrollListener } = require('../components/quadrants')

function renderLegend(radarHeader, quadrants) {
  const legendContainer = radarHeader.append('div').classed('legend-container', true)
  const inputSanitizer = new InputSanitizer()
  
  // Convert quadrants to blips format expected by filter function
  const blips = quadrants.reduce((acc, quadrant) => {
    return [...acc, ...quadrant.quadrant.blips().map((blip) => ({ blip, quadrant }))]
  }, [])

  const legendItems = [
    { text: 'STRATEGIC', image: '/images/star.svg', filter: 'isStrategicDirection' },
    { text: 'COMPANY1', image: '/images/company1.svg', filter: 'isUsedByChildCompany1' },
    { text: 'COMPANY2', image: '/images/company2.svg', filter: 'isUsedByChildCompany2' },
    { text: 'COMPANY3', image: '/images/company3.svg', filter: 'isUsedByChildCompany3' }
  ]

  let activeFilter = null;

  legendItems.forEach(item => {
    const itemDiv = legendContainer.append('div')
      .classed('legend-item', true)
      .style('margin-top', '12px')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('cursor', 'pointer')

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

    itemDiv.on('click', function() {
      // If clicking the same filter again, reset
      if (activeFilter === item.filter) {
        inputSanitizer.resetBlipsDisplay()
        activeFilter = null;
        // Remove active state from all items
        legendContainer.selectAll('.legend-item').style('opacity', 1);
      } else {
        // Use the common filter function
        const matchingBlips = inputSanitizer.filterAndDisplayBlips(blips, item.filter)
        
        if (matchingBlips.length > 0) {
          activeFilter = item.filter;
          // Set active state
          legendContainer.selectAll('.legend-item').style('opacity', 0.5);
          itemDiv.style('opacity', 1);
        } else {
          // If no matches found, reset display
          inputSanitizer.resetBlipsDisplay()
          activeFilter = null;
          legendContainer.selectAll('.legend-item').style('opacity', 1);
        }
      }
    })
  })
}

function renderSearch(radarHeader, quadrants) {
  // Add legend before search container
  renderLegend(radarHeader, quadrants)

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
