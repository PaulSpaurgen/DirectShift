import { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,

  color: "white",
  bgcolor: "#292929",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const rowsPerPage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export default function ListView({
  isDrawerOpen,
  setIsDrawerOpen,
  type,
  data,
  filters,
  setFilters,
  isLoading,
}: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msgType, setMsgType] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [msgAdmin, setMsgByAdmin] = useState<any>([]);
  const [commits, setCommits] = useState<any>([]);
  const [isLoadingComments, setCommentsIsLoading] = useState(false);
  const handleChange = (key: any, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [`${key}`]: value,
    }));
  };

  const fetchComments = (url: any) => {
    setMsgType("Comments");
    handleOpen();
    setCommentsIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCommentsIsLoading(false);
        console.log(data);
        setComments(data);
      });
  };
  const fetchCommits = (url: any) => {
    setCommentsIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCommentsIsLoading(false);
        console.log(data);
        setCommits(data);
      });
  };
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6">
              Additional Data
            </Typography>
            {isLoadingComments ? (
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
              <Box
                sx={{
                  overflowY: "auto",
                  height: "450px",
                  mt: "10px",
                }}
              >
                <Typography variant="caption">
                  Message from user: {msgAdmin}
                </Typography>
                {commits.length === 0 ? (
                  <Typography variant="caption">No Commits found</Typography>
                ) : (
                  <Typography id="modal-modal-title" variant="h6">
                    Commits Links
                  </Typography>
                )}

                {commits.map((val: any, index: any) => (
                  <Box key={`${index}commits`}>
                    <Link
                      onClick={() => {
                        window.open(val?.html_url, "_blank");
                      }}
                      variant="caption"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                        mt: "2px",
                      }}
                    >
                      View Commit {index + 1}
                    </Link>
                  </Box>
                ))}

                {comments.length === 0 ? (
                  <Typography variant="caption">No Comments found</Typography>
                ) : (
                  <Typography id="modal-modal-title" variant="h6">
                    Comments
                  </Typography>
                )}

                {comments.map((val: any, index: any) => (
                  <Typography variant="caption" sx={{ mt: 4 }}>
                    <li key={`${index}Comments`}>{val?.body}</li>
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Modal>

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
                variant={filters.state === "open" ? "contained" : "outlined"}
                sx={{
                  ml: "4px",
                }}
                onClick={() => {
                  handleChange("state", "open");
                }}
              >
                {" "}
                Open{" "}
              </Button>{" "}
              <Button
                variant={filters.state === "closed" ? "contained" : "outlined"}
                sx={{
                  ml: "4px",
                }}
                onClick={() => {
                  handleChange("state", "closed");
                }}
              >
                {" "}
                Closed{" "}
              </Button>{" "}
              <Button
                variant={filters.state === "all" ? "contained" : "outlined"}
                sx={{
                  mr: "4px",
                  ml: "4px",
                }}
                onClick={() => {
                  handleChange("state", "all");
                }}
              >
                {" "}
                All{" "}
              </Button>{" "}
              {type === "pull" ? (
                <Box display="flex" alignItems="center">
                  {" "}
                  <Typography variant="caption" marginLeft="60px">
                    {"sort by popularity"}
                  </Typography>
                  <Button
                    variant={filters.sort === "asc" ? "contained" : "outlined"}
                    sx={{
                      mr: "4px",
                      ml: "4px",
                    }}
                    onClick={() => {
                      handleChange("sort", "asc");
                    }}
                  >
                    <ArrowDropUpIcon />
                  </Button>
                  <Button
                    variant={filters.sort === "dsc" ? "contained" : "outlined"}
                    onClick={() => {
                      handleChange("sort", "dsc");
                    }}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>{" "}
          </Box>
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
                {isLoading ? (
                  <Box position="absolute" z-zIndex={10} top="50vh" left="50vw">
                    <CircularProgress size={25} thickness={6} />
                  </Box>
                ) : (
                  <TableBody
                    sx={{
                      overflowY: "auto",
                    }}
                  >
                    {data.map((val: any, index: any) => (
                      <TableRow
                        key={`${index}rowss`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          ":hover": {
                            bgcolor: "lightgray",
                          },
                        }}
                        onClick={() => {
                          setMsgType("Additional Data");
                          setMsgByAdmin(val?.body);
                          handleOpen();
                          fetchComments(val?.comments_url);
                          if (type === "pull") {
                            fetchCommits(val?.commits_url);
                          }
                        }}
                      >
                        <TableCell align="left">
                          {" "}
                          <Box display="flex">
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

                        {/* <TableCell align="left" sx={{
                            zIndex:"10"
                        }} >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              
                            }}
                          >
                            View Comments
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
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
                disabled={filters?.page === 1 ? true : false}
                onClick={() => {
                  handleChange("page", filters.page - 1);
                }}
              >
                <SkipPreviousIcon
                  sx={{
                    color: filters?.page === 1 ? "gray" : "white",
                  }}
                />{" "}
              </Button>
              <Typography variant="caption">
                showing page {filters.page} with {filters.perPage} records
              </Typography>
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
                    value={filters.perPage}
                    size="small"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(e: any) =>
                      handleChange("perPage", e.target.value)
                    }
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
                    height: "30px",
                    marginTop: "50px",
                    ":hover": {
                      bgcolor: "transparent",
                    },
                  }}
                  size="small"
                  onClick={() => {
                    handleChange("page", filters.page + 1);
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
