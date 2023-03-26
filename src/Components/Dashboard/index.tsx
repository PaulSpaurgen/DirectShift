import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import logo from "../../Assets/logo.webp";
import { Octokit } from "octokit";
import CommonView from "./CommonView";
import ListView from "./ListView";

// Common type check for filters
interface filters_TypeCheck {
  perPage: number;
  page: number;
  state: string;
  sort: string;
}
const init_pullRequest_filters: filters_TypeCheck = {
  perPage: 10,
  page: 1,
  state: "all",
  sort: "",
};

const init_issuesRequest_filters: filters_TypeCheck = {
  perPage: 10,
  page: 1,
  state: "all",
  sort: "",
};

function Dashboard() {
  // Usestates for pullrequest data intrepration
  const [pullRequestFilters, setPullRequestFilters] = useState<any>(
    init_pullRequest_filters
  );
  const [isLoadingPull, setisLoadingPull] = useState(false);
  const [pullRequestData, setPullRequestData] = useState<any>([]);

  // Usestates for issues data intrepration
  const [isLoadingIssues, setisLoadingIssues] = useState(false);
  const [issuesFilters, setIssuesFilter] = useState(init_issuesRequest_filters);
  const [intiIssuesData, setintiIssuesData] = useState<any>([]);
  const [issuesFilteredData, setIssuesFilteredData] = useState<any>([]);

  // useState for organization data.
  const [organizationData, setOrganizationData] = useState({});

  // useState to control listview 
  const [isDrawerOpen,setIsDrawerOpen] = useState(false)
  const [dataType,setDataType] = useState("")

  const fetchPullData = async () => {
    setisLoadingPull(true);
    const octokit = new Octokit();
    await octokit
      .request("GET /repos/public-apis/public-apis/pulls", {
        owner: "public-apis",
        repo: "public-apis",
        state: pullRequestFilters.state,
        sort: pullRequestFilters.sort,
        per_page: pullRequestFilters.perPage,
        page: pullRequestFilters.page,
      })
      .then((response) => {
        setPullRequestData(response?.data || []);
        setisLoadingPull(false);
        setOrganizationData({
          name: response?.data[0]?.base?.user?.login || "Not found",
          avatar: response?.data[0]?.base?.user?.avatar_url || "Not found",
          url: "https://github.com/public-apis/public-apis",
          type: response?.data[0]?.base?.user?.type || "Not found",
        });
      });
  };
  const fetchIssuesData = async () => {
    setisLoadingIssues(true);
    const octokit = new Octokit();
    await octokit
      .request("GET /repos/public-apis/public-apis/issues", {
        owner: "public-apis",
        repo: "public-apis",
        state: "all",
        per_page: 100,
      })
      .then((response) => {
        let tempData = response?.data || [];
        tempData = tempData.filter((val: any) => {
          if (!val.pull_request) {
            return val;
          }
        });
        console.log(tempData);
        setisLoadingIssues(false);
        setintiIssuesData(tempData);
        setIssuesFilteredData(tempData.slice(0, 10));
      });
  };
  useEffect(() => {
    fetchPullData();
    fetchIssuesData();
  }, []);
  return (
    <Box>
      {/* list view drawer component */}
          <ListView isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} type={dataType}  
          data={
            dataType === "pull" ? pullRequestData : issuesFilteredData
          }
            />
      {/* Nav bar */}
      <Box
        height="8vh"
        width="100%"
        bgcolor="#292929"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        display="flex"
        alignItems="center"
      >
        <img
          src={logo}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            marginLeft: "60px",
            marginRight: "10px",
          }}
          alt="logo"
        />
        <Box fontSize="20px" fontWeight="bold" color="white">
          Dashboard
        </Box>
      </Box>

      {/* rest-page */}
      <Box display="flex" height="92vh" width="100%">
        {/* left-side section (Pull requests) */}
        <Box
          width="50%"
          height="100%"
          sx={{
            border: "0px",
            borderRight: "1px",
            borderRightColor: "lightgray",
            borderStyle: "dashed",
          }}
        >
          <CommonView
            heading="Pull Requests"
            isLoading={isLoadingPull}
            data={pullRequestData}
            orgData={organizationData}
            drawerController={setIsDrawerOpen}
            setType={setDataType}
          />
        </Box>

        {/* right-side (issues) */}
        <Box width="50%" height="100%">
          <CommonView
            heading="Issues"
            isLoading={isLoadingIssues}
            orgData={organizationData}
            data={issuesFilteredData}
            drawerController={setIsDrawerOpen}
            setType={setDataType}


          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
