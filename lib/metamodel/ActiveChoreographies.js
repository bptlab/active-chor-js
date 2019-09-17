const metamodelExtension = {
  "name": "ActiveChoreographies",
  "uri": "http://bpt-lab.org/ac",
  "prefix": "ac",
  "xml": {
    "tagAlias": "lowerCase"
  },
  "enumerations": [],
  "associations": [],
  "types": [
    {
      "name": "ActiveChoreographyActivity",
      "extends": [
        "bpmn:ChoreographyActivity"
      ],
      "properties": [
        { // boundary events
          "name": "boundaryEventRefs",
          "type": "bpmn:BoundaryEvent",
          "isMany": true,
          "isReference": true
        }
      ]
    },
    {
      "name": "ActiveBoundaryEvent",
      "extends": [
        "bpmn:BoundaryEvent"
      ],
      "properties": [
        { // boundary events
          "name": "attachedChoreographyRef",
          "type": "bpmn:ChoreographyActivity",
          "isAttr": true,
          "isReference": true
        }
      ]
    }
  ]
};

export default metamodelExtension;