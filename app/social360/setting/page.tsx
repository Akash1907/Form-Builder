"use client";

import React, { Fragment, useState } from "react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";


const schema = {
  type: 'object',
  properties: {
    person: {
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        age: {
          description: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
        email: {
          description: 'Age in years',
          type: 'string',
         
        },
        birthDate: {
          type: "string",
          format: "date"
        },
        shippingAddress: {
          type: 'string'
        },

        "comments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "date": {
                "type": "string",
                "format": "date"
              },
              "message": {
                "type": "string",
                "maxLength": 5
              },
              "enum": {
                "type": "string",
                "enum": [
                  "foo",
                  "bar"
                ]
              }
            }
          }
        },
        "name": {
          "type": "string"
        },
        "dead": {
          "type": "boolean"
        },
        "kindOfDead": {
          "type": "string",
          "enum": [
            "Zombie",
            "Vampire",
            "Ghoul"
          ]
        },
        "vegetables": {
          "type": "boolean"
        },
        "kindOfVegetables": {
          "type": "string",
          "enum": [
            "All",
            "Some",
            "Only potatoes"
          ]
        },
        "radioGroup": {
          "type": "string",
          "enum": [
            "foo",
            "bar",
            "foobar"
          ]
        },
        "multiEnum": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "type": "string",
            "enum": [
              "foo",
              "bar",
              "foobar"
            ]
          }
        }
      },
      required: ['firstName', 'lastName'],
    }
  
  }
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Person',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/person/properties/firstName',
            },
            {
              type: 'Control',
              scope: '#/properties/person/properties/lastName',
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/person/properties/age',
            },
            {
              type: 'Control',
              label: 'Address',
              scope: '#/properties/person/properties/shippingAddress',
            }
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              label: 'email',
              scope: '#/properties/person/properties/email',
            },
            {
              type: "Control",
              label: "Birth Date",
              scope: "#/properties/person/properties/birthDate"
            }
          ],
        },

        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/person/properties/comments"
            }
          ]
        },
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "label": "Name",
              "scope": "#/properties/person/properties/name"
            },
            {
              "type": "Group",
              "elements": [
                {
                  "type": "Control",
                  "label": "Is Dead?",
                  "scope": "#/properties/person/properties/dead"
                },
                {
                  "type": "Control",
                  "label": "Kind of dead",
                  "scope": "#/properties/person/properties/kindOfDead",
                  "rule": {
                    "effect": "ENABLE",
                    "condition": {
                      "scope": "#/properties/person/properties/dead",
                      "schema": {
                        "const": true
                      }
                    }
                  }
                }
              ]
            },
            {
              "type": "Group",
              "elements": [
                {
                  "type": "Control",
                  "label": "Eats vegetables?",
                  "scope": "#/properties/person/properties/vegetables"
                },
                {
                  "type": "Control",
                  "label": "Kind of vegetables",
                  "scope": "#/properties/person/properties/kindOfVegetables",
                  "rule": {
                    "effect": "HIDE",
                    "condition": {
                      "scope": "#/properties/person/properties/vegetables",
                      "schema": {
                        "const": false
                      }
                    }
                  }
                }
              ]
            }
          ]
        },

        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/person/properties/radioGroup",
              "options": {
                "format": "radio"
              }
            }
          ]
        },
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/person/properties/multiEnum"
            }
          ]
        }




      ],
    }
  
  ],
};

const schema1 = {
  
    "definitions": {
      "address": {
        "type": "object",
        "title": "Address",
        "properties": {
          "street_address": {
            "type": "string"
          },
          "city": {
            "type": "string"
          },
          "state": {
            "type": "string"
          }
        },
        "required": [
          "street_address",
          "city",
          "state"
        ]
      },
      "user": {
        "type": "object",
        "title": "User",
        "properties": {
          "name": {
            "type": "string"
          },
          "mail": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "mail"
        ]
      }
    },
    "type": "object",
    "properties": {
      "addressOrUser": {
        "oneOf": [
          {
            "$ref": "#/definitions/address"
          },
          {
            "$ref": "#/definitions/user"
          }
        ]
      }
    }
  
}

const uischema1 = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "label": "Basic Information",
      "scope": "#/properties/addressOrUser"
    }
  ]
}


const schema2 = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "Users",
        "properties": {
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "age": {
            "type": "number",
            "minimum": 0
          }
        },
        "required": [
          "firstname"
        ]
      }
    }
  }
}

const uischema2 = {
  "type": "ListWithDetail",
  "scope": "#/properties/users",
  "options": {
    "detail": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/firstname",
              "label": "First Name"
            },
            {
              "type": "Control",
              "scope": "#/properties/lastname",
              "label": "Last Name"
            }
          ]
        },
        {
          "type": "Control",
          "scope": "#/properties/age",
          "label": "Age"
        },
        {
          "type": "Control",
          "scope": "#/properties/email",
          "label": "Email"
        }
      ]
    }
  }
}





const page = () => {

  const [data, setData] = useState({});
  const [datastore, setData1] = useState({});
  const [newdata, setData2] = useState({
    
      "users": [
        {
          "firstname": "Max",
          "lastname": "Mustermann",
          "age": 25,
          "email": "max@mustermann.com"
        },
        {
          "firstname": "John",
          "lastname": "Doe",
          "age": 35,
          "email": "john@doe.com"
        },
        {},
        {}
      ]
    
  });

  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <JsonForms
        schema={schema1}
        uischema={uischema1}
        data={datastore}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData1(data)}
      />
       <pre>{JSON.stringify(datastore, null, 2)}</pre>
       <JsonForms
        schema={schema2}
        uischema={uischema2}
        data={newdata}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData2(data)}
      />
       <pre>{JSON.stringify(newdata, null, 2)}</pre>
    </div>
    
  );
}

export default page
