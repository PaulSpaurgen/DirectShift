import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import logo from "../../Assets/logo.webp";
import { Octokit } from "octokit";
import CommonView from "./CommonView";

const init_pullRequest_filters = {
  perPage: 20,
  page: 1,
  state: "all",
  sort: "",
}

function Dashboard() {
  // Usestate starts for pullrequest data intrepration
  const [pullRequestFilters, setPullRequestFilters] = useState<any>(init_pullRequest_filters)
  const [isLoadingPull, setisLoadingPull] = useState(false)
  const [pullRequestData, setPullRequestData] = useState<any>([])

   // Usestate starts for issues data intrepration
  const [isLoadingIssues, setisLoadingIssues] = useState(true)

 
  const fetchPullData = async () => {
    setisLoadingPull(true)
    const octokit = new Octokit()
    await octokit.request('GET /repos/public-apis/public-apis/pulls', {
      owner: 'public-apis',
      repo: 'public-apis',
      state: pullRequestFilters.state,
      sort: pullRequestFilters.sort,
      per_page: pullRequestFilters.perPage,
      page: pullRequestFilters.page,
    })
      .then((response) => {
        console.log(response?.data)
        setPullRequestData(response?.data || [])
        setisLoadingPull(false)
      })
  }
  // const fetchIssuesData  =async () => {
  //   const octokit = new Octokit()
  //   await octokit.request('GET /repos/public-apis/public-apis/pulls', {
  //     owner: 'public-apis',
  //     repo: 'public-apis',
  //     state: "open",
  //     sort: "created",
  //     per_page: 30,
  //   })
  //     .then((response) => console.log(response))
  // }
  useEffect(() => {
    fetchPullData()
  }, [])
  return (
    <Box>
      {/* Nav bar */}
      <Box
        height="8vh"
        width="100%"
        bgcolor="#292929"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        display="flex"
        alignItems="center"
      >
        <img src={logo} style={{
          width: "50px",
          height: "50px",
          borderRadius: "5px",
          marginLeft: "60px",
          marginRight: "10px"
        }}
          alt="logo"
        />
        <Box fontSize="20px" fontWeight="bold" color="white" >Dashboard</Box>
      </Box>

      {/* rest-page */}
      <Box display="flex" height="92vh" width="100%">
        <Box width="50%" height="100%" sx={{
          border: "0px",
          borderRight: "0.5px",
          borderRightColor: "lightgray",
          borderStyle: "solid"
        }}>
          <CommonView
            heading="Pull Requests"
            isLoading = {isLoadingPull}
            data={pullRequestData}
           />
        </Box>
        <Box  width="50%" height="100%">
          <CommonView
            heading="Issues"
            isLoading = {isLoadingIssues}
           />
        </Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
