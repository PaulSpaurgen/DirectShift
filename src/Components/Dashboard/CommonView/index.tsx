import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import moment from "moment";
import Button from "@mui/material/Button";

function CommonView({ heading, isLoading, data, orgData,drawerController,setType }: any) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={25} thickness={6} />
        </Box>
      ) : (
        <Box padding="50px">
          <Typography variant="h6" fontWeight="bold" marginBottom="18px">
            {heading}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="16px"
            sx={{
              border: "0px",
              borderBottom: "0.5px",
              borderBottomColor: "#DDDDDD",
              borderStyle: "solid",
            }}
          >
            <Box display="flex">
              <Avatar
                alt="logo"
                src={orgData?.avatar}
                sx={{ width: 60, height: 60 }}
              />
              <Box marginLeft="10px">
                <Typography fontSize="14px" fontWeight="bold">
                  {orgData?.name}
                </Typography>
                <Typography fontSize="12px" fontWeight="bold">
                  {orgData?.type}
                </Typography>
                <Link
                  onClick={() => {
                    window.open(orgData?.url, "_blank");
                  }}
                  variant="caption"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {"View repository"}
                </Link>
              </Box>
            </Box>
            <Button
              sx={{
                marginRight: "20px",
                backgroundColor: "#292929",
                color:"white", 
                padding:"5px 15px ",
                textTransform:"none",
                ":hover":{
                  color:"#292929",
                  bgcolor:"white",
                  borderColor:"#292929",
                }
                
                
              }}
              size="small"
              variant="outlined"
              
              onClick={()=>{
                drawerController(true)
                setType(heading === "Pull Requests"
                ? "pull"
                : "issue")
              }}
            >
              List View
            </Button>
          </Box>

          <Box
            sx={{
              height: "60vh",
              bgcolor: "#edf9fc",
              overflowX: "auto",
              width: "100%",
              marginTop: "20px",
              msOverflowX: "auto",
            }}
          >
            {!!data?.length ? (
              <React.Fragment>
                {data.map((val: any, index: any) => (
                  <Box
                    key={`${index}_pull_index_issues`}
                    display="flex"
                    alignItems="center"
                    padding="16px"
                    sx={{
                      border: "0px",
                      borderBottom: "0.5px",
                      borderBottomColor: "#DDDDDD",
                      borderStyle: "solid",
                      height: "fit-content",
                    }}
                  >
                    <Box display="flex" width="30%">
                      <Avatar
                        alt="logo"
                        src={val?.user?.avatar_url}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box marginLeft="10px">
                        <Typography fontSize="14px" fontWeight="bold">
                          {val?.user?.login}
                        </Typography>
                        <Typography fontSize="12px" fontWeight="bold">
                          {val?.user?.type}
                        </Typography>
                        <Link
                          onClick={() => {
                            window.open(val?.user?.html_url, "_blank");
                          }}
                          variant="caption"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {"User Github Link"}
                        </Link>
                      </Box>
                    </Box>
                    <Box>
                      <Typography fontSize="14px" fontWeight="bold">
                        {val?.title}
                        <Chip
                          label={val?.state}
                          size="small"
                          color={val?.state === "open" ? "success" : "info"}
                          variant="outlined"
                          sx={{
                            marginLeft: "10px",
                          }}
                        />
                      </Typography>
                      <Typography variant="caption" color="gray">
                        Last updated on{" "}
                        {`${moment(val?.updated_at).format("LLL")}`}
                      </Typography>

                      <Box>
                        <Link
                          onClick={() => {
                            window.open(val?.html_url, "_blank");
                          }}
                          variant="caption"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {heading === "Pull Requests"
                            ? "View pull request"
                            : "View issue"}
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </React.Fragment>
            ) : (
              <Box></Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default CommonView;
