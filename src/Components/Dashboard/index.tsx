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
  sort: "dsc",
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
  const [issuesFilters, setIssuesFilters] = useState(
    init_issuesRequest_filters
  );
  const [issuesFilteredData, setIssuesFilteredData] = useState<any>([]);

  // useState for organization data.
  const [organizationData, setOrganizationData] = useState({});

  // useState to control listview
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dataType, setDataType] = useState("");

  const fetchPullData = async () => {
    setisLoadingPull(true);
    const octokit = new Octokit();
    await octokit
      .request("GET /repos/public-apis/public-apis/pulls", {
        owner: "public-apis",
        repo: "public-apis",
        sort: "popularity",
        state: pullRequestFilters.state,
        per_page: pullRequestFilters.perPage,
        page: pullRequestFilters.page,
        direction: pullRequestFilters.sort,
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
        state: issuesFilters.state,
        per_page: issuesFilters.perPage,
        page: issuesFilters.page,
        labels: issuesFilters.sort,
      })
      .then((response) => {
        let tempData = response?.data || [];
        setisLoadingIssues(false);
        setIssuesFilteredData(tempData);
      });
  };
  useEffect(() => {
    fetchIssuesData();
  }, [issuesFilters]);

  useEffect(() => {
    fetchPullData();
  }, [pullRequestFilters]);

  const resetFilters = () =>{
    setPullRequestFilters(init_pullRequest_filters)
    setIssuesFilters(init_issuesRequest_filters)
  }

  return (
    <Box>
      {/* list view drawer component */}
      <ListView
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        type={dataType}
        data={dataType === "pull" ? pullRequestData : issuesFilteredData}
        filters={dataType === "pull" ? pullRequestFilters : issuesFilters}
        setFilters={
          dataType === "pull" ? setPullRequestFilters : setIssuesFilters
        }
        isLoading={dataType === "pull" ? isLoadingPull : isLoadingIssues}
        reset={resetFilters}
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
            width: "40px",
            height: "40px",
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
