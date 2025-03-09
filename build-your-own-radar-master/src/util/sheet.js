/* global gapi */
const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError')
const UnauthorizedError = require('../../src/exceptions/unauthorizedError')
const ExceptionMessages = require('./exceptionMessages')
const config = require('../config')

const Sheet = function (sheetReference) {
  var self = {}
  const featureToggles = config().featureToggles

  ;(function () {
    var matches = sheetReference.match('https:\\/\\/docs.google.com\\/spreadsheets\\/d\\/(.*?)($|\\/$|\\/.*|\\?.*)')
    self.id = matches !== null ? matches[1] : sheetReference
  })()

  self.validate = function (callback) {
    // For public sheets, we don't need API key
    return callback(null, false)
  }

  self.getSheet = async function () {
    try {
      // For public sheets, we'll use a direct CSV export URL
      const csvUrl = `https://docs.google.com/spreadsheets/d/${self.id}/export?format=csv`
      const response = await fetch(csvUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch sheet')
      }
      const csvText = await response.text()
      self.sheetResponse = {
        status: 200,
        result: {
          properties: {
            title: 'A universified view of the tech landscape'
          },
          sheets: [{
            properties: {
              title: 'Sheet1'
            }
          }]
        }
      }
      self.csvData = csvText
    } catch (error) {
      self.sheetResponse = error
    }
  }

  self.getData = function (range) {
    // Parse CSV data
    const rows = self.csvData.split('\n').map(row => row.split(',').map(cell => cell.trim()))
    return Promise.resolve({
      result: {
        values: rows
      }
    })
  }

  self.processSheetResponse = async function (sheetName, createBlips, handleError) {
    return self.sheetResponse.status !== 200
      ? handleError(self.sheetResponse)
      : processSheetData(sheetName, createBlips, handleError)
  }

  function processSheetData(sheetName, createBlips, handleError) {
    const sheetNames = self.sheetResponse.result.sheets.map((s) => s.properties.title)
    sheetName = !sheetName ? sheetNames[0] : sheetName
    self
      .getData(sheetName + '!A1:F')
      .then((r) => createBlips(self.sheetResponse.result.properties.title, r.result.values, sheetNames))
      .catch(handleError)
  }

  return self
}

module.exports = Sheet
