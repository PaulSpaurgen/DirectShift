import { useState } from "react";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import moment from "moment";

const rowsPerPage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export default function ListView({
  isDrawerOpen,
  setIsDrawerOpen,
  type,
  data,
}: any) {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      elevation={16}
      transitionDuration={1000}
    >
      <Box
        width="100vw"
        position="relative"
        height="100vh"
        bgcolor="#292929"
        color="white"
      >
        <Box position="absolute" top="30px" right="30px">
          <Button onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon
              sx={{
                color: "white",
              }}
            />
          </Button>
        </Box>
        <Typography
          fontSize="14px"
          fontWeight="bold"
          marginTop="30px"
          margin="30px"
        >
          {type === "pull"
            ? "Showing results for pullrequests  "
            : " Showing results for issues  "}
        </Typography>
        <Box>
          {type === "pull" ? (
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              justifyContent="center"
            >
              <Box
                display="flex"
                alignItems="center"
                width="80vh"
                justifyContent="flex-start"
              >
                <Typography variant="caption">{"Filter by status"}</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    ml: "4px",
                  }}
                >
                  {" "}
                  Open{" "}
                </Button>{" "}
                <Button
                  variant="outlined"
                  sx={{
                    ml: "4px",
                  }}
                >
                  {" "}
                  Close{" "}
                </Button>{" "}
                <Button
                  variant="outlined"
                  sx={{
                    mr: "4px",
                    ml: "4px",
                  }}
                >
                  {" "}
                  All{" "}
                </Button>{" "}
                <Typography variant="caption" marginLeft="60px">
                  {"sort by popularity"}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mr: "4px",
                    ml: "4px",
                  }}
                >
                  <ArrowDropDownIcon />
                </Button>
                <Button variant="outlined">
                  <ArrowDropUpIcon />
                </Button>
              </Box>{" "}
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box display="flex" justifyContent="center" width="100%">
          <Box marginTop="5vh" width="auto" minWidth="80vw">
            <TableContainer
              component={Paper}
              sx={{
                height: "70vh",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User Details</TableCell>
                    <TableCell align="left">Link</TableCell>
                    <TableCell align="left">
                      {type === "pull" ? "Pull request" : "Issue"} Heading
                    </TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    overflowY: "auto",
                  }}
                >
                  {data.map((val: any, index: any) => (
                    <TableRow
                      key={`${index}rowss`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      
                      <TableCell align="left">
                        {" "}
                        <Box display="flex" >
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
                      </TableCell>

                      <TableCell align="left">
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
                            {type === "pull"
                              ? "View pull request"
                              : "View issue"}
                          </Link>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        {" "}
                        <Typography fontSize="14px" fontWeight="bold">
                          {val?.title}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        {" "}
                        <Chip
                          label={val?.state}
                          size="small"
                          color={val?.state === "open" ? "success" : "info"}
                          variant="outlined"
                          sx={{
                            marginLeft: "10px",
                          }}
                        />
                      </TableCell>

                      <TableCell align="left">
                        {" "}
                        <Typography variant="caption" color="gray">
                          {`${moment(val?.updated_at).format("LLL")}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              //   marginTop="px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                sx={{
                  ":hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <SkipPreviousIcon
                  sx={{
                    color: "white",
                  }}
                />{" "}
              </Button>
              <Box display="flex">
                <FormControl
                  fullWidth
                  sx={{
                    color: "white",
                  }}
                >
                  <Select
                    id="demo-simple-select-standard"
                    sx={{
                      maxWidth: 70,
                      fontSize: "12px !important",
                      color: "white !important",
                      marginTop: "50px",
                    }}
                    value={10}
                    size="small"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}

                    //   onChange={handleChange}
                  >
                    {rowsPerPage.map((val: any, index: any) => (
                      <MenuItem key={`${index}perPage `} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    sx={{
                      color: "white !important",
                    }}
                  >
                    Rows Per Page
                  </FormHelperText>
                </FormControl>
                <Button
                  sx={{
                    marginLeft: "20px",
                    ":hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <SkipNextIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
