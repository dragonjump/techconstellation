const d3 = require('d3')
const marked = require('marked')

const AutoComplete = require('../../util/autoComplete')
const InputSanitizer = require('../../util/inputSanitizer')
const { selectRadarQuadrant, removeScrollListener } = require('../components/quadrants')

function createChatWidget(container) {
  // Create floating button
  const floatingBtn = container.append('div')
    .style('position', 'fixed')
    .style('bottom', '20px')
    .style('right', '20px')
    .style('background-color', '#635080')
    .style('color', 'white')
    .style('width', '60px')
    .style('height', '60px')
    .style('border-radius', '50%')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center')
    .style('cursor', 'pointer')
    .style('box-shadow', '0 2px 10px rgba(0,0,0,0.2)')
    .style('z-index', '1000')
    .html('<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>')

  // Create chat overlay
  const overlay = container.append('div')
    .style('position', 'fixed')
    .style('top', '0')
    .style('left', '0')
    .style('width', '100%')
    .style('height', '100%')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('backdrop-filter', 'blur(5px)')
    .style('display', 'none')
    .style('z-index', '999')

  // Create chat widget
  const chatWidget = container.append('div')
    .style('position', 'fixed')
    .style('top', '50%')
    .style('left', '50%')
    .style('transform', 'translate(-50%, -50%)')
    .style('width', '50vw')
    .style('height', '80vh')
    .style('background-color', 'white')
    .style('border-radius', '12px')
    .style('box-shadow', '0 4px 20px rgba(0,0,0,0.2)')
    .style('display', 'none')
    .style('z-index', '1000')
    .style('flex-direction', 'column')

  // Chat header
  const chatHeader = chatWidget.append('div')
    .style('padding', '16px')
    .style('background-color', '#635080')
    .style('color', 'white')
    .style('border-radius', '12px 12px 0 0')
    .style('display', 'flex')
    .style('justify-content', 'space-between')
    .style('align-items', 'center')

  chatHeader.append('div').text('Stellar (ai assistant)')

  const closeBtn = chatHeader.append('div')
    .style('cursor', 'pointer')
    .text('×')
    .style('font-size', '24px')

  // Chat messages container
  const messagesContainer = chatWidget.append('div')
    .style('flex-grow', '1')
    .style('overflow-y', 'auto')
    .style('padding', '16px')

  // Chat input area
  const inputContainer = chatWidget.append('div')
    .style('padding', '16px')
    .style('border-top', '1px solid #eee')
    .style('display', 'flex')
    .style('gap', '8px')

  const chatInput = inputContainer.append('textarea')
    .attr('placeholder', 'Ask about the a company or  tech and its adoption strategy...')
    .style('flex-grow', '1')
    .style('padding', '8px 12px')
    .style('border', '1px solid #ddd')
    .style('border-radius', '12px')
    .style('outline', 'none')
    .style('resize', 'none')
    .style('height', '60px')
    .style('font-family', 'inherit')
    .style('line-height', '1.5')

  const sendBtn = inputContainer.append('button')
    .style('background-color', '#635080')
    .style('color', 'white')
    .style('border', 'none')
    .style('border-radius', '20px')
    .style('padding', '8px 16px')
    .style('cursor', 'pointer')
    .style('align-self', 'flex-end')
    .text('Send')

  // Toggle chat widget visibility
  function toggleChat() {
    const isVisible = chatWidget.style('display') !== 'none'
    chatWidget.style('display', isVisible ? 'none' : 'flex')
    overlay.style('display', isVisible ? 'none' : 'block')
    
    // Add welcome message when opening chat
    if (!isVisible) {
      addMessage("Hi, I am Stella (AI Architect Assistant ). I can help you understand the specific tech landscape and its technologies. How can I assist you today?", false)
    }
  }

  floatingBtn.on('click', toggleChat)
  closeBtn.on('click', toggleChat)
  overlay.on('click', toggleChat)

  // Add message to chat
  function addMessage(text, isUser = false) {
    const message = messagesContainer.append('div')
      .style('margin-bottom', '12px')
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('align-items', isUser ? 'flex-end' : 'flex-start')

    const bubble = message.append('div')
      .style('background-color', isUser ? '#635080' : '#f0f0f0')
      .style('color', isUser ? 'white' : 'black')
      .style('padding', '12px 16px')
      .style('border-radius', '12px')
      .style('max-width', '80%')
      .style('white-space', 'pre-wrap')
      .style('line-height', '1.5')

    // Add timestamp
    const timestamp = message.append('div')
      .style('font-size', '10px')
      .style('color', '#666')
      .style('margin-top', '4px')
      .style('padding', '0 4px')
      .text(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    if (isUser) {
      // User messages are always plain text
      bubble.text(text)
    } else {
      // Only try markdown parsing for assistant responses
      try {
        const formattedText = marked.parse(text)
        bubble.html(formattedText)
        
        // Style markdown elements
        bubble.selectAll('code')
          .style('background-color', 'rgba(0,0,0,0.05)')
          .style('padding', '2px 4px')
          .style('border-radius', '4px')
          .style('font-family', 'monospace')

        bubble.selectAll('pre')
          .style('background-color', 'rgba(0,0,0,0.05)')
          .style('padding', '8px')
          .style('border-radius', '8px')
          .style('overflow-x', 'auto')

        bubble.selectAll('a')
          .style('color', '#635080')
          .style('text-decoration', 'underline')

      } catch (e) {
        // Fallback to plain text if markdown parsing fails
        bubble.text(text)
      }
    }

    // Scroll to bottom
    messagesContainer.node().scrollTop = messagesContainer.node().scrollHeight
    return message
  }

  // Add loading animation
  function addLoadingAnimation() {
    const message = messagesContainer.append('div')
      .style('margin-bottom', '12px')
      .style('display', 'flex')
      .style('justify-content', 'flex-start')

    const bubble = message.append('div')
      .style('background-color', '#f0f0f0')
      .style('padding', '12px 16px')
      .style('border-radius', '12px')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '4px')

    // Add three bouncing dots
    for (let i = 0; i < 3; i++) {
      bubble.append('div')
        .style('width', '8px')
        .style('height', '8px')
        .style('background-color', '#635080')
        .style('border-radius', '50%')
        .style('animation', 'bounce 1.4s infinite')
        .style('animation-delay', `${i * 0.16}s`)
        .style('opacity', '0.6')
    }

    // Add keyframe animation style
    const style = document.createElement('style')
    style.textContent = `
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
      }
    `
    document.head.appendChild(style)

    return message
  }

  // Handle send message
  async function sendMessage() {
    const text = chatInput.property('value').trim()
    if (!text) return

    addMessage(text, true)
    chatInput.property('value', '')

    // Add loading animation
    const loadingMessage = addLoadingAnimation()

    try {
      const response = await fetch('https://n8n.jom.lol/webhook/radar-rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatInput: text })
      })

      const data = await response.json()
      // Remove loading animation
      loadingMessage.remove()
      addMessage(data[0].output)
    } catch (error) {
      // Remove loading animation
      loadingMessage.remove()
      addMessage('Sorry, there was an error processing your request.')
    }
  }

  sendBtn.on('click', sendMessage)
  chatInput.on('keypress', function (event) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  })
}

