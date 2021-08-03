import notFoundImage from "~assets/images/status/not_found.png";

export const NotFoundMovies = ({ text }: { text: string }) => `
  <div style="text-align: center">
    <img src="${notFoundImage}" alt="${text}" width="100" />
    <p>${text}<p>
  </div>
`
