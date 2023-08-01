const Query = {

  query: `{
        viewer {
          name
          repositories(first: 10) {
            nodes {
              name
              url
              id
              description
            }
          }
        }
      }
        `
}
export default Query;