const { graphConfig } = require('../graphing/config')
const IDEAL_BLIP_WIDTH = 22
const Blip = function (name, ring, isNew,isStrategicDirection, isUsedByChildCompany1,
  isUsedByChildCompany2,isUsedByChildCompany3,status, topic, description) {
  let self, blipText, isGroup, id, groupIdInGraph

  self = {}
  isGroup = false

  self.width = IDEAL_BLIP_WIDTH

  self.name = function () {
    return name
  }

  self.id = function () {
    return id || -1
  }

  self.groupBlipWidth = function () {
    return isNew ? graphConfig.newGroupBlipWidth : graphConfig.existingGroupBlipWidth
  }

  self.topic = function () {
    return topic || ''
  }

  self.description = function () {
    return description || ''
  }

  self.isNew = function () {
    if (status) {
      return status.toLowerCase() === 'new'
    }

    return isNew
  }

  self.isStrategicDirection = function () { 
    return (''+isStrategicDirection).toLowerCase() === 'true'
  }
  self.isUsedByChildCompany1 = function () { 
    return (''+isUsedByChildCompany1).toLowerCase() === 'true'
  }
  self.isUsedByChildCompany2 = function () { 
    return (''+isUsedByChildCompany2).toLowerCase() === 'true'
  }
  self.isUsedByChildCompany3 = function () { 
    return (''+isUsedByChildCompany3).toLowerCase() === 'true'
  }

  self.hasMovedIn = function () {
    return status.toLowerCase() === 'moved in'
  }

  self.hasMovedOut = function () {
    return status.toLowerCase() === 'moved out'
  }

  self.hasNoChange = function () {
    return status.toLowerCase() === 'no change'
  }

  self.status = function () {
    return status.toLowerCase() || ''
  }

  self.isGroup = function () {
    return isGroup
  }

  self.groupIdInGraph = function () {
    return groupIdInGraph || ''
  }

  self.setGroupIdInGraph = function (groupId) {
    groupIdInGraph = groupId
  }

  self.ring = function () {
    return ring
  }

  self.blipText = function () {
    return blipText || ''
  }

  self.setBlipText = function (newBlipText) {
    blipText = newBlipText
  }

  self.setId = function (newId) {
    id = newId
  }

  self.setIsGroup = function (isAGroupBlip) {
    isGroup = isAGroupBlip
  }

  return self
}

module.exports = Blip
