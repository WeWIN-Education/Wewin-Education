export const exams = [
  {
    "id": "starters-06",
    "number": "06",
    "title": "Learning with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/06/cover.jpg",
    "audio": [
      "tests/06/listening-1.mp3",
      "tests/06/listening-2.mp3",
      "tests/06/listening-3.mp3",
      "tests/06/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/06/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a book.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a bus.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a pencil.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are tomatoes.",
            "answer": "cross"
          },
          {
            "id": "r1-5",
            "prompt": "This is a bag.",
            "answer": "tick"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/06/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The girl in pink has a balloon.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The man in orange has books.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "Win is sleeping under a chair.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in purple is looking at a toy train.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "The boy in blue and white is running.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/06/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "dog"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "book"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "train"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "chair"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "bag"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/06/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "book"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "pencil"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "bag"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "chair"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "teacher"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/06/page-11.jpg",
          "tests/06/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What is on the bench?",
            "answer": "hat"
          },
          {
            "id": "r5-2",
            "prompt": "Where is the hat now?",
            "answer": "tree"
          },
          {
            "id": "r5-3",
            "prompt": "What colour is the girl's hair?",
            "answer": "brown"
          },
          {
            "id": "r5-4",
            "prompt": "Who is helping the girl?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-5",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/06/matching.jpg",
        "exampleName": "Ben",
        "personOrder": [
          "Ben",
          "Lucy",
          "Tom",
          "Kim",
          "Nick",
          "Ann",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 37,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 14,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 93,
            "y": 55,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 40,
            "y": 75,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 11,
            "y": 76,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 70,
            "y": 74,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 76,
            "y": 34,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Lucy": "p2",
          "Tom": "p3",
          "Kim": "p4",
          "Nick": "p5",
          "Ann": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Lucy",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Tom",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Kim",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Nick",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Ann",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/06/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "6"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Alice"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "10"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Dan"
          },
          {
            "id": "l2-5",
            "prompt": "Number of books",
            "answer": "8"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/06/page-04.jpg",
          "tests/06/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What colour is the pencil?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What toy does Nick want?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What is Ann eating?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "Where is the book?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 What is Ann eating?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/06/colour.jpg",
        "regionPositions": [
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "under-table",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "under-chair",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "in-box",
              "colour": "yellow"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "next-tree",
              "colour": "purple"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-07",
    "number": "07",
    "title": "The Beach with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/07/cover.jpg",
    "audio": [
      "tests/07/listening-1.mp3",
      "tests/07/listening-2.mp3",
      "tests/07/listening-3.mp3",
      "tests/07/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/07/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a boat.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a bird.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a hat.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are oranges.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a car.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/07/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The girl in pink has a blue balloon.",
            "answer": "no"
          },
          {
            "id": "r2-2",
            "prompt": "The boy in blue and white has a bag.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The girl with the yellow bag has a picture.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "Win is a small cat.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The man in orange has books.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/07/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "boat"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "fish"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "hat"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "water"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "orange"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/07/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "boat"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "fish"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "hat"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "water"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "ball"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/07/page-11.jpg",
          "tests/07/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What colour is the sea?",
            "answer": "blue"
          },
          {
            "id": "r5-2",
            "prompt": "What animal is eating?",
            "answer": "goat"
          },
          {
            "id": "r5-3",
            "prompt": "What fruit is in the basket?",
            "answer": "apples"
          },
          {
            "id": "r5-4",
            "prompt": "What fruit is the girl holding?",
            "answer": "apple"
          },
          {
            "id": "r5-5",
            "prompt": "Is Win sitting or standing?",
            "answer": "sitting"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/07/matching.jpg",
        "exampleName": "Tom",
        "personOrder": [
          "Tom",
          "Ben",
          "Lucy",
          "Sam",
          "Kim",
          "Ann",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 37,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 93,
            "y": 55,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 40,
            "y": 75,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 11,
            "y": 76,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 70,
            "y": 74,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 14,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 76,
            "y": 34,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Ben": "p2",
          "Lucy": "p3",
          "Sam": "p4",
          "Kim": "p5",
          "Ann": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Ben",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Lucy",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Sam",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Kim",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Ann",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/07/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "7"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Matt"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "11"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Sam"
          },
          {
            "id": "l2-5",
            "prompt": "Number of apples",
            "answer": "9"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/07/page-04.jpg",
          "tests/07/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Tom want to drink?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What toy is in the bag?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What is Lucy eating?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "Which animal does Kim see?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 What is Lucy eating?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/07/colour.jpg",
        "regionPositions": [
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "on-chair",
              "colour": "yellow"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "under-chair",
              "colour": "purple"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "next-tree",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "on-table",
              "colour": "pink"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-08",
    "number": "08",
    "title": "Win's Classroom",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/08/cover.jpg",
    "audio": [
      "tests/08/listening-1.mp3",
      "tests/08/listening-2.mp3",
      "tests/08/listening-3.mp3",
      "tests/08/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/08/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a pencil.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a clock.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a book.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are eggs.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a piano.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/08/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in green is drawing.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The man in orange has apples.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The girl in pink has a balloon.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "Win is under the table.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The boy in blue and white is looking in his bag.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/08/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "pencil"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "table"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "camera"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "tomato"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "kite"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/08/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "car"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "boat"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "ball"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "kite"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "train"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/08/page-11.jpg",
          "tests/08/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "How many children can you see?",
            "answer": "1",
            "accepted": [
              "1",
              "one"
            ]
          },
          {
            "id": "r5-2",
            "prompt": "Who is pointing at the water?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-3",
            "prompt": "Where are the girl and Win?",
            "answer": "classroom"
          },
          {
            "id": "r5-4",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          },
          {
            "id": "r5-5",
            "prompt": "What colour is her hair?",
            "answer": "brown"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/08/matching.jpg",
        "exampleName": "Ben",
        "personOrder": [
          "Ben",
          "Kim",
          "Nick",
          "Ann",
          "Lucy",
          "Tom",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 37,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 40,
            "y": 75,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 11,
            "y": 76,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 70,
            "y": 74,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 14,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 93,
            "y": 55,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 76,
            "y": 34,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Kim": "p2",
          "Nick": "p3",
          "Ann": "p4",
          "Lucy": "p5",
          "Tom": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Kim",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Nick",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Ann",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Lucy",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Tom",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/08/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "8"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Eva"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "13"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Alex"
          },
          {
            "id": "l2-5",
            "prompt": "Number of toy cars",
            "answer": "4"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/08/page-04.jpg",
          "tests/08/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What colour is the bag?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What does Nick want?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "Which toy does Ann like best?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is Lucy doing?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 Which toy does Ann like best?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/08/colour.jpg",
        "regionPositions": [
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "under-chair",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "in-box",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "next-tree",
              "colour": "purple"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "on-table",
              "colour": "pink"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "under-table",
              "colour": "red"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-09",
    "number": "09",
    "title": "Making Pictures with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/09/cover.jpg",
    "audio": [
      "tests/09/listening-1.mp3",
      "tests/09/listening-2.mp3",
      "tests/09/listening-3.mp3",
      "tests/09/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/09/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a horse.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a chair.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a camera.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are tomatoes.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a boat.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/09/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in green is painting.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The girl in purple is next to a toy horse.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The man in orange has a blue balloon.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in pink has a red balloon.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "The boy in blue and white is swimming.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/09/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "horse"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "chair"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "plane"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "guitar"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "orange"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/09/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "school"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "shop"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "house"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "bag"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "water"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/09/page-11.jpg",
          "tests/09/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "How many children are there?",
            "answer": "2",
            "accepted": [
              "2",
              "two"
            ]
          },
          {
            "id": "r5-2",
            "prompt": "What colour is the boy's jacket?",
            "answer": "blue"
          },
          {
            "id": "r5-3",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          },
          {
            "id": "r5-4",
            "prompt": "Who is standing next to the girl?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-5",
            "prompt": "What colour is the girl's hair?",
            "answer": "brown"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/09/matching.jpg",
        "exampleName": "Tom",
        "personOrder": [
          "Tom",
          "Sam",
          "Kim",
          "Ann",
          "Ben",
          "Lucy",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 37,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 11,
            "y": 76,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 70,
            "y": 74,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 14,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 93,
            "y": 55,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 40,
            "y": 75,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 76,
            "y": 34,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Sam": "p2",
          "Kim": "p3",
          "Ann": "p4",
          "Ben": "p5",
          "Lucy": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Sam",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Kim",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Ann",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Ben",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Lucy",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/09/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "9"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Mark"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "15"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Jill"
          },
          {
            "id": "l2-5",
            "prompt": "Number of pencils",
            "answer": "18"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/09/page-04.jpg",
          "tests/09/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What colour is the book?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What does Sam need?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "Where is the bag?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What animal is in the picture?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 Where is the bag?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/09/colour.jpg",
        "regionPositions": [
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "in-box",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "next-tree",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "on-table",
              "colour": "yellow"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "under-table",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-10",
    "number": "10",
    "title": "Win in the Garden",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/10/cover.jpg",
    "audio": [
      "tests/10/listening-1.mp3",
      "tests/10/listening-2.mp3",
      "tests/10/listening-3.mp3",
      "tests/10/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/10/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a tree.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "These are flowers.",
            "answer": "tick"
          },
          {
            "id": "r1-3",
            "prompt": "This is an apple.",
            "answer": "cross"
          },
          {
            "id": "r1-4",
            "prompt": "This is a duck.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a banana.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/10/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in green is pointing at a picture.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The girl in pink has a green balloon.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The man in orange has books.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The boy in blue and white is in the sea.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "Win is by a big cake.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/10/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "tree"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "apple"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "carrot"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "water"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "guitar"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/10/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "flowers"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "tree"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "bird"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "water"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "ball"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/10/page-11.jpg",
          "tests/10/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What food are they making?",
            "answer": "cake"
          },
          {
            "id": "r5-2",
            "prompt": "What animal is next to Win?",
            "answer": "dog"
          },
          {
            "id": "r5-3",
            "prompt": "What colour is the girl's dress?",
            "answer": "pink"
          },
          {
            "id": "r5-4",
            "prompt": "Who is next to the girl?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-5",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/10/matching.jpg",
        "exampleName": "Ben",
        "personOrder": [
          "Ben",
          "Ann",
          "Lucy",
          "Tom",
          "Kim",
          "Nick",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 37,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 70,
            "y": 74,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 14,
            "y": 37,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 93,
            "y": 55,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 40,
            "y": 75,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 11,
            "y": 76,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 76,
            "y": 34,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Ann": "p2",
          "Lucy": "p3",
          "Tom": "p4",
          "Kim": "p5",
          "Nick": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Ann",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Lucy",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Tom",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Kim",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Nick",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/10/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "10"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Hugo"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "14"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Eva"
          },
          {
            "id": "l2-5",
            "prompt": "Number of small cakes",
            "answer": "16"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/10/page-04.jpg",
          "tests/10/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What fruit does Ann want?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What does Tom have?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "Which animal is behind Lucy?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is Sam doing?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 Which animal is behind Lucy?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/10/colour.jpg",
        "regionPositions": [
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "next-tree",
              "colour": "orange"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "on-table",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "under-table",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "on-chair",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "under-chair",
              "colour": "yellow"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-11",
    "number": "11",
    "title": "Reading with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/11/cover.jpg",
    "audio": [
      "tests/11/listening-1.mp3",
      "tests/11/listening-2.mp3",
      "tests/11/listening-3.mp3",
      "tests/11/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/11/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a computer.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a phone.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a pencil.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are oranges.",
            "answer": "cross"
          },
          {
            "id": "r1-5",
            "prompt": "This is a chair.",
            "answer": "tick"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/11/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in red is putting a book on the bookcase.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The girl in yellow is running.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The boy with glasses has a computer.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in purple is drawing.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "The girl in pink is sleeping.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/11/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "book"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "pencil"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "computer"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "horse"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "chair"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/11/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "school"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "teacher"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "bag"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "bed"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "table"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/11/page-11.jpg",
          "tests/11/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What animal is in her book?",
            "answer": "horse",
            "accepted": [
              "horse",
              "donkey"
            ]
          },
          {
            "id": "r5-2",
            "prompt": "Who is sitting in the green chair?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-3",
            "prompt": "What is the girl holding?",
            "answer": "book"
          },
          {
            "id": "r5-4",
            "prompt": "How many children are at the table?",
            "answer": "2",
            "accepted": [
              "2",
              "two"
            ]
          },
          {
            "id": "r5-5",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/11/matching.jpg",
        "exampleName": "Tom",
        "personOrder": [
          "Tom",
          "Ann",
          "Ben",
          "Lucy",
          "Sam",
          "Kim",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 15,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 48,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 83,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 18,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 57,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 85,
            "y": 71,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 51,
            "y": 53,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Ann": "p2",
          "Ben": "p3",
          "Lucy": "p4",
          "Sam": "p5",
          "Kim": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Ann",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Ben",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Lucy",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Sam",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Kim",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/11/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "8"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Grace"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "17"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Matt"
          },
          {
            "id": "l2-5",
            "prompt": "Number of red books",
            "answer": "12"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/11/page-04.jpg",
          "tests/11/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "Where is the book?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What does Ben want to drink?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "Which animal is in the picture?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is Sam doing?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 Which animal is in the picture?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/11/colour.jpg",
        "regionPositions": [
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "on-table",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "under-table",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "under-chair",
              "colour": "purple"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-12",
    "number": "12",
    "title": "Win and the Train",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/12/cover.jpg",
    "audio": [
      "tests/12/listening-1.mp3",
      "tests/12/listening-2.mp3",
      "tests/12/listening-3.mp3",
      "tests/12/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/12/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a train.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a boat.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a bag.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are eggs.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a camera.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/12/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in red is looking at the clock.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The girl in yellow has a red bag.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The boy in blue has a camera.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in purple is swimming.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "Win is in front of a train.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/12/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "train"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "clock"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "camera"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "apple"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "table"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/12/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "bag"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "book"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "water"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "bird"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "camera"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/12/page-11.jpg",
          "tests/12/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What toy is the boy holding?",
            "answer": "teddy"
          },
          {
            "id": "r5-2",
            "prompt": "Where is the teddy now?",
            "answer": "chair"
          },
          {
            "id": "r5-3",
            "prompt": "What colour is the chair?",
            "answer": "blue"
          },
          {
            "id": "r5-4",
            "prompt": "Who has the teddy now?",
            "answer": "boy"
          },
          {
            "id": "r5-5",
            "prompt": "Is the boy happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/12/matching.jpg",
        "exampleName": "Ben",
        "personOrder": [
          "Ben",
          "Tom",
          "Kim",
          "Nick",
          "Ann",
          "Lucy",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 15,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 83,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 18,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 57,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 85,
            "y": 71,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 48,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 51,
            "y": 53,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Tom": "p2",
          "Kim": "p3",
          "Nick": "p4",
          "Ann": "p5",
          "Lucy": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Tom",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Kim",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Nick",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Ann",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Lucy",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/12/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "9"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Alice"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "19"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Hugo"
          },
          {
            "id": "l2-5",
            "prompt": "Number of bags",
            "answer": "6"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/12/page-04.jpg",
          "tests/12/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What is Ann eating?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What is the boy looking at?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What colour is the bag?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What does Ben want to drink?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 What colour is the bag?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/12/colour.jpg",
        "regionPositions": [
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "under-table",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "on-chair",
              "colour": "pink"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "under-chair",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "in-box",
              "colour": "orange"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "next-tree",
              "colour": "yellow"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-13",
    "number": "13",
    "title": "Swimming with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/13/cover.jpg",
    "audio": [
      "tests/13/listening-1.mp3",
      "tests/13/listening-2.mp3",
      "tests/13/listening-3.mp3",
      "tests/13/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/13/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a bag.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a sock.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "This is a hat.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "These are apples.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a phone.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/13/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy in blue is looking at his shoes.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The girl in purple is putting things in a bag.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The girl in pink has a cake.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "Win is under a bed.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The boy with glasses is looking at the wall.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/13/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "shoe"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "water"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "banana"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "camera"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "potato"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/13/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "fish"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "boat"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "ball"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "bag"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "hat"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/13/page-11.jpg",
          "tests/13/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What is the girl putting on?",
            "answer": "shoes"
          },
          {
            "id": "r5-2",
            "prompt": "What is the girl looking in?",
            "answer": "bag"
          },
          {
            "id": "r5-3",
            "prompt": "What colour is the book in the bag?",
            "answer": "blue"
          },
          {
            "id": "r5-4",
            "prompt": "What colour is the girl's shirt?",
            "answer": "yellow"
          },
          {
            "id": "r5-5",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/13/matching.jpg",
        "exampleName": "Tom",
        "personOrder": [
          "Tom",
          "Lucy",
          "Sam",
          "Kim",
          "Ann",
          "Ben",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 15,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 18,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 57,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 85,
            "y": 71,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 48,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 83,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 51,
            "y": 53,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Lucy": "p2",
          "Sam": "p3",
          "Kim": "p4",
          "Ann": "p5",
          "Ben": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Lucy",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Sam",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Kim",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Ann",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Ben",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/13/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "7"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Grace"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "18"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Alex"
          },
          {
            "id": "l2-5",
            "prompt": "Number of hats",
            "answer": "5"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/13/page-04.jpg",
          "tests/13/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What is Ben drinking?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What is Tom doing?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What colour is the hat?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "Where are the shoes?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 What colour is the hat?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/13/colour.jpg",
        "regionPositions": [
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          },
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "on-chair",
              "colour": "purple"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "under-chair",
              "colour": "yellow"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "in-box",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "next-tree",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "on-table",
              "colour": "orange"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-14",
    "number": "14",
    "title": "A Day in the Park",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/14/cover.jpg",
    "audio": [
      "tests/14/listening-1.mp3",
      "tests/14/listening-2.mp3",
      "tests/14/listening-3.mp3",
      "tests/14/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/14/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a tree.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a fish.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "These are apples.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "This is a camera.",
            "answer": "tick"
          },
          {
            "id": "r1-5",
            "prompt": "This is a cat.",
            "answer": "cross"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/14/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy with glasses has a camera.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The boy in blue is carrying food.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The girl in pink is sleeping.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in yellow is looking at a picture.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "Win is sitting on a chair.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/14/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "bird"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "monkey"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "orange"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "carrot"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "guitar"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/14/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "tree"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "bird"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "ball"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "water"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "apple"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/14/page-11.jpg",
          "tests/14/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What colour is the boy's shirt?",
            "answer": "green"
          },
          {
            "id": "r5-2",
            "prompt": "What is Win picking up?",
            "answer": "paper"
          },
          {
            "id": "r5-3",
            "prompt": "Who is sitting behind the boy?",
            "answer": "Dad"
          },
          {
            "id": "r5-4",
            "prompt": "What colour is the big bag?",
            "answer": "black"
          },
          {
            "id": "r5-5",
            "prompt": "Is the boy happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/14/matching.jpg",
        "exampleName": "Ben",
        "personOrder": [
          "Ben",
          "Nick",
          "Ann",
          "Lucy",
          "Tom",
          "Kim",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 15,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 57,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 85,
            "y": 71,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 48,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 83,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 18,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 51,
            "y": 53,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Nick": "p2",
          "Ann": "p3",
          "Lucy": "p4",
          "Tom": "p5",
          "Kim": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Nick",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Ann",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Lucy",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Tom",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Kim",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/14/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "10"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Alice"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "20"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Pat"
          },
          {
            "id": "l2-5",
            "prompt": "Number of apples",
            "answer": "16"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/14/page-04.jpg",
          "tests/14/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What is Ann looking at?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What does Nick take pictures of?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "Where is the hat?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What colour is the bag?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 Where is the hat?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/14/colour.jpg",
        "regionPositions": [
          {
            "id": "under-chair",
            "x": 81.3,
            "y": 63.0
          },
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "under-chair",
              "colour": "pink"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "in-box",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "next-tree",
              "colour": "orange"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "on-table",
              "colour": "yellow"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "under-table",
              "colour": "green"
            },
            "colour": true
          }
        ]
      }
    ]
  },
  {
    "id": "starters-15",
    "number": "15",
    "title": "Music with Win",
    "level": "Pre A1 Starters",
    "audioMode": "parts",
    "audioVersion": "20261023-starters-new",
    "version": "2026-10-23-starters-06-15-v1",
    "cover": "tests/15/cover.jpg",
    "audio": [
      "tests/15/listening-1.mp3",
      "tests/15/listening-2.mp3",
      "tests/15/listening-3.mp3",
      "tests/15/listening-4.mp3"
    ],
    "reading": [
      {
        "id": "r1",
        "title": "Look and read",
        "instruction": "Look and read. Put a tick or a cross in the box. There are two examples.",
        "image": "tests/15/page-07.jpg",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "True"
          ],
          [
            "cross",
            "✗",
            "False"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a guitar.",
            "answer": "tick"
          },
          {
            "id": "r1-2",
            "prompt": "This is a camera.",
            "answer": "cross"
          },
          {
            "id": "r1-3",
            "prompt": "These are flowers.",
            "answer": "tick"
          },
          {
            "id": "r1-4",
            "prompt": "This is a shoe.",
            "answer": "cross"
          },
          {
            "id": "r1-5",
            "prompt": "This is a ball.",
            "answer": "tick"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look and read. Write yes or no.",
        "image": "tests/15/page-08.jpg",
        "type": "binary",
        "options": [
          [
            "yes",
            "Yes",
            "Yes"
          ],
          [
            "no",
            "No",
            "No"
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The girl in purple is playing the guitar.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The boy with glasses is swimming.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The boy in blue has a box.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The girl in yellow has her hands up.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "Win is sleeping on the floor.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Write the words",
        "instruction": "Look at the pictures and letters. Write the words.",
        "image": "tests/15/page-09.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "Question 1",
            "answer": "guitar"
          },
          {
            "id": "r3-2",
            "prompt": "Question 2",
            "answer": "flowers"
          },
          {
            "id": "r3-3",
            "prompt": "Question 3",
            "answer": "chicken"
          },
          {
            "id": "r3-4",
            "prompt": "Question 4",
            "answer": "pencil"
          },
          {
            "id": "r3-5",
            "prompt": "Question 5",
            "answer": "camera"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Complete the text",
        "instruction": "Read the text. Choose a word from the box and write it next to each number.",
        "image": "tests/15/page-10.jpg",
        "type": "text",
        "questions": [
          {
            "id": "r4-1",
            "prompt": "Question 1",
            "answer": "guitar"
          },
          {
            "id": "r4-2",
            "prompt": "Question 2",
            "answer": "boy"
          },
          {
            "id": "r4-3",
            "prompt": "Question 3",
            "answer": "school"
          },
          {
            "id": "r4-4",
            "prompt": "Question 4",
            "answer": "camera"
          },
          {
            "id": "r4-5",
            "prompt": "Question 5",
            "answer": "water"
          }
        ]
      },
      {
        "id": "r5",
        "title": "Read the story",
        "instruction": "Look at the pictures and read the questions. Write one-word answers.",
        "images": [
          "tests/15/page-11.jpg",
          "tests/15/page-12.jpg"
        ],
        "type": "text",
        "questions": [
          {
            "id": "r5-1",
            "prompt": "What is the girl playing?",
            "answer": "guitar"
          },
          {
            "id": "r5-2",
            "prompt": "What is the girl doing now?",
            "answer": "singing"
          },
          {
            "id": "r5-3",
            "prompt": "What colour is the girl's hair?",
            "answer": "brown"
          },
          {
            "id": "r5-4",
            "prompt": "Who is next to the girl?",
            "answer": "Win",
            "accepted": [
              "Win",
              "robot"
            ]
          },
          {
            "id": "r5-5",
            "prompt": "Is the girl happy or sad?",
            "answer": "happy"
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "type": "match",
        "title": "Listen & match",
        "instruction": "Listen and draw lines. There is one example.",
        "image": "tests/15/matching.jpg",
        "exampleName": "Tom",
        "personOrder": [
          "Tom",
          "Kim",
          "Ann",
          "Ben",
          "Lucy",
          "Sam",
          "Alex"
        ],
        "personTargets": [
          {
            "x": 15,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 85,
            "y": 71,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 48,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 83,
            "y": 31,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 18,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 57,
            "y": 73,
            "rx": 8,
            "ry": 16
          },
          {
            "x": 51,
            "y": 53,
            "rx": 8,
            "ry": 16
          }
        ],
        "matchKey": {
          "Kim": "p2",
          "Ann": "p3",
          "Ben": "p4",
          "Lucy": "p5",
          "Sam": "p6"
        },
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Kim",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Ann",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Ben",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Lucy",
            "answer": "p5"
          },
          {
            "id": "l1-5",
            "prompt": "Sam",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "image": "tests/15/page-03.jpg",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is the child?",
            "answer": "9"
          },
          {
            "id": "l2-2",
            "prompt": "Name of a friend",
            "answer": "Grace"
          },
          {
            "id": "l2-3",
            "prompt": "A DAY WITH FRIENDS",
            "answer": "19"
          },
          {
            "id": "l2-4",
            "prompt": "Name of a toy robot",
            "answer": "Hugo"
          },
          {
            "id": "l2-5",
            "prompt": "Number of guitars",
            "answer": "3"
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and tick the box. There is one example.",
        "images": [
          "tests/15/page-04.jpg",
          "tests/15/page-05.jpg"
        ],
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What colour is Tom's shirt?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "What is Ben carrying?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What does Ann want to drink?",
            "answer": "B",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "Where is the book?",
            "answer": "A",
            "choices": [
              "A",
              "B",
              "C"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "3 What does Ann want to drink?",
            "answer": "C",
            "choices": [
              "A",
              "B",
              "C"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "type": "colour",
        "title": "Listen & colour",
        "instruction": "Listen and colour. There is one example.",
        "image": "tests/15/colour.jpg",
        "regionPositions": [
          {
            "id": "in-box",
            "x": 78.5,
            "y": 86.6
          },
          {
            "id": "next-tree",
            "x": 18.1,
            "y": 55.6
          },
          {
            "id": "on-table",
            "x": 51.3,
            "y": 21.6
          },
          {
            "id": "under-table",
            "x": 51.3,
            "y": 52.4
          },
          {
            "id": "on-chair",
            "x": 81.3,
            "y": 34.9
          }
        ],
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Question 1",
            "answer": {
              "target": "in-box",
              "colour": "green"
            },
            "colour": true
          },
          {
            "id": "l4-2",
            "prompt": "Question 2",
            "answer": {
              "target": "next-tree",
              "colour": "blue"
            },
            "colour": true
          },
          {
            "id": "l4-3",
            "prompt": "Question 3",
            "answer": {
              "target": "on-table",
              "colour": "purple"
            },
            "colour": true
          },
          {
            "id": "l4-4",
            "prompt": "Question 4",
            "answer": {
              "target": "under-table",
              "colour": "red"
            },
            "colour": true
          },
          {
            "id": "l4-5",
            "prompt": "Question 5",
            "answer": {
              "target": "on-chair",
              "colour": "yellow"
            },
            "colour": true
          }
        ]
      }
    ]
  }
];
export const artwork = {
  "apple": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      26,
      16,
      284,
      304
    ]
  },
  "pear": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      346,
      18,
      596,
      302
    ]
  },
  "banana": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      636,
      21,
      924,
      299
    ]
  },
  "fish": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      939,
      28,
      1249,
      296
    ]
  },
  "dog": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      16,
      308,
      302,
      613
    ]
  },
  "cat": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      339,
      311,
      582,
      612
    ]
  },
  "bike": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      610,
      341,
      927,
      590
    ]
  },
  "bus": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      937,
      377,
      1252,
      576
    ]
  },
  "car": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      10,
      666,
      331,
      888
    ]
  },
  "kite": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      346,
      618,
      576,
      924
    ]
  },
  "book": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      624,
      643,
      931,
      907
    ]
  },
  "ball": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      968,
      638,
      1224,
      899
    ]
  },
  "shirt": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      16,
      928,
      313,
      1210
    ]
  },
  "bag": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      327,
      913,
      592,
      1214
    ]
  },
  "hat": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      609,
      954,
      951,
      1187
    ]
  },
  "pencil": {
    "file": "shared/listening-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      964,
      916,
      1242,
      1214
    ]
  },
  "cake": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      21,
      23,
      312,
      297
    ]
  },
  "egg": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      372,
      29,
      586,
      297
    ]
  },
  "clock": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      647,
      33,
      935,
      299
    ]
  },
  "milk": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      992,
      28,
      1201,
      300
    ]
  },
  "plane": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      19,
      319,
      330,
      590
    ]
  },
  "bird": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      351,
      316,
      607,
      596
    ]
  },
  "duck": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      651,
      322,
      934,
      599
    ]
  },
  "frog": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      965,
      328,
      1230,
      596
    ]
  },
  "orange": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      20,
      616,
      313,
      900
    ]
  },
  "shoe": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      326,
      638,
      618,
      881
    ]
  },
  "bed": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      635,
      632,
      936,
      900
    ]
  },
  "house": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      951,
      615,
      1240,
      894
    ]
  },
  "water": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      48,
      904,
      274,
      1204
    ]
  },
  "mouse": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      327,
      900,
      617,
      1204
    ]
  },
  "box": {
    "file": "shared/additional-objects-v2.png",
    "width": 1254,
    "height": 1254,
    "clip": [
      627,
      910,
      941,
      1204
    ]
  },
  "ruler": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      0,
      0,
      362,
      362
    ]
  },
  "flower": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      362,
      0,
      724,
      362
    ]
  },
  "sock": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      724,
      0,
      1086,
      362
    ]
  },
  "tree": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      1086,
      0,
      1448,
      362
    ]
  },
  "chair": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      0,
      362,
      362,
      724
    ]
  },
  "boat": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      362,
      362,
      724,
      724
    ]
  },
  "eyes": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      724,
      362,
      1086,
      724
    ]
  },
  "legs": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      1086,
      362,
      1448,
      724
    ]
  },
  "tail": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      0,
      724,
      362,
      1086
    ]
  },
  "sun": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      362,
      724,
      724,
      1086
    ]
  },
  "cat-profile": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      724,
      724,
      1086,
      1086
    ]
  },
  "table": {
    "file": "shared/vocabulary-objects-v2.png",
    "width": 1448,
    "height": 1086,
    "clip": [
      1086,
      724,
      1448,
      1086
    ]
  }
};
