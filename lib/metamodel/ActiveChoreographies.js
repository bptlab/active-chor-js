export const metamodelExtension = {
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
      "name": "ActiveChoreography",
      "extends": [
        "bpmn:Choreography"
      ],
      "properties": [
        { // data input/output
          "name": "ioSpecification",
          "type": "bpmn:InputOutputSpecification",
          "xml": {
            "serialize": "property"
          }
        }
      ]
    },
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
        },
        { // data input/output
          "name": "ioSpecification",
          "type": "bpmn:InputOutputSpecification",
          "xml": {
            "serialize": "property"
          }
        },
        { // data input/output
          "name": "dataInputAssociations",
          "type": "bpmn:DataInputAssociation",
          "isMany": true
        },
        { // data input/output
          "name": "dataOutputAssociations",
          "type": "bpmn:DataOutputAssociation",
          "isMany": true
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
