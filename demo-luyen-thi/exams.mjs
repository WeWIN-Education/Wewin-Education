export const exams = [
  {
    "id": "starters-01",
    "number": "01",
    "title": "A day in the park",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "parts",
    "audio": [
      "tests/01/listening-1.mp3",
      "tests/01/listening-2.mp3",
      "tests/01/listening-3.mp3",
      "tests/01/listening-4.mp3"
    ],
    "cover": "shared/reading-speaking-scene-v2.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a pencil.",
            "answer": "tick",
            "art": "pencil"
          },
          {
            "id": "r1-2",
            "prompt": "This is a shirt.",
            "answer": "cross",
            "art": "chair"
          },
          {
            "id": "r1-3",
            "prompt": "This is a bus.",
            "answer": "tick",
            "art": "bus"
          },
          {
            "id": "r1-4",
            "prompt": "This is a fish.",
            "answer": "tick",
            "art": "fish"
          },
          {
            "id": "r1-5",
            "prompt": "This is a flower.",
            "answer": "cross",
            "art": "boat"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/reading-speaking-scene-v2.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The girl has an orange shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "There are two pieces of fruit on the table.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "fish",
          "pencil",
          "sun",
          "eyes",
          "chair",
          "ball",
          "legs",
          "tail"
        ],
        "passageTitle": "Cats",
        "example": "A cat is an animal. It has four legs.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "It has two ___ to see with.",
            "answer": "eyes"
          },
          {
            "id": "r3-2",
            "prompt": "It has a long ___ behind its body.",
            "answer": "tail"
          },
          {
            "id": "r3-3",
            "prompt": "A cat can sit on a ___ in a living room.",
            "answer": "chair"
          },
          {
            "id": "r3-4",
            "prompt": "It can play with a small round ___.",
            "answer": "ball"
          },
          {
            "id": "r3-5",
            "prompt": "Some cats like eating ___.",
            "answer": "fish"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-three-panels-v2.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-three-panels-v2.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-three-panels-v2.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "ball",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The ball is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the ball now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/01/matching.png",
        "exampleName": "Lucy",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Grace",
            "answer": "p5"
          },
          {
            "id": "l1-2",
            "prompt": "Sam",
            "answer": "p6"
          },
          {
            "id": "l1-3",
            "prompt": "Anna",
            "answer": "p3"
          },
          {
            "id": "l1-4",
            "prompt": "Ben",
            "answer": "p4"
          },
          {
            "id": "l1-5",
            "prompt": "Tom",
            "answer": "p2"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Lucy.",
        "type": "text",
        "exampleName": "Lucy",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Lucy?",
            "answer": "6",
            "numeric": true,
            "accepted": [
              "six"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the cat?",
            "answer": "Ben"
          },
          {
            "id": "l2-3",
            "prompt": "How many books are in the bag?",
            "answer": "4",
            "numeric": true,
            "accepted": [
              "four"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the teacher's name?",
            "answer": "Grace"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "10",
            "numeric": true,
            "accepted": [
              "ten"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Lucy want?",
            "answer": "A",
            "choiceArts": [
              "apple",
              "pear",
              "banana"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Tom like?",
            "answer": "C",
            "choiceArts": [
              "fish",
              "dog",
              "cat"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Anna see?",
            "answer": "B",
            "choiceArts": [
              "bike",
              "bus",
              "car"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "A",
            "choiceArts": [
              "kite",
              "book",
              "ball"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "C",
            "choiceArts": [
              "shirt",
              "bag",
              "hat"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng đỏ trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-scene-v2.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "orange"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "yellow"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "green"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "purple"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-02",
    "number": "02",
    "title": "Our classroom",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "parts",
    "audio": [
      "tests/02/listening-1.mp3",
      "tests/02/listening-2.mp3",
      "tests/02/listening-3.mp3",
      "tests/02/listening-4.mp3"
    ],
    "cover": "shared/scene-02.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a pear.",
            "answer": "cross",
            "art": "apple"
          },
          {
            "id": "r1-2",
            "prompt": "This is an egg.",
            "answer": "tick",
            "art": "egg"
          },
          {
            "id": "r1-3",
            "prompt": "This is a clock.",
            "answer": "tick",
            "art": "clock"
          },
          {
            "id": "r1-4",
            "prompt": "This is milk.",
            "answer": "cross",
            "art": "sock"
          },
          {
            "id": "r1-5",
            "prompt": "This is a book.",
            "answer": "tick",
            "art": "book"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-02.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "There are three pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The girl has a red shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "pencil",
          "fish",
          "clock",
          "chair",
          "ruler",
          "shoe",
          "book",
          "bag"
        ],
        "passageTitle": "At school",
        "example": "I take my bag to school.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "I read a ___ in my English lesson.",
            "answer": "book"
          },
          {
            "id": "r3-2",
            "prompt": "I write with a ___.",
            "answer": "pencil"
          },
          {
            "id": "r3-3",
            "prompt": "I use a ___ to draw a straight line.",
            "answer": "ruler"
          },
          {
            "id": "r3-4",
            "prompt": "I sit on a ___ next to my friend.",
            "answer": "chair"
          },
          {
            "id": "r3-5",
            "prompt": "I look at the ___ to see the time.",
            "answer": "clock"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-02.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-02.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-02.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "kite",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The kite is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the kite now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/02/matching.png",
        "exampleName": "May",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Jill",
            "answer": "p5"
          },
          {
            "id": "l1-2",
            "prompt": "Eva",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Bill",
            "answer": "p2"
          },
          {
            "id": "l1-4",
            "prompt": "Pat",
            "answer": "p6"
          },
          {
            "id": "l1-5",
            "prompt": "Dan",
            "answer": "p4"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là May.",
        "type": "text",
        "exampleName": "May",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is May?",
            "answer": "7",
            "numeric": true,
            "accepted": [
              "seven"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the dog?",
            "answer": "Dan"
          },
          {
            "id": "l2-3",
            "prompt": "How many pencils are in the bag?",
            "answer": "5",
            "numeric": true,
            "accepted": [
              "five"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the friend's name?",
            "answer": "Jill"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "11",
            "numeric": true,
            "accepted": [
              "eleven"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does May want?",
            "answer": "B",
            "choiceArts": [
              "cat",
              "dog",
              "fish"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Bill like?",
            "answer": "A",
            "choiceArts": [
              "bus",
              "car",
              "bike"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Eva see?",
            "answer": "C",
            "choiceArts": [
              "kite",
              "ball",
              "book"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "B",
            "choiceArts": [
              "shirt",
              "hat",
              "bag"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "A",
            "choiceArts": [
              "plane",
              "boat",
              "car"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng vàng trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-yellow.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "purple"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "red"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "green"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "orange"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-03",
    "number": "03",
    "title": "A birthday afternoon",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/03/listening-full.mp3",
      "tests/03/listening-full.mp3",
      "tests/03/listening-full.mp3",
      "tests/03/listening-full.mp3"
    ],
    "cover": "shared/scene-03.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a dog.",
            "answer": "tick",
            "art": "dog"
          },
          {
            "id": "r1-2",
            "prompt": "This is a shirt.",
            "answer": "tick",
            "art": "shirt"
          },
          {
            "id": "r1-3",
            "prompt": "This is an apple.",
            "answer": "cross",
            "art": "ruler"
          },
          {
            "id": "r1-4",
            "prompt": "This is a bag.",
            "answer": "tick",
            "art": "bag"
          },
          {
            "id": "r1-5",
            "prompt": "This is a pear.",
            "answer": "tick",
            "art": "pear"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-03.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-2",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "There are four pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The girl has an orange shirt.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "ball",
          "car",
          "cake",
          "egg",
          "kite",
          "bike",
          "book",
          "bed"
        ],
        "passageTitle": "A birthday",
        "example": "Today is my birthday. I have a cake.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "My new ___ has two wheels. I can ride it.",
            "answer": "bike"
          },
          {
            "id": "r3-2",
            "prompt": "My ___ has four wheels. It is a toy.",
            "answer": "car"
          },
          {
            "id": "r3-3",
            "prompt": "My ___ is round. I can throw it.",
            "answer": "ball"
          },
          {
            "id": "r3-4",
            "prompt": "My ___ has pages. I can read it.",
            "answer": "book"
          },
          {
            "id": "r3-5",
            "prompt": "My ___ can fly on a long string.",
            "answer": "kite"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-03.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-03.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-03.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "book",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The book is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the book now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/03/matching.png",
        "exampleName": "Alice",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Sue",
            "answer": "p5"
          },
          {
            "id": "l1-2",
            "prompt": "Alex",
            "answer": "p2"
          },
          {
            "id": "l1-3",
            "prompt": "Mark",
            "answer": "p4"
          },
          {
            "id": "l1-4",
            "prompt": "Kim",
            "answer": "p3"
          },
          {
            "id": "l1-5",
            "prompt": "Tony",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Alice.",
        "type": "text",
        "exampleName": "Alice",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Alice?",
            "answer": "8",
            "numeric": true,
            "accepted": [
              "eight"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the mouse?",
            "answer": "Mark"
          },
          {
            "id": "l2-3",
            "prompt": "How many balls are in the bag?",
            "answer": "6",
            "numeric": true,
            "accepted": [
              "six"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the sister's name?",
            "answer": "Sue"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "12",
            "numeric": true,
            "accepted": [
              "twelve"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Alice want?",
            "answer": "C",
            "choiceArts": [
              "car",
              "bus",
              "bike"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Alex like?",
            "answer": "B",
            "choiceArts": [
              "kite",
              "ball",
              "book"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Kim see?",
            "answer": "A",
            "choiceArts": [
              "shirt",
              "hat",
              "bag"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "C",
            "choiceArts": [
              "car",
              "boat",
              "plane"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "B",
            "choiceArts": [
              "duck",
              "bird",
              "frog"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng vàng trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-yellow.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "purple"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "green"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "blue"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "red"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-04",
    "number": "04",
    "title": "At the toy shop",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/04/listening-full.mp3",
      "tests/04/listening-full.mp3",
      "tests/04/listening-full.mp3",
      "tests/04/listening-full.mp3"
    ],
    "cover": "shared/scene-04.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is an apple.",
            "answer": "tick",
            "art": "apple"
          },
          {
            "id": "r1-2",
            "prompt": "This is a bus.",
            "answer": "cross",
            "art": "duck"
          },
          {
            "id": "r1-3",
            "prompt": "This is a plane.",
            "answer": "tick",
            "art": "plane"
          },
          {
            "id": "r1-4",
            "prompt": "This is a boat.",
            "answer": "tick",
            "art": "boat"
          },
          {
            "id": "r1-5",
            "prompt": "This is a fish.",
            "answer": "cross",
            "art": "banana"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-04.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-2",
            "prompt": "There are two pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "The girl has a yellow shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "house",
          "clock",
          "frog",
          "milk",
          "hat",
          "bag",
          "bed",
          "plane"
        ],
        "passageTitle": "My bedroom",
        "example": "My bedroom is in our house.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "I sleep in my ___ at night.",
            "answer": "bed"
          },
          {
            "id": "r3-2",
            "prompt": "My ___ has two hands and shows the time.",
            "answer": "clock"
          },
          {
            "id": "r3-3",
            "prompt": "My school things are in my ___.",
            "answer": "bag"
          },
          {
            "id": "r3-4",
            "prompt": "I wear my ___ on my head.",
            "answer": "hat"
          },
          {
            "id": "r3-5",
            "prompt": "My toy ___ has wings.",
            "answer": "plane"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-04.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-04.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-04.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "bag",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The bag is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the bag now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/04/matching.png",
        "exampleName": "Mary",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Lucy",
            "answer": "p5"
          },
          {
            "id": "l1-2",
            "prompt": "Jack",
            "answer": "p2"
          },
          {
            "id": "l1-3",
            "prompt": "Ann",
            "answer": "p3"
          },
          {
            "id": "l1-4",
            "prompt": "Ben",
            "answer": "p6"
          },
          {
            "id": "l1-5",
            "prompt": "Tom",
            "answer": "p4"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Mary.",
        "type": "text",
        "exampleName": "Mary",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Mary?",
            "answer": "9",
            "numeric": true,
            "accepted": [
              "nine"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the cat?",
            "answer": "Tom"
          },
          {
            "id": "l2-3",
            "prompt": "How many cars are in the bag?",
            "answer": "7",
            "numeric": true,
            "accepted": [
              "seven"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the brother's name?",
            "answer": "Ben"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "13",
            "numeric": true,
            "accepted": [
              "thirteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Mary want?",
            "answer": "A",
            "choiceArts": [
              "kite",
              "book",
              "ball"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Jack like?",
            "answer": "C",
            "choiceArts": [
              "bag",
              "shirt",
              "hat"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Ann see?",
            "answer": "B",
            "choiceArts": [
              "plane",
              "boat",
              "car"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "A",
            "choiceArts": [
              "bird",
              "frog",
              "duck"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "C",
            "choiceArts": [
              "egg",
              "cake",
              "sock"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng xanh lá trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-green.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "yellow"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "blue"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "red"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "purple"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-05",
    "number": "05",
    "title": "A family picnic",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/05/listening-full.mp3",
      "tests/05/listening-full.mp3",
      "tests/05/listening-full.mp3",
      "tests/05/listening-full.mp3"
    ],
    "cover": "shared/scene-05.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a pear.",
            "answer": "cross",
            "art": "apple"
          },
          {
            "id": "r1-2",
            "prompt": "This is a boat.",
            "answer": "tick",
            "art": "boat"
          },
          {
            "id": "r1-3",
            "prompt": "This is a frog.",
            "answer": "tick",
            "art": "frog"
          },
          {
            "id": "r1-4",
            "prompt": "This is a frog.",
            "answer": "cross",
            "art": "dog"
          },
          {
            "id": "r1-5",
            "prompt": "This is a clock.",
            "answer": "tick",
            "art": "clock"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-05.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The girl has a yellow shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "There are three pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "banana",
          "ruler",
          "water",
          "tree",
          "ball",
          "bird",
          "orange",
          "shoe"
        ],
        "passageTitle": "A picnic",
        "example": "We have a picnic under a tree.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "I eat a yellow ___. It is long.",
            "answer": "banana"
          },
          {
            "id": "r3-2",
            "prompt": "My brother has an ___. It is round and orange.",
            "answer": "orange"
          },
          {
            "id": "r3-3",
            "prompt": "We drink ___ from our cups.",
            "answer": "water"
          },
          {
            "id": "r3-4",
            "prompt": "A ___ with wings is singing above us.",
            "answer": "bird"
          },
          {
            "id": "r3-5",
            "prompt": "We play with a round ___ after lunch.",
            "answer": "ball"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-05.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-05.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-05.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "hat",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The hat is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the hat now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/05/matching.png",
        "exampleName": "Grace",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Dan",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Nick",
            "answer": "p6"
          },
          {
            "id": "l1-3",
            "prompt": "Eva",
            "answer": "p5"
          },
          {
            "id": "l1-4",
            "prompt": "May",
            "answer": "p3"
          },
          {
            "id": "l1-5",
            "prompt": "Hugo",
            "answer": "p4"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Grace.",
        "type": "text",
        "exampleName": "Grace",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Grace?",
            "answer": "10",
            "numeric": true,
            "accepted": [
              "ten"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the dog?",
            "answer": "Hugo"
          },
          {
            "id": "l2-3",
            "prompt": "How many apples are in the bag?",
            "answer": "8",
            "numeric": true,
            "accepted": [
              "eight"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the friend's name?",
            "answer": "Eva"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "14",
            "numeric": true,
            "accepted": [
              "fourteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Grace want?",
            "answer": "B",
            "choiceArts": [
              "hat",
              "bag",
              "shirt"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Dan like?",
            "answer": "A",
            "choiceArts": [
              "car",
              "plane",
              "boat"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can May see?",
            "answer": "C",
            "choiceArts": [
              "duck",
              "frog",
              "bird"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "B",
            "choiceArts": [
              "cake",
              "egg",
              "sock"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "A",
            "choiceArts": [
              "ruler",
              "pencil",
              "book"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng xanh lá trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-green.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "purple"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "orange"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "yellow"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "blue"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "red"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-06",
    "number": "06",
    "title": "At the beach",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/06/listening-full.mp3",
      "tests/06/listening-full.mp3",
      "tests/06/listening-full.mp3",
      "tests/06/listening-full.mp3"
    ],
    "cover": "shared/scene-06.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a fish.",
            "answer": "tick",
            "art": "fish"
          },
          {
            "id": "r1-2",
            "prompt": "This is a cake.",
            "answer": "tick",
            "art": "cake"
          },
          {
            "id": "r1-3",
            "prompt": "This is a bag.",
            "answer": "cross",
            "art": "book"
          },
          {
            "id": "r1-4",
            "prompt": "This is a shirt.",
            "answer": "tick",
            "art": "shirt"
          },
          {
            "id": "r1-5",
            "prompt": "This is a chair.",
            "answer": "tick",
            "art": "chair"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-06.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "The girl has a yellow shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "There are four pieces of fruit on the table.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "kite",
          "clock",
          "sun",
          "hat",
          "bed",
          "bag",
          "boat",
          "fish"
        ],
        "passageTitle": "At the beach",
        "example": "The sun is hot at the beach.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "I wear a ___ on my head.",
            "answer": "hat"
          },
          {
            "id": "r3-2",
            "prompt": "There is a ___ with a sail on the water.",
            "answer": "boat"
          },
          {
            "id": "r3-3",
            "prompt": "A small ___ is swimming under the water.",
            "answer": "fish"
          },
          {
            "id": "r3-4",
            "prompt": "My ___ flies on its long string.",
            "answer": "kite"
          },
          {
            "id": "r3-5",
            "prompt": "I put my clothes in a ___.",
            "answer": "bag"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-06.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-06.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-06.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "apple",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "blue",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The apple is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the apple now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/06/matching.png",
        "exampleName": "Jill",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Sam",
            "answer": "p2"
          },
          {
            "id": "l1-2",
            "prompt": "Alice",
            "answer": "p5"
          },
          {
            "id": "l1-3",
            "prompt": "Anna",
            "answer": "p3"
          },
          {
            "id": "l1-4",
            "prompt": "Mark",
            "answer": "p6"
          },
          {
            "id": "l1-5",
            "prompt": "Pat",
            "answer": "p4"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Jill.",
        "type": "text",
        "exampleName": "Jill",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Jill?",
            "answer": "6",
            "numeric": true,
            "accepted": [
              "six"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the cat?",
            "answer": "Pat"
          },
          {
            "id": "l2-3",
            "prompt": "How many shells are in the bag?",
            "answer": "9",
            "numeric": true,
            "accepted": [
              "nine"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the sister's name?",
            "answer": "Alice"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "15",
            "numeric": true,
            "accepted": [
              "fifteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Jill want?",
            "answer": "C",
            "choiceArts": [
              "plane",
              "car",
              "boat"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Sam like?",
            "answer": "B",
            "choiceArts": [
              "duck",
              "frog",
              "bird"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Anna see?",
            "answer": "A",
            "choiceArts": [
              "egg",
              "cake",
              "sock"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "C",
            "choiceArts": [
              "ruler",
              "book",
              "pencil"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "B",
            "choiceArts": [
              "ball",
              "hat",
              "flower"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng cam trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-orange.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "red"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "green"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "yellow"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "blue"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "purple"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-07",
    "number": "07",
    "title": "In the garden",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/07/listening-full.mp3",
      "tests/07/listening-full.mp3",
      "tests/07/listening-full.mp3",
      "tests/07/listening-full.mp3"
    ],
    "cover": "shared/scene-07.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a shoe.",
            "answer": "tick",
            "art": "shoe"
          },
          {
            "id": "r1-2",
            "prompt": "This is a bike.",
            "answer": "cross",
            "art": "bus"
          },
          {
            "id": "r1-3",
            "prompt": "This is a sock.",
            "answer": "tick",
            "art": "sock"
          },
          {
            "id": "r1-4",
            "prompt": "This is a frog.",
            "answer": "tick",
            "art": "frog"
          },
          {
            "id": "r1-5",
            "prompt": "This is a bird.",
            "answer": "cross",
            "art": "fish"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-07.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "There are two pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-4",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-5",
            "prompt": "The girl has a red shirt.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "cat",
          "plane",
          "house",
          "flower",
          "duck",
          "frog",
          "ruler",
          "tree"
        ],
        "passageTitle": "A garden",
        "example": "There is a garden behind my house.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "A tall ___ has many green leaves.",
            "answer": "tree"
          },
          {
            "id": "r3-2",
            "prompt": "A pink ___ is growing next to it.",
            "answer": "flower"
          },
          {
            "id": "r3-3",
            "prompt": "A small ___ is green and can jump.",
            "answer": "frog"
          },
          {
            "id": "r3-4",
            "prompt": "A yellow ___ is swimming in the water.",
            "answer": "duck"
          },
          {
            "id": "r3-5",
            "prompt": "Our ___ says meow.",
            "answer": "cat"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-07.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-07.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-07.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "shoe",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "pink",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The shoe is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the shoe now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/07/matching.png",
        "exampleName": "Sue",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Matt",
            "answer": "p4"
          },
          {
            "id": "l1-2",
            "prompt": "Kim",
            "answer": "p5"
          },
          {
            "id": "l1-3",
            "prompt": "Ben",
            "answer": "p2"
          },
          {
            "id": "l1-4",
            "prompt": "Alex",
            "answer": "p6"
          },
          {
            "id": "l1-5",
            "prompt": "Lucy",
            "answer": "p3"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Sue.",
        "type": "text",
        "exampleName": "Sue",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Sue?",
            "answer": "7",
            "numeric": true,
            "accepted": [
              "seven"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the mouse?",
            "answer": "Matt"
          },
          {
            "id": "l2-3",
            "prompt": "How many flowers are in the bag?",
            "answer": "10",
            "numeric": true,
            "accepted": [
              "ten"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the teacher's name?",
            "answer": "Kim"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "16",
            "numeric": true,
            "accepted": [
              "sixteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Sue want?",
            "answer": "A",
            "choiceArts": [
              "duck",
              "frog",
              "bird"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Ben like?",
            "answer": "C",
            "choiceArts": [
              "egg",
              "cake",
              "sock"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Lucy see?",
            "answer": "B",
            "choiceArts": [
              "book",
              "pencil",
              "ruler"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "A",
            "choiceArts": [
              "ball",
              "flower",
              "hat"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "C",
            "choiceArts": [
              "banana",
              "apple",
              "pear"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng xanh dương trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-blue.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "orange"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "purple"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "red"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "green"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "yellow"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-08",
    "number": "08",
    "title": "After school",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/08/listening-full.mp3",
      "tests/08/listening-full.mp3",
      "tests/08/listening-full.mp3",
      "tests/08/listening-full.mp3"
    ],
    "cover": "shared/scene-08.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a car.",
            "answer": "cross",
            "art": "bird"
          },
          {
            "id": "r1-2",
            "prompt": "This is a bike.",
            "answer": "tick",
            "art": "bike"
          },
          {
            "id": "r1-3",
            "prompt": "This is a table.",
            "answer": "tick",
            "art": "table"
          },
          {
            "id": "r1-4",
            "prompt": "This is an orange.",
            "answer": "cross",
            "art": "hat"
          },
          {
            "id": "r1-5",
            "prompt": "This is a shoe.",
            "answer": "tick",
            "art": "shoe"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-08.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-2",
            "prompt": "There are three pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-3",
            "prompt": "The girl has a blue shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "book",
          "hat",
          "fish",
          "bus",
          "kite",
          "milk",
          "clock",
          "egg"
        ],
        "passageTitle": "Going to school",
        "example": "My book is in my bag.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "I put my ___ on my head.",
            "answer": "hat"
          },
          {
            "id": "r3-2",
            "prompt": "I look at the ___ to see the time.",
            "answer": "clock"
          },
          {
            "id": "r3-3",
            "prompt": "I drink some ___. It is white.",
            "answer": "milk"
          },
          {
            "id": "r3-4",
            "prompt": "I eat an ___ from a chicken.",
            "answer": "egg"
          },
          {
            "id": "r3-5",
            "prompt": "I go to school on a big yellow ___.",
            "answer": "bus"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-08.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-08.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-08.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "pencil",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "purple",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The pencil is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the pencil now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/08/matching.png",
        "exampleName": "Eva",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Jack",
            "answer": "p4"
          },
          {
            "id": "l1-2",
            "prompt": "May",
            "answer": "p5"
          },
          {
            "id": "l1-3",
            "prompt": "Grace",
            "answer": "p3"
          },
          {
            "id": "l1-4",
            "prompt": "Tony",
            "answer": "p2"
          },
          {
            "id": "l1-5",
            "prompt": "Hugo",
            "answer": "p6"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Eva.",
        "type": "text",
        "exampleName": "Eva",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Eva?",
            "answer": "8",
            "numeric": true,
            "accepted": [
              "eight"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the dog?",
            "answer": "Jack"
          },
          {
            "id": "l2-3",
            "prompt": "How many rulers are in the bag?",
            "answer": "11",
            "numeric": true,
            "accepted": [
              "eleven"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the brother's name?",
            "answer": "Hugo"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "17",
            "numeric": true,
            "accepted": [
              "seventeen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Eva want?",
            "answer": "B",
            "choiceArts": [
              "sock",
              "cake",
              "egg"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Tony like?",
            "answer": "A",
            "choiceArts": [
              "pencil",
              "book",
              "ruler"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Grace see?",
            "answer": "C",
            "choiceArts": [
              "flower",
              "ball",
              "hat"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "B",
            "choiceArts": [
              "banana",
              "pear",
              "apple"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "A",
            "choiceArts": [
              "fish",
              "cat",
              "dog"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng đỏ trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-scene-v2.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "purple"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "yellow"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "green"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "orange"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-09",
    "number": "09",
    "title": "A visit to the farm",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/09/listening-full.mp3",
      "tests/09/listening-full.mp3",
      "tests/09/listening-full.mp3",
      "tests/09/listening-full.mp3"
    ],
    "cover": "shared/scene-09.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is a banana.",
            "answer": "tick",
            "art": "banana"
          },
          {
            "id": "r1-2",
            "prompt": "This is a ruler.",
            "answer": "tick",
            "art": "ruler"
          },
          {
            "id": "r1-3",
            "prompt": "This is a shoe.",
            "answer": "cross",
            "art": "bed"
          },
          {
            "id": "r1-4",
            "prompt": "This is a flower.",
            "answer": "tick",
            "art": "flower"
          },
          {
            "id": "r1-5",
            "prompt": "This is a bike.",
            "answer": "tick",
            "art": "bike"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-09.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "The girl has a purple shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-2",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "There are four pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "mouse",
          "fish",
          "car",
          "dog",
          "bird",
          "shirt",
          "cat",
          "frog"
        ],
        "passageTitle": "Animals",
        "example": "I can see a bird in the tree.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "A ___ says woof.",
            "answer": "dog"
          },
          {
            "id": "r3-2",
            "prompt": "A ___ says meow.",
            "answer": "cat"
          },
          {
            "id": "r3-3",
            "prompt": "A ___ swims and has no legs.",
            "answer": "fish"
          },
          {
            "id": "r3-4",
            "prompt": "A ___ is green and jumps.",
            "answer": "frog"
          },
          {
            "id": "r3-5",
            "prompt": "A ___ is small and has big ears and a long tail.",
            "answer": "mouse"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-09.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-09.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-09.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "ruler",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "yellow",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The ruler is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the ruler now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/09/matching.png",
        "exampleName": "Anna",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Sam",
            "answer": "p4"
          },
          {
            "id": "l1-2",
            "prompt": "Mary",
            "answer": "p3"
          },
          {
            "id": "l1-3",
            "prompt": "Tom",
            "answer": "p6"
          },
          {
            "id": "l1-4",
            "prompt": "Bill",
            "answer": "p2"
          },
          {
            "id": "l1-5",
            "prompt": "Jill",
            "answer": "p5"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Anna.",
        "type": "text",
        "exampleName": "Anna",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Anna?",
            "answer": "9",
            "numeric": true,
            "accepted": [
              "nine"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the cat?",
            "answer": "Sam"
          },
          {
            "id": "l2-3",
            "prompt": "How many eggs are in the bag?",
            "answer": "12",
            "numeric": true,
            "accepted": [
              "twelve"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the friend's name?",
            "answer": "Jill"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "18",
            "numeric": true,
            "accepted": [
              "eighteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Anna want?",
            "answer": "C",
            "choiceArts": [
              "ruler",
              "book",
              "pencil"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Bill like?",
            "answer": "B",
            "choiceArts": [
              "hat",
              "flower",
              "ball"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Mary see?",
            "answer": "A",
            "choiceArts": [
              "banana",
              "apple",
              "pear"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "C",
            "choiceArts": [
              "cat",
              "dog",
              "fish"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "B",
            "choiceArts": [
              "bike",
              "car",
              "bus"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng vàng trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-yellow.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "orange"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "red"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "purple"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "green"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "blue"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "starters-10",
    "number": "10",
    "title": "A happy holiday",
    "level": "Pre A1 Starters",
    "audioVersion": "20261014-tests10",
    "audioMode": "full",
    "audio": [
      "tests/10/listening-full.mp3",
      "tests/10/listening-full.mp3",
      "tests/10/listening-full.mp3",
      "tests/10/listening-full.mp3"
    ],
    "cover": "shared/scene-07.png",
    "reading": [
      {
        "id": "r1",
        "title": "Look & read",
        "instruction": "Look and read. Choose a tick (✓) or a cross (✗).",
        "hint": "Nhìn hình và đọc câu. Chọn đúng hoặc sai.",
        "type": "binary",
        "options": [
          [
            "tick",
            "✓",
            "Đúng"
          ],
          [
            "cross",
            "✗",
            "Sai"
          ]
        ],
        "questions": [
          {
            "id": "r1-1",
            "prompt": "This is an apple.",
            "answer": "tick",
            "art": "apple"
          },
          {
            "id": "r1-2",
            "prompt": "This is a table.",
            "answer": "cross",
            "art": "sun"
          },
          {
            "id": "r1-3",
            "prompt": "This is a tree.",
            "answer": "tick",
            "art": "tree"
          },
          {
            "id": "r1-4",
            "prompt": "This is milk.",
            "answer": "tick",
            "art": "milk"
          },
          {
            "id": "r1-5",
            "prompt": "This is a ball.",
            "answer": "cross",
            "art": "cake"
          }
        ]
      },
      {
        "id": "r2",
        "title": "Read the picture",
        "instruction": "Look at the picture. Read and choose yes or no.",
        "hint": "Đọc từng câu và chọn Yes hoặc No dựa vào tranh.",
        "type": "binary",
        "image": "shared/scene-07.png",
        "options": [
          [
            "yes",
            "Yes",
            ""
          ],
          [
            "no",
            "No",
            ""
          ]
        ],
        "questions": [
          {
            "id": "r2-1",
            "prompt": "There is a plane next to the tree.",
            "answer": "no"
          },
          {
            "id": "r2-2",
            "prompt": "The animal is on the table.",
            "answer": "no"
          },
          {
            "id": "r2-3",
            "prompt": "The girl has a red shirt.",
            "answer": "yes"
          },
          {
            "id": "r2-4",
            "prompt": "There are two pieces of fruit on the table.",
            "answer": "yes"
          },
          {
            "id": "r2-5",
            "prompt": "The boy is holding a book.",
            "answer": "yes"
          }
        ]
      },
      {
        "id": "r3",
        "title": "Complete the text",
        "instruction": "Read. Choose a word from the box for each gap.",
        "hint": "Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.",
        "type": "words",
        "bank": [
          "milk",
          "ball",
          "boat",
          "car",
          "plane",
          "flower",
          "bike",
          "box"
        ],
        "passageTitle": "My toys",
        "example": "My toys are in a box.",
        "questions": [
          {
            "id": "r3-1",
            "prompt": "My toy ___ has wings and can fly.",
            "answer": "plane"
          },
          {
            "id": "r3-2",
            "prompt": "My toy ___ has a sail.",
            "answer": "boat"
          },
          {
            "id": "r3-3",
            "prompt": "My toy ___ has four wheels.",
            "answer": "car"
          },
          {
            "id": "r3-4",
            "prompt": "My ___ is round. I can kick it.",
            "answer": "ball"
          },
          {
            "id": "r3-5",
            "prompt": "My ___ has two wheels. I can ride it.",
            "answer": "bike"
          }
        ]
      },
      {
        "id": "r4",
        "title": "Read the story",
        "instruction": "Look at the pictures. Write one word for each answer.",
        "hint": "Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.",
        "type": "text",
        "story": true,
        "storyArts": [
          {
            "file": "shared/story-10.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              13.0,
              1011.0,
              507.0
            ]
          },
          {
            "file": "shared/story-10.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              519.0,
              1011.0,
              998.0
            ]
          },
          {
            "file": "shared/story-10.png",
            "width": 1024,
            "height": 1536,
            "clip": [
              13.0,
              1011.0,
              1011.0,
              1523.0
            ]
          }
        ],
        "questions": [
          {
            "id": "r4-1",
            "prompt": "What is between the dog and the tree?",
            "answer": "banana",
            "picture": 1
          },
          {
            "id": "r4-2",
            "prompt": "What colour is the girl’s shirt?",
            "answer": "purple",
            "picture": 1
          },
          {
            "id": "r4-3",
            "prompt": "The banana is under the ...",
            "answer": "tree",
            "picture": 2
          },
          {
            "id": "r4-4",
            "prompt": "Who has the banana now?",
            "answer": "girl",
            "picture": 3
          },
          {
            "id": "r4-5",
            "prompt": "How many dogs are there?",
            "answer": "one",
            "picture": 3,
            "accepted": [
              "1"
            ]
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "l1",
        "title": "Listen & match",
        "instruction": "Listen and match each name to a child in the picture.",
        "hint": "Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.",
        "type": "match",
        "image": "tests/10/matching.png",
        "exampleName": "Kim",
        "questions": [
          {
            "id": "l1-1",
            "prompt": "Sue",
            "answer": "p5"
          },
          {
            "id": "l1-2",
            "prompt": "Matt",
            "answer": "p2"
          },
          {
            "id": "l1-3",
            "prompt": "Alice",
            "answer": "p3"
          },
          {
            "id": "l1-4",
            "prompt": "Pat",
            "answer": "p6"
          },
          {
            "id": "l1-5",
            "prompt": "Dan",
            "answer": "p4"
          }
        ]
      },
      {
        "id": "l2",
        "title": "Names & numbers",
        "instruction": "Read the questions. Listen and write a name or a number.",
        "hint": "Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Kim.",
        "type": "text",
        "exampleName": "Kim",
        "questions": [
          {
            "id": "l2-1",
            "prompt": "How old is Kim?",
            "answer": "10",
            "numeric": true,
            "accepted": [
              "ten"
            ]
          },
          {
            "id": "l2-2",
            "prompt": "What is the name of the dog?",
            "answer": "Dan"
          },
          {
            "id": "l2-3",
            "prompt": "How many oranges are in the bag?",
            "answer": "13",
            "numeric": true,
            "accepted": [
              "thirteen"
            ]
          },
          {
            "id": "l2-4",
            "prompt": "What is the teacher's name?",
            "answer": "Sue"
          },
          {
            "id": "l2-5",
            "prompt": "What number is on the door?",
            "answer": "19",
            "numeric": true,
            "accepted": [
              "nineteen"
            ]
          }
        ]
      },
      {
        "id": "l3",
        "title": "Listen & choose",
        "instruction": "Listen and choose one picture for each question.",
        "hint": "Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.",
        "type": "pictures",
        "questions": [
          {
            "id": "l3-1",
            "prompt": "What does Kim want?",
            "answer": "A",
            "choiceArts": [
              "ball",
              "hat",
              "flower"
            ]
          },
          {
            "id": "l3-2",
            "prompt": "Which picture does Matt like?",
            "answer": "C",
            "choiceArts": [
              "banana",
              "apple",
              "pear"
            ]
          },
          {
            "id": "l3-3",
            "prompt": "What can Alice see?",
            "answer": "B",
            "choiceArts": [
              "cat",
              "dog",
              "fish"
            ]
          },
          {
            "id": "l3-4",
            "prompt": "What is in the box?",
            "answer": "A",
            "choiceArts": [
              "car",
              "bike",
              "bus"
            ]
          },
          {
            "id": "l3-5",
            "prompt": "What is in the picture?",
            "answer": "C",
            "choiceArts": [
              "kite",
              "ball",
              "book"
            ]
          }
        ]
      },
      {
        "id": "l4",
        "title": "Listen & colour",
        "instruction": "Listen and colour the balls in the picture.",
        "hint": "Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng tím trên bàn là ví dụ.",
        "type": "colour",
        "image": "shared/colour-purple.png",
        "questions": [
          {
            "id": "l4-1",
            "prompt": "Câu 1",
            "answer": {
              "target": "under-table",
              "colour": "orange"
            }
          },
          {
            "id": "l4-2",
            "prompt": "Câu 2",
            "answer": {
              "target": "on-chair",
              "colour": "green"
            }
          },
          {
            "id": "l4-3",
            "prompt": "Câu 3",
            "answer": {
              "target": "under-tree",
              "colour": "red"
            }
          },
          {
            "id": "l4-4",
            "prompt": "Câu 4",
            "answer": {
              "target": "next-box",
              "colour": "blue"
            }
          },
          {
            "id": "l4-5",
            "prompt": "Câu 5",
            "answer": {
              "target": "in-box",
              "colour": "yellow"
            }
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
