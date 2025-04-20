``` javascript
//  this is an example of what dataStore could look like
let data = {
  voteSessions: [
    {
      id: 12345,
      title: "Devsoc 2025 AGM",
      description: "vote for devsoc agm",
      startDate: "15-05-25",
      endDate: "17-05-25",
      status: "Open for voting",
      questions: [
        {
          id: 1,
          title: "vote for president",
          description: "vote for your 2026 devsoc treasurer",
          type: "idk",
          options: [
            {
              zId: "z543210",
              name: "Bombardiro Crocodilo",
              description: "weeeeeeeee",
              img: "aPathTotheirImg",
              votes: 10
            },
            {
              zId: "z000000",
              name: "Tralalero Tralala",
              description: "boboboboboo",
              img: "aPathTotheirImg",
              votes: 50
            },
            {
              zId: "z999999",
              name: "Chimpanzini Bananini",
              description: "jajajajja",
              img: "aPathTotheirImg",
              votes: 2
            },
            {
              zId: "z999999",
              name: "Capuccino Assassino",
              description: "o",
              img: "aPathTotheirImg",
              votes: 3
            }
          ]
        },
        {
          id: 2,
          title: "vote for treasurer",
          description: "vote for your 2026 devsoc treasurer",
          type: "idk",
          options: [
            {
              zId: "z543210",
              name: "Barry Allen",
              description: "Hi my name is barry allen and i am the fastest man alive",
              img: "aPathTotheirImg",
              votes: 2
            },
            {
              zId: "z000000",
              name: "Bruce Wayne",
              description: "iamvengences",
              img: "aPathTotheirImg",
              votes: 31
            },
            {
              zId: "z999999",
              name: "Tony stark",
              description: "iamironman",
              img: "aPathTotheirImg",
              votes: 30
            }
          ]
        },
      ],
      hostZid: "z0123456"
    }
  ],
  voters: vote[],
  hosts: host[]
}