/** @format */

import { useEffect, useState } from "react";
import { graphql } from "@octokit/graphql";
import "./App.css";

function App() {
	const [repository, setRepository] = useState({});
  const [viewer, setViewer] = useState({});

	async function getRepository() {
		const GHP_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

		const { repository, viewer } = await graphql({
      headers: {
				authorization: `Bearer ${GHP_TOKEN}`,
			},
      owner: "codestates-seb",
      name: "agora-states-fe",
      num: 5,
      query: `query repository($owner: String!, $name: String!, $num: Int!) {
        repository(name: $name, owner: $owner) {
          discussions(first: $num) {
            edges {
              node {
                category {
                  name
                }
                author {
                  login
                  avatarUrl
                }
                createdAt
                title
                id
                url
                answer {
                  author {
                    login
                    avatarUrl
                  }
                  bodyHTML
                  createdAt
                  id
                }
              }
            }
          }
        }
        viewer {
          login
          avatarUrl
        }
      }`,
    },);
		return {repository, viewer};
	}

	useEffect(() => {
		getRepository()
			.then((data) => {
				setRepository(data.repository);
				setViewer(data.viewer);
			})
			.catch((error) => {
				console.log(Error, error);
			});
	}, []);

	console.log(repository);
	console.log(viewer);

	return (
		<div className="App">
			<h1>Hello, Agora States</h1>
		</div>
	);
}

export default App;
