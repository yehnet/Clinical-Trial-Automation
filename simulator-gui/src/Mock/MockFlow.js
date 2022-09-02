export const flow_1 = {
    "type": "add workflow",
    "id": 2111561603920,
    "nodes": [
        {
            "id": 2846458731440,
            "title": "Questionnaire",
            "inputs": [
                {
                    "id": 2846458763344
                }
            ],
            "outputs": [
                {
                    "id": 2846458763392
                }
            ],
            "content": {
                "node_details": {
                    "title": "informed consent"
                },
                "questions": [
                   {
                        "text": "If you join, you will have injections, blood draws, saliva samples, and nasal swabs of your nose.",
                        "options": [
                            "Agree",
                            "No"
                        ],
                        "type": "one choice"
                    },
                    {
                        "text": "-The most common risks are symptoms are fever, muscle aches and headaches after getting the study vaccine. \n-There are other, less serious risks. We will tell you more about them later in this consent form. ",
                        "options": [
                            "Agree",
                            "No"
                        ],
                        "type": "one choice"
                    },
                    {
                        "text": "Full Name",
                        "type": "open"
                    }
                ],
                "questionnaire_number": 1
            },
            "op_code": 1
        },
        {
            "id": 2846471721648,
            "title": "Decision",
            "inputs": [
                {
                    "id": 2846471721936
                }
            ],
            "outputs": [
                {
                    "id": 2846471721984
                }
            ],
            "content": {
                "node_details": {
                    "title": "informed consent desc"
                },
                "condition": [
                    {
                        "title": "questionnaire condition 1",
                        "type": "questionnaire condition",
                        "questionnaireNumber": 1,
                        "questionNumber": 1,
                        "acceptedAnswers": [
                            0
                        ]
                    },
                    {
                        "title": "questionnaire condition 2",
                        "type": "questionnaire condition",
                        "questionnaireNumber": 1,
                        "questionNumber": 2,
                        "acceptedAnswers": [
                            0
                        ]
                    }
                ]
            },
            "op_code": 3
        },
        {
            "id": 2846471768576,
            "title": "Simple String",
            "inputs": [
                {
                    "id": 2846471768768
                }
            ],
            "outputs": [
                {
                    "id": 2846471768816
                }
            ],
            "content": {
                "node_details": {
                    "actors": [
                        "Participant"
                    ],
                    "title": "end trail"
                },
                "text": "You can't participate in this trail"
            },
            "op_code": 4
        },
        {
            "id": 2846471769152,
            "title": "Sub Workflow",
            "inputs": [
                {
                    "id": 2846471769392
                }
            ],
            "outputs": [
                {
                    "id": 2846471769440
                }
            ],
            "content": {
                "type": "complex",
                "flow": {
                    "id": 2453429745072,
                    "nodes": [
                        {
                            "id": 2846471768528,
                            "title": "Test",
                            "inputs": [
                                {
                                    "id": 2846471866784
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 2846471866832
                                }
                            ],
                            "content": {
                                "node_details": {
                                    "title": "antigen test",
                                    "actor in charge": "Nurse"
                                },
                                "tests": [
                                    {
                                        "name": "Antigen Test",
                                        "instructions": "Take samples from both nostrils using a swab.\nPut the swab in tube and squeeze. Close the tube and drop the liquid on the test cassette. \nWait 15 minutes for the results.",
                                        "staff": [
                                            "Nurse"
                                        ],
                                        "duration": "3"
                                    }
                                ]
                            },
                            "op_code": 2
                        },
                        {
                            "id": 2846471867120,
                            "title": "Decision",
                            "inputs": [
                                {
                                    "id": 2846471868272
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 2846471916560
                                }
                            ],
                            "content": {
                                "node_details": {
                                    "title": "test antigen desc"
                                },
                                "condition": [
                                    {
                                        "title": "test condition 1",
                                        "type": "test condition",
                                        "test": "Antigen Test",
                                        "satisfy": {
                                            "type": "one_choice",
                                            "value": "negative"
                                        }
                                    }
                                ]
                            },
                            "op_code": 3
                        },
                        {
                            "id": 2846471916512,
                            "title": "Test",
                            "inputs": [
                                {
                                    "id": 2846471768912
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 2846471866976
                                }
                            ],
                            "content": {
                                "node_details": {
                                    "title": "vaccine",
                                    "actor in charge": "Lab Technician"
                                },
                                "tests": [
                                    {
                                        "name": "Vaccine",
                                        "instructions": "inject 5 ml to arm",
                                        "staff": ["Nurse"],
                                        "duration": "2"
                                    }
                                ]
                            },
                            "op_code": 2
                        },
                        {
                            "id": 2846471916944,
                            "title": "Simple String",
                            "inputs": [
                                {
                                    "id": 2846471917184
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 2846471917232
                                }
                            ],
                            "content": {
                                "node_details": {
                                    "actors": [
                                        "Investigator",
                                        "Nurse"
                                    ],
                                    "title": "positive for covid"
                                },
                                "text": "Participant is positive for covid"
                            },
                            "op_code": 4
                        },
                        {
                            "id": 2846460297376,
                            "title": "Questionnaire",
                            "inputs": [
                                {
                                    "id": 2846460297616
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 2846460297664
                                }
                            ],
                            "content": {
                                "node_details": {
                                    "title": "question after vaccine"
                                },
                                "questions": [
                                    {
                                        "text": "Choose your symptoms",
                                        "options": [
                                            "Fever",
                                            "cough and shortness of breath",
                                            "muscle pain",
                                            "sore throat"
                                        ],
                                        "type": "multi"
                                    },
                                    {
                                        "text": "Any side effect not mentioned you experienced?",
                                        "type": "open"
                                    }
                                ],
                                "questionnaire_number": 2
                            },
                            "op_code": 1
                        }
                    ],
                    "edges": [
                        {
                            "id": 2846471916752,
                            "edge_type": 2,
                            "type": 0,
                            "start": 2846471866832,
                            "end": 2846471868272
                        },
                        {
                            "id": 2846471917328,
                            "edge_type": 2,
                            "type": 0,
                            "start": 2846471916560,
                            "end": 2846471917184
                        },
                        {
                            "id": 2846471866880,
                            "edge_type": 2,
                            "type": 1,
                            "content": {
                                "min": {
                                    "hours":0,
                                    "minutes":0,
                                    "seconds": 5
                                },
                                "max": {
                                    "hours":0,
                                    "minutes":0,
                                    "seconds": 5
                                 }
                            },
                            "start": 2846471916560,
                            "end": 2846471768912
                        },
                        {
                            "id": 2846460297904,
                            "edge_type": 2,
                            "start": 2846471866976,
                            "end": 2846460297616,
                            "type": 1,
                            "content": {
                                "min": {
                                    "hours":0,
                                    "minutes":0,
                                    "seconds": 10
                                },
                                "max": {
                                    "hours":0,
                                    "minutes":0,
                                    "seconds": 10
                                 }
                            }
                        }
                    ]
                }
            },
            "op_code": 6
        }
    ],
    "edges": [
        {
            "id": 2846471722032,
            "type": 0,
            "start": 2846458763392,
            "end": 2846471721936
        },
        {
            "id": 2846471769008,
            "type": 0,
            "start": 2846471721984,
            "end": 2846471768768
        },
        {
            "id": 2846460297952,
            "type": 1,
            "content": {
                "min": {
                    "hours":0,
                    "minutes":0,
                    "seconds": 5
                },
                "max": {
                    "hours":0,
                    "minutes":0,
                    "seconds": 5
                 }
            },
            "start": 2846471721984,
            "end": 2846471769392
        }
    ]
}
export const flow_2 ={
    "type": "add workflow",
        "id": 2111561603920,
        "nodes": [
            {
                "id": 1892803023680,
                "title": "Simple String",
                "inputs": [
                    {
                        "id": 1892803055520
                    }
                ],
                "outputs": [
                    {
                        "id": 1892803055568
                    }
                ],
                "content": {
                    "node_details": {
                        "actors": [
                            "Doctor"
                        ],
                        "title": "hello"
                    },
                    "text": "hello"
                },
                "op_code": 4
            },
            {
                "id": 1892803102752,
                "title": "New Start Node",
                "inputs": [],
                "outputs": [
                    {
                        "id": 1892803103088
                    }
                ],
                "op_code": 0
            },
            {
                "id": 1892803134944,
                "title": "Simple String",
                "inputs": [
                    {
                        "id": 1892803135232
                    }
                ],
                "outputs": [
                    {
                        "id": 1892803135280
                    }
                ],
                "content": {
                    "node_details": {
                        "actors": [
                            "Participant"
                        ],
                        "title": "world"
                    },
                    "text": "world"
                },
                "op_code": 4
            },
            {
                "id": 1892803136192,
                "title": "Simple String",
                "inputs": [
                    {
                        "id": 1892803136480
                    }
                ],
                "outputs": [
                    {
                        "id": 1892803136528
                    }
                ],
                "content": {
                    "node_details": {
                        "actors": [
                            "Participant"
                        ],
                        "title": "world2"
                    },
                    "text": "world2"
                },
                "op_code": 4
            },
            {
                "id": 1892817027280,
                "title": "New Finish Node",
                "inputs": [
                    {
                        "id": 1892817027520
                    }
                ],
                "outputs": [],
                "op_code": 6
            },
            {
                "id": 1892817030064,
                "title": "New Finish Node",
                "inputs": [
                    {
                        "id": 1892817030304
                    }
                ],
                "outputs": [],
                "op_code": 6
            }
        ],
        "edges": [
            {
                "id": 1892803102992,
                "type": 0,
                "start": 1892803103088,
                "end": 1892803055520
            },
            {
                "id": 1892803135472,
                "type": 0,
                "start": 1892803055568,
                "end": 1892803135232
            },
            {
                "id": 1892803136624,
                "type": 0,
                "start": 1892803055568,
                "end": 1892803136480
            },
            {
                "id": 1892817027760,
                "type": 0,
                "start": 1892803136528,
                "end": 1892817027520
            },
            {
                "id": 1892817028480,
                "type": 0,
                "start": 1892803135280,
                "end": 1892817030304
            }
        ]
    }