function renderLegend(radarHeader, quadrants) {
  const legendContainer = radarHeader.append('div').classed('legend-container', true)
  const inputSanitizer = new InputSanitizer()

  // Add filter header with icon
  const filterHeader = legendContainer.append('div')
    .classed('filter-header', true)
    .on('click', function() {
      const content = legendContainer.select('.filter-content');
      const isCollapsed = content.classed('collapsed');
      
      // Toggle collapsed state
      content.classed('collapsed', !isCollapsed);
      filterHeader.classed('collapsed', !isCollapsed);
    })

  filterHeader.append('span')
    .classed('filter-title', true)
    .text('Filter by')
    .style('font-size', '16px')

  // Add filter icon using SVG (using a chevron instead of filter icon for better UX)
  const filterIcon = filterHeader.append('div')
    .classed('filter-icon', true)
    .html('<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>')

  // Create a container for filter content
  const filterContent = legendContainer.append('div')
    .classed('filter-content', true)

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
    const itemDiv = filterContent.append('div')
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

    itemDiv.on('click', function () {
      setTimeout(() => {
        document.getElementById('subnav-item-all-quadrants').querySelector('.quadrant-subnav__list-item__button').click();
      }, 2300)
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
    debugger
    if (!ui || !ui.item || !ui.item.blip) return
    const blipId = ui.item ? ui.item.blip.id() : ui.blip.id()
    const quadrant = ui.item ? ui.item.quadrant : ui.quadrant
 

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

  // Create chat widget
  createChatWidget(d3.select('body'))
}

module.exports = {
  renderSearch,
}